import React from 'react';

function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>עשרות משתמשים</h3>
            <p>הצטרף אליהם היום</p>
          </div>
          <div className="stat-item">
            <h3>100% ידע. 0% בזבוז זמן.</h3>
            <p>למידה ממוקדת. תוצאות אמיתיות.</p>
          </div>
          <div className="stat-item">
            <h3>20+ ספרים</h3>
            <p>ספרייה מתעדכנת מידי חודש</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
