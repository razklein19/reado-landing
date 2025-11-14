import React, { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AccessibilityStatement() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={`accessibility-statement fade-in-up ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="container">
        <h1>הצהרת נגישות - Reado</h1>
        <p className="update-date">עודכן לאחרונה בתאריך: 13/09/2025</p>

        <div className="accessibility-content">
          <p>אנו ב-Reado רואים חשיבות רבה בהנגשת השירותים הדיגיטליים שלנו לכלל הציבור לרבות אנשים עם מוגבלות.</p>

          <p>המטרה שלנו היא לאפשר לכל אדם ליהנות מחוויית שימוש נגישה, שוויונית ונוחה בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.</p>

          <p>האתר נבנה בהתאם לעקרונות תקן ישראלי 5568 המבוסס על הנחיות WCAG 2.1 ברמה AA ואנו ממשיכים לשפר את התאמתו כל הזמן.</p>

          <section>
            <h2>מה בוצע באתר</h2>
            <p><strong>כפתור נגישות צף מאפשר:</strong></p>
            <ul>
              <li>הגדלת והקטנת טקסט עד 200% ללא פגיעה בפריסת האתר</li>
              <li>ניגודיות גבוהה לשיפור קריאות</li>
              <li>מצב כהה (Dark Mode)</li>
              <li>גוון אפור (Greyscale) למשתמשים עם רגישות צבעים</li>
              <li>הדגשת קישורים להבדלה ברורה מתוכן רגיל</li>
              <li>פונט מותאם לדיסלקציה לשיפור קריאות</li>
              <li>עצירת אנימציות ותנועות אוטומטיות</li>
            </ul>
            <p>בנוסף האתר כולל פוקוס מקלדת ברור שמאפשר ניווט באמצעות Tab ו-Shift+Tab כך שהמשתמש יודע בכל רגע היכן המיקוד נמצא. האתר מותאם לעברית (RTL) ולשימוש במובייל.</p>
          </section>

          <section>
            <h2>שיפורים מתוכננים</h2>
            <p>אנו ממשיכים להנגיש את כלל המסכים והשירותים שלנו. בתהליך הפיתוח:</p>
            <ul>
              <li>כפתור "דלג לתוכן" לניווט מהיר באמצעות מקלדת</li>
              <li>שמירת העדפות המשתמש (מצב כהה, גודל טקסט וכו') ב-localStorage</li>
              <li>השלמות נוספות לתמיכה מלאה בקוראי מסך כולל תגיות ARIA וסדר כותרות עקבי בכל המסכים</li>
            </ul>
          </section>

          <section>
            <h2>תמיכה ודפדפנים</h2>
            <p>האתר מותאם לדפדפנים נפוצים כגון Chrome, Firefox, Safari ו-Edge וכן לשימוש במחשב ובמובייל.</p>
          </section>

          <section>
            <h2>משוב ופניות בנושא נגישות</h2>
            <p><strong>רכז הנגישות: רז קליין</strong></p>
            <ul>
              <li>טלפון: 053-5272518</li>
              <li>דוא"ל: reado.il.service@gmail.com</li>
            </ul>
            <p>נשמח לקבל פניות, הצעות לשיפור ודיווחים על בעיות נגישות. אנו מתחייבים לטפל בפנייתך במהירות ולפעול להסרת החסמים.</p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default AccessibilityStatement;
