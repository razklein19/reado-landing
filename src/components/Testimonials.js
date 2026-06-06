import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      name: 'דנה ש.',
      text: '"הסיכומים טובים מאוד ותמצתים את הספרים בדיוק למה שצריך. כל תובנה ממוקדת ועוזרת להבין את העיקר בלי לבזבז זמן."',
      color: '#14B8A6'
    },
    {
      name: 'נועם כ.',
      text: '"אפליקציה מעולה, קלה לניווט ונוחה מאוד. הכול ברור, פשוט וזורם, בדיוק כמו שצריך ללמידה יומיומית."',
      color: '#667eea'
    },
    {
      name: 'שיר ל.',
      text: '"התרגולים אפקטיביים מאוד ועוזרים לי לזכור את התובנות. הרגשה שאני באמת מטמיעה את הידע ולא רק קוראת."',
      color: '#f5576c'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2>מה משתמשים מספרים על <span className="highlight-reado">Reado</span>?</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar" style={{ background: testimonial.color }}>
                  <img src={`${process.env.PUBLIC_URL}/images/user-icon.png`} alt="User" className="avatar-icon" />
                </div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <div className="testimonial-rating">★★★★★</div>
                </div>
              </div>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
