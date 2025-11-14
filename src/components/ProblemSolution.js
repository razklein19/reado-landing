import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ProblemSolution() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className={`problem-solution fade-in-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="ps-header">
          <h2>הפוך להיות הגרסה הטובה ביותר של עצמך</h2>
          <p className="ps-intro">כולנו רוצים להשתפר ולהפוך לגרסה הטובה ביותר של עצמנו.<br/>אבל ברוב המקרים,<br/><span className="highlight-text-1">אנחנו שוכחים מה קראנו</span>, <span className="highlight-text-2">לא באמת מיישמים</span>,<br/><span className="highlight-text-3">ונשארים בדיוק באותו המקום</span>.<br/>בלי תהליך ברור, הידע נשאר רק בספר, ולא הופך <span className="underline-text">לשינוי אמיתי</span>.</p>
        </div>

        <div className="ps-content">
          <div className="ps-column">
            <div className="ps-icon-wrapper problem-icon">
              <img src={`${process.env.PUBLIC_URL}/images/brain-error-icon.png`} alt="לפני Reado" className="ps-icon-img" />
            </div>
            <h3>לפני Reado</h3>
            <div className="ps-list">
              <div className="ps-list-item">
                <span className="bullet">•</span>
                <p>אתה קורא ספר, מבין אותו - אבל שבוע אחרי זה הכל נשכח</p>
              </div>
              <div className="ps-list-item">
                <span className="bullet">•</span>
                <p>אתה לא מצליח ליישם את התובנות המרכזיות</p>
              </div>
              <div className="ps-list-item">
                <span className="bullet">•</span>
                <p>אין לך זמן לפתוח את הספר ולקרוא</p>
              </div>
              <div className="ps-list-item">
                <span className="bullet">•</span>
                <p>אתה רוצה ללמוד אבל לא מתחבר לקריאה</p>
              </div>
            </div>
          </div>

          <div className="ps-divider">
            <div className="arrow">
              <img src={`${process.env.PUBLIC_URL}/images/arrow-icon.png`} alt="arrow" className="arrow-img" />
            </div>
          </div>

          <div className="ps-column">
            <div className="ps-icon-wrapper solution-icon">
              <img src={`${process.env.PUBLIC_URL}/images/growth-tree-icon.png`} alt="עם Reado" className="ps-icon-img" />
            </div>
            <h3>עם Reado</h3>
            <div className="ps-list">
              <div className="ps-list-item highlight">
                <span className="check">✓</span>
                <p>זוכר יותר בעזרת תרגולים אינטראקטיביים</p>
              </div>
              <div className="ps-list-item highlight">
                <span className="check">✓</span>
                <p>מיישם את התובנות המרכזיות עם תוכנים פעולה אישית</p>
              </div>
              <div className="ps-list-item highlight">
                <span className="check">✓</span>
                <p>שומע סיכום קצר בזמן אימון, נסיעה או ניקיון בבית</p>
              </div>
              <div className="ps-list-item highlight">
                <span className="check">✓</span>
                <p>לומד בדרך שלך - בקריאה או בהאזנה לאודיו</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSolution;
