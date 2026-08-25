import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import AppStoreBadges from './AppStoreBadges';
import { CATEGORY_TABS, POPULAR_BOOK_IDS, fetchPublishedBooks } from '../lib/books';

const POPULAR = 'popular';

function Topics() {
  const [activeCategory, setActiveCategory] = useState(POPULAR);
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState('loading');
  const [ref, isVisible] = useScrollAnimation(0.1);

  // The library is read live from Supabase, so publishing a book in the admin
  // dashboard puts it on this page with no code change.
  useEffect(() => {
    let cancelled = false;

    fetchPublishedBooks()
      .then(rows => {
        if (cancelled) return;
        setBooks(rows);
        setStatus('ready');
      })
      .catch(err => {
        if (cancelled) return;
        console.error('Failed to load books:', err);
        setStatus('error');
      });

    return () => { cancelled = true; };
  }, []);

  // Ordered by the shelf, not by publish date, and silently skipping any id
  // that no longer resolves to a published book.
  const popularBooks = POPULAR_BOOK_IDS
    .map(id => books.find(book => book.id === id))
    .filter(Boolean);

  // Only offer a tab that actually has something behind it — otherwise an
  // empty category would sit there as a dead end.
  const categories = [
    ...(popularBooks.length ? [{ id: POPULAR, name: 'פופולרי', icon: 'popular-icon.png' }] : []),
    ...CATEGORY_TABS.filter(tab => books.some(book => book.categories.includes(tab.id)))
  ];

  // Guards the case where the shelf empties out and the default tab vanishes.
  const activeTab = categories.some(c => c.id === activeCategory)
    ? activeCategory
    : categories[0]?.id;

  const filteredBooks = activeTab === POPULAR
    ? popularBooks
    : books.filter(book => book.categories.includes(activeTab));

  return (
    <section className={`topics fade-in-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2>גלה את הספרים ב-Reado</h2>
        <p className="topics-subtitle">הספרייה של Reado מתחדשת מדי חודש,<br/>כי התפתחות אמיתית לא נעצרת אף פעם.<br/><strong>עם איזה ספר נתחיל?</strong></p>

        {status === 'ready' && (
          <>
            <div className="topics-grid">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`topic-tag ${activeTab === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="topic-icon">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icons/${category.icon}`}
                      alt={category.name}
                      className="topic-icon-img"
                    />
                  </span> {category.name}
                </div>
              ))}
            </div>

            <div className="books">
              <div className="book-carousel">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          </>
        )}

        {status === 'loading' && (
          <div className="books">
            <div className="book-carousel">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="book-card book-card-skeleton" aria-hidden="true" />
              ))}
            </div>
          </div>
        )}

        <div className="topics-cta">
          <AppStoreBadges />
        </div>
      </div>
    </section>
  );
}

export default Topics;
