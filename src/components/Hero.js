import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            <div className="title-row">
              <span className="title-light">לקרוא.</span>
              <span className="title-center title-bold">לעשות!</span>
              <span className="title-light">ללמוד.</span>
            </div>
          </h1>
          <p>הדרך הפשוטה ביותר <span className="underline-wavy">ללמוד וליישם</span> תובנות מספרי התפתחות אישית <span className="underline-wavy">בפחות מ-15 דקות</span> ביום.</p>
        </div>
        <div className="hero-video">
          <video controls playsInline webkit-playsinline preload="auto" autoPlay>
            <source src={`${process.env.PUBLIC_URL}/images/reado-demo.mp4`} type="video/mp4" />
            הדפדפן שלך אינו תומך בווידאו
          </video>
        </div>
        <div className="hero-cta">
          <a href="https://reado-il.com" className="btn">התחל בחינם</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
