import React, { useState, useEffect, useRef } from 'react';

function Testimonials() {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = 20;
          const duration = 2000;
          const increment = end / (duration / 50);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 50);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const testimonials = [
    {
      name: 'דנה ש.',
      text: '"הסיכומים טובים מאוד ותמצתים את הספרים בדיוק למה שצריך. כל תובנה ממוקדת ועוזרת להבין את העיקר בלי לבזבז זמן."',
      color: '#00d4aa'
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
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <h2>הצטרפו ל <span className="counter-animate">{count}</span>+ אנשים<br/>שכבר לומדים עם Reado</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar" style={{ background: testimonial.color }}>
                  <img src="/images/user-icon.png" alt="User" className="avatar-icon" />
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
