import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: '📚',
      title: 'בחר ספר',
      description: 'עיין בספריית הספרים שלנו ובחר את הספר שמעניין אותך'
    },
    {
      number: '2',
      icon: '📖',
      title: 'קרא או האזן',
      description: 'תוך 15 דקות תקבל את התובנות המרכזיות - קריאה או האזנה'
    },
    {
      number: '3',
      icon: '✍️',
      title: 'תרגל וזכור',
      description: 'השלם תרגולים אינטראקטיביים שיעזרו לך לזכור את המרכזי'
    },
    {
      number: '4',
      icon: '🎯',
      title: 'בנה תוכנית פעולה',
      description: 'צור תוכנית אישית ליישום התובנות בהתאם למטרות שלך'
    },
    {
      number: '5',
      icon: '🚀',
      title: 'יישם ושפר',
      description: 'עקוב אחר ההתקדמות שלך והפוך ידע ליישום אמיתי'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>איך זה עובד?</h2>
        <p className="hiw-subtitle">ככה Reado הופכת ידע ליישום אמיתי ב־5 שלבים פשוטים</p>
        <div className="hiw-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            loop={false}
            className="hiw-swiper"
            dir="rtl"
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <div className="hiw-slide">
                  <div className="hiw-slide-icon">{step.icon}</div>
                  <div className="hiw-slide-number">שלב {step.number}</div>
                  <h3 className="hiw-slide-title">{step.title}</h3>
                  <p className="hiw-slide-description">{step.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
