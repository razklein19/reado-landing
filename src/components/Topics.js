import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import AppStoreBadges from './AppStoreBadges';
import { CATEGORY_TABS, fetchPublishedBooks } from '../lib/books';

const ALL = 'all';

function Topics() {
  const [activeCategory, setActiveCategory] = useState(ALL);
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

  // Only offer a tab that actually has something behind it — otherwise an
  // empty category would sit there as a dead end.
  const categories = [
    { id: ALL, name: 'הכל', icon: 'popular-icon.png' },
    ...CATEGORY_TABS.filter(tab => books.some(book => book.categories.includes(tab.id)))
  ];

  const filteredBooks = activeCategory === ALL
    ? books
    : books.filter(book => book.categories.includes(activeCategory));

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
                  className={`topic-tag ${activeCategory === category.id ? 'active' : ''}`}
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
