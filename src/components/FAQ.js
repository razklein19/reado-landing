import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, isVisible] = useScrollAnimation(0.1);

  const faqs = [
    {
      question: "מה זה Reado?",
      answer: "Reado היא אפליקציה שעוזרת לך לזכור וליישם תובנות מספרי פיתוח אישי ועסקי. האפליקציה כוללת סיכומי 15 דקות, תרגולים אינטראקטיביים לזכירה, ובניית תוכנית פעולה אישית מותאמת למטרות שלך."
    },
    {
      question: "למי זה מתאים?",
      answer: "Reado מתאימה לכל מי שרוצה להתפתח אישית ומקצועית - יזמים, מנהלים, עצמאיים, ואנשים שמחפשים לשפר את עצמם. האפליקציה מותאמת לקצב החיים המהיר של ימינו ועוזרת להפיק את המרב מספרי פיתוח אישי."
    },
    {
      question: "האם יש גרסת אודיו?",
      answer: "כן! כל סיכום זמין גם באודיו איכותי, כך שתוכל להאזין בדרך לעבודה, בחדר כושר או בכל מקום אחר."
    },
    {
      question: "איך התרגולים האינטראקטיביים עובדים?",
      answer: "לכל ספר יש תרגולים ייחודיים שעוזרים לך לזכור את התובנות המרכזיות. התרגולים כוללים שאלות, תרחישים מעשיים, ומשימות שמחזקות את הזיכרון והלמידה."
    },
    {
      question: "מה זה תוכנית פעולה אישית?",
      answer: "אחרי קריאת כל סיכום, תוכל לבנות תוכנית פעולה מותאמת אישית שמתבססת על המטרות והאתגרים שלך. זה עוזר להפוך את התובנות מהספר ליישום מעשי בחיים שלך."
    },
    {
      question: "מה כוללת תקופת הניסיון של 7 ימים?",
      answer: "תקופת הניסיון כוללת גישה מלאה לכל התכנים באפליקציה - סיכומי ספרים, תרגולים אינטראקטיביים, בניית תוכנית פעולה אישית, וגרסאות האודיו. תוכל לנסות את כל התכונות ללא עלות."
    },
    {
      question: "האם אפשר לבטל את המנוי?",
      answer: "בהחלט! ניתן לבטל את המנוי בכל עת ללא עלויות נוספות. אין התחייבות לטווח ארוך."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`faq fade-in-up ${isVisible ? 'visible' : ''}`} id="faq" ref={ref}>
      <div className="container">
        <h2>שאלות ותשובות</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
