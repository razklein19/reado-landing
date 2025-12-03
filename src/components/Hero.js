import React, { useRef, useEffect } from 'react';

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to autoplay with sound
    const playWithSound = async () => {
      try {
        video.muted = false;
        await video.play();
      } catch (error) {
        // If autoplay with sound fails, start muted
        video.muted = true;
        try {
          await video.play();
        } catch (err) {
          console.log('Autoplay failed:', err);
        }
      }
    };

    playWithSound();

    // Unmute on first user interaction if video is muted
    const handleInteraction = async () => {
      if (video.muted) {
        video.muted = false;
        if (video.paused) {
          try {
            await video.play();
          } catch (err) {
            console.log('Play after interaction failed:', err);
          }
        }
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

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
          <video ref={videoRef} controls playsInline webkit-playsinline preload="auto">
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
