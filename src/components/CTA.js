import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function CTA({ onOpenQuestionnaire }) {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className={`cta fade-in-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h2>התחל את תקופת הניסיון החינמית ל-7 ימים</h2>
        <p>הצטרף לעשרות אנשים שמיישמים תובנות משנות חיים מהספרים הכי טובים בעולם</p>
        <button className="btn btn-white" onClick={onOpenQuestionnaire}>התחל בחינם</button>
      </div>
    </section>
  );
}

export default CTA;
