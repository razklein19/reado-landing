import React, { useState } from 'react';
import BookCard from './BookCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Topics() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, isVisible] = useScrollAnimation(0.1);

  const categories = [
    { id: 'all', icon: '/images/icons/popular-icon.png', name: 'פופולרי', isImage: true },
    { id: 'habits', icon: '/images/icons/habits-icon.png', name: 'הרגלים והתמדה', isImage: true },
    { id: 'money', icon: '/images/icons/money-icon.png', name: 'כסף והשקעות', isImage: true },
    { id: 'business', icon: '/images/icons/business-icon.png', name: 'עסקים ויזמות', isImage: true },
    { id: 'consciousness', icon: '/images/icons/consciousness-icon.png', name: 'תודעה והתפתחות', isImage: true },
    { id: 'communication', icon: '/images/icons/communication-icon.png', name: 'תקשורת והשפעה', isImage: true },
    { id: 'career', icon: '/images/icons/career-icon.png', name: 'קריירה וניהול עצמי', isImage: true }
  ];

  const books = [
    {
      title: '4 שעות עבודה בשבוע',
      author: 'טימותי פריס',
      image: '/images/books/4-hours.png',
      categories: ['business', 'career'],
      audioUrl: '/images/books/audio/4-hours.wav'
    },
    {
      title: 'אבא עשיר אבא עני',
      author: 'רוברט ט\' קיוסאקי',
      image: '/images/books/rich-dad.png',
      categories: ['all', 'money', 'business'],
      audioUrl: '/images/books/audio/rich-dad.wav'
    },
    {
      title: 'האלכימאי',
      author: 'פאולו קואלו',
      image: '/images/books/alchemist.png',
      categories: ['consciousness'],
      audioUrl: '/images/books/audio/alchemist.wav'
    },
    {
      title: 'הנזיר שמכר את הפרארי שלו',
      author: 'רובין ס\' שארמה',
      image: '/images/books/monk.png',
      categories: ['consciousness'],
      audioUrl: '/images/books/audio/monk.wav'
    },
    {
      title: 'הסטארטאפ הרזה',
      author: 'אריק רייס',
      image: '/images/books/lean-startup.png',
      categories: ['business'],
      audioUrl: '/images/books/audio/lean-startup.wav'
    },
    {
      title: 'הרגלים אטומיים',
      author: 'ג\'יימס קליר',
      image: '/images/books/atomic-habits.png',
      categories: ['all', 'habits'],
      audioUrl: '/images/books/audio/atomic-habits.wav'
    },
    {
      title: 'הרגלים קטנטנים',
      author: 'ד"ר ב.ג. פוג',
      image: '/images/books/tiny-habits.png',
      categories: ['habits'],
      audioUrl: '/images/books/audio/tiny-habits.wav'
    },
    {
      title: 'חוק 5 השניות',
      author: 'מל רובינס',
      image: '/images/books/5-second-rule.png',
      categories: ['consciousness', 'career'],
      audioUrl: '/images/books/audio/5-second-rule.wav'
    },
    {
      title: 'חכמת האדישות',
      author: 'מארק מנסון',
      image: '/images/books/subtle-art.png',
      categories: ['consciousness', 'career'],
      audioUrl: '/images/books/audio/subtle-art.wav'
    },
    {
      title: 'חשוב הותעשר',
      author: 'נפוליאון היל',
      image: '/images/books/think-grow-rich.png',
      categories: ['all', 'money', 'consciousness'],
      audioUrl: '/images/books/audio/think-grow-rich.wav'
    },
    {
      title: 'כוחו של הרגל',
      author: 'צ\'ארלס גוהינג',
      image: '/images/books/power-habit.png',
      categories: ['habits'],
      audioUrl: '/images/books/audio/power-habit.wav'
    },
    {
      title: 'כוחו של הרגע הזה',
      author: 'אקהרט טול',
      image: '/images/books/power-now.png',
      categories: ['consciousness'],
      audioUrl: '/images/books/audio/power-now.wav'
    },
    {
      title: 'כוחו של התת מודע',
      author: 'ד"ר ג\'וזף מרפי',
      image: '/images/books/subconscious.png',
      categories: ['consciousness'],
      audioUrl: '/images/books/audio/subconscious.wav'
    },
    {
      title: 'כיצד לרכוש ידידים והשפעה',
      author: 'דייל קארנגי',
      image: '/images/books/friends-influence.png',
      categories: ['communication'],
      audioUrl: '/images/books/audio/friends-influence.wav'
    },
    {
      title: 'מוקף באידיוטים',
      author: 'תומס אריקסון',
      image: '/images/books/idiots.png',
      categories: ['all', 'communication'],
      audioUrl: '/images/books/audio/idiots.wav'
    },
    {
      title: 'סודות של מיליונרים',
      author: 'דין גרזיוסי',
      image: '/images/books/millionaire-secrets.png',
      categories: ['money', 'business'],
      audioUrl: '/images/books/audio/millionaire-secrets.wav'
    }
  ];

  const filteredBooks = books.filter(book =>
    book.categories.includes(activeCategory)
  );

  return (
    <section className={`topics fade-in-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2>גלה את הספרים ב-Reado</h2>
        <p className="topics-subtitle">הספרייה של Reado מתחדשת מדי חודש,<br/>כי התפתחות אמיתית לא נעצרת אף פעם.<br/><strong>עם איזה ספר נתחיל?</strong></p>

        <div className="topics-grid">
          {categories.map(category => (
            <div
              key={category.id}
              className={`topic-tag ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="topic-icon">
                <img src={category.icon} alt={category.name} className="topic-icon-img" />
              </span> {category.name}
            </div>
          ))}
        </div>

        <div className="books">
          <div className="book-carousel">
            {filteredBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>

        <div className="topics-cta">
          <a href="https://reado-il.com" className="btn">התחל עם הספר הראשון</a>
        </div>
      </div>
    </section>
  );
}

export default Topics;
