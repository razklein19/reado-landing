import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function CTA() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className={`cta fade-in-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2>התחל את תקופת הניסיון החינמית ל-7 ימים</h2>
        <p>הצטרף לעשרות אנשים שמיישמים תובנות משנות חיים מהספרים הכי טובים בעולם</p>
        <a href="https://reado-il.com" className="btn btn-white">התחל בחינם</a>
      </div>
    </section>
  );
}

export default CTA;
