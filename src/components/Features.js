import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Features() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  const features = [
    {
      icon: `${process.env.PUBLIC_URL}/images/audiobook-icon.png`,
      title: 'קראו או האזינו לתובנות המרכזיות',
      description: 'כ־15 דקות שמרכזות את התובנות מהספרים הטובים בעולם.',
      isImage: true,
      noBackground: true
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/roadmap-icon.png`,
      title: 'תרגולים אינטראקטיביים',
      description: 'תרגולים קצרים ומהנים שיעזרו לך לזכור, להבין וליישם את מה שלמדת',
      isImage: true,
      noBackground: true
    },
    {
      icon: `${process.env.PUBLIC_URL}/images/plan-icon.png`,
      title: 'תוכנית פעולה אישית',
      description: 'תוכנית פעולה מותאמת למטרות, לאתגרים ולחיי היום־יום שלך – מבוססת על הסיכום שקראת.',
      isImage: true,
      noBackground: true
    }
  ];

  return (
    <section className={`features fade-in-up ${isVisible ? 'visible' : ''}`} id="features" ref={ref}>
      <div className="container">
        <h2>השיטה של <span className="highlight-reado">Reado</span> שתעזור לך לעמוד <span className="underline-orange">במטרות שלך</span></h2>
        <div className="features-content">
          <div className="features-image">
            <img src={`${process.env.PUBLIC_URL}/images/reado-phones-circle.png`} alt="Reado App Preview" />
          </div>
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item-vertical">
                <div className={`feature-icon ${feature.noBackground ? 'no-background' : ''}`}>
                  {feature.isImage ? (
                    <img src={feature.icon} alt={feature.title} className="feature-icon-img" />
                  ) : (
                    feature.icon
                  )}
                </div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="features-cta">
          <a href="https://reado-il.com" className="btn btn-primary">התחל ניסיון חינם</a>
        </div>
      </div>
    </section>
  );
}

export default Features;
