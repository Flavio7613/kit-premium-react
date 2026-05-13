import React, { useEffect, useState, useRef } from 'react';
import './index.css';

// Hook for scroll reveals
const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return [domRef, isVisible];
};

const Section = ({ children, className = "" }) => {
  const [ref, isVisible] = useReveal();
  return (
    <section ref={ref} className={`${className} reveal ${isVisible ? 'visible' : ''}`}>
      {children}
    </section>
  );
};

const App = () => {
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCTA = () => {
    window.location.href = '#checkout';
  };

  const isUrgent = timeLeft < 3 * 60;

  return (
    <div className="landing-page">
      {/* Sticky Footer (Timer + CTA) */}
      <div className={`sticky-footer ${showSticky ? 'show' : ''}`}>
        <div className={`floating-timer ${isUrgent ? 'urgent' : ''}`}>
          <span className="timer-text">⚠️ Oferta especial expira em:</span>
          <span className="timer-numbers">{formatTime(timeLeft)}</span>
        </div>
        <div className="sticky-cta">
          <div className="sticky-cta-content">
            <button onClick={handleCTA} className="btn btn-pulse">QUERO ACESSO AGORA</button>
            <a href="#" className="btn-refusal">Quero Perder esta Oportunidade</a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <div className="hero-top-mobile">
            <div className={`hero-timer ${isUrgent ? 'urgent' : ''}`}>
              <span className="timer-text">⚠️ Oferta expira em:</span>
              <span className="timer-numbers">{formatTime(timeLeft)}</span>
            </div>
            <div className="badge-offer">✔ Oferta Única</div>
          </div>
          <div className="grid-hero">
            <div className="hero-content">
              <h1>Leve hoje o acesso completo e tenha muito mais variedade para cuidar da sua alimentação.</h1>
              <p className="subheadline">Pare de sofrer sem saber o que comer no dia a dia. Descubra receitas, cardápios e materiais práticos criados para ajudar diabéticos a terem uma alimentação mais equilibrada sem abrir mão do sabor.</p>
              
              <div className="cta-group">
                <button onClick={handleCTA} className="btn btn-large">QUERO ACESSO IMEDIATO</button>
                <a href="#" className="btn-refusal">Quero Perder esta Oportunidade</a>
              </div>
              <p className="micro-text" style={{fontSize: '0.85rem', color: '#887777', marginTop: '15px', fontStyle: 'italic'}}>Oferta liberada apenas nesta página.</p>
            </div>

            <div className="hero-mockup">
              <img src="https://i.imgur.com/JtmD8Ig.png" alt="Mockup Kit Premium" />
            </div>
          </div>
        </div>
      </header>

      {/* Pains Section */}
      <Section className="pains section-padding" style={{backgroundColor: '#fdf8f9'}}>
        <div className="container">
          <p className="emocional-text" style={{fontSize: '1.5rem', fontStyle: 'italic', textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px', color: '#ff5fa2', fontWeight: '300'}}>
            “Muitas pessoas acabam desregulando a alimentação justamente por falta de organização e variedade no dia a dia.”
          </p>
          <div className="grid-pains">
            {[
              {icon: '🤔', text: 'Não saber o que comer'},
              {icon: '🍰', text: 'Sentir falta de doces'},
              {icon: '🏃‍♀️', text: 'Rotina corrida'},
              {icon: '📈', text: 'Medo de piorar a glicose'},
              {icon: '🤮', text: 'Dietas difíceis e sem sabor'}
            ].map((item, i) => (
              <div key={i} className="pain-card">
                <div style={{fontSize: '2.5rem', marginBottom: '15px'}}>{item.icon}</div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="benefits section-padding">
        <div className="container">
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px'}}>Tudo o que você precisa para facilitar sua alimentação</h2>
          <div className="grid-benefits">
            {[
              {icon: '✅', text: '+100 receitas doces extras para diabéticos'},
              {icon: '📅', text: 'Cardápio completo para 30 dias'},
              {icon: '🔄', text: 'Guia de substituições inteligentes'},
              {icon: '🛒', text: 'Lista de compras organizada'},
              {icon: '⚡', text: '20 receitas rápidas de até 15 minutos'}
            ].map((item, i) => (
              <div key={i} className="benefit-card">
                <div style={{fontSize: '2rem', minWidth: '50px'}}>{item.icon}</div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '600'}}>{item.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Urgency Section (Static version in page) */}
      <Section className="urgency section-padding">
        <div className="container">
          <div className="urgency-box" style={{backgroundColor: '#ffd6e7', padding: '60px 40px', borderRadius: '30px', textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
            <h2 style={{color: '#ff5fa2', marginBottom: '20px'}}>Essa condição especial pode não aparecer novamente.</h2>
            <p>Esse pacote premium foi liberado apenas para pessoas que chegaram até aqui. Depois que sair desta página, essa oferta poderá não ficar mais disponível.</p>
            <div className="timer-container" style={{marginTop: '30px'}}>
              <div style={{fontWeight: '600', marginBottom: '10px'}}>A oferta expira em:</div>
              <div className="countdown" style={{fontSize: '3.5rem', fontWeight: '800', color: isUrgent ? '#ff0000' : '#ff5fa2', fontFamily: 'monospace'}}>{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="testimonials section-padding">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '50px'}}>O que dizem nossos alunos</h2>
          <div className="testimonial-card" style={{maxWidth: '800px', margin: '0 auto', padding: '40px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(255, 95, 162, 0.1)', textAlign: 'center'}}>
            <div style={{color: '#ffcc00', marginBottom: '20px'}}>⭐⭐⭐⭐⭐</div>
            <p style={{fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '20px'}}>"Finalmente consegui me organizar. As receitas são muito práticas e o sabor é surpreendente!"</p>
            <span style={{fontWeight: '700', color: '#ff5fa2'}}>- Maria Silva</span>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section id="checkout" className="final-cta section-padding">
        <div className="container">
          <div className="pricing-box">
            <h2>Comece hoje a tornar sua alimentação mais prática, saborosa e organizada.</h2>
            <div className="price">
              <span className="old-price">De R$97</span>
              <span className="new-price">Por apenas R$24,90</span>
            </div>
            <div className="cta-group">
              <button onClick={handleCTA} className="btn btn-large btn-giant">SIM! QUERO O KIT PREMIUM</button>
              <a href="#" className="btn-refusal">Quero Perder esta Oportunidade</a>
            </div>
            
            <div className="guarantees">
              <span>✔ Acesso imediato</span>
              <span>✔ Pagamento seguro</span>
              <span>✔ Oferta única</span>
            </div>
          </div>
        </div>
      </Section>

      <footer style={{padding: '40px 0', textAlign: 'center', fontSize: '0.9rem', color: '#998888', background: '#fffafa'}}>
        <p>&copy; 2024 Kit Premium Diabéticos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
