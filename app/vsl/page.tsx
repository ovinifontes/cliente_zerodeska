'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import './styles.css'
import FormModal from './components/FormModal'
import VideoPlayer from './components/VideoPlayer'

export default function VSLPage() {
  useEffect(() => {
    // Performance optimization script
    if (typeof window !== 'undefined' && window.performance) {
      ;(window as any)._plt = (window as any)._plt || (window.performance.timeOrigin ? window.performance.timeOrigin + window.performance.now() : Date.now())
    }
  }, [])

  return (
    <>
      {/* Meta Pixel Code */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'SEU_PIXEL_ID_AQUI');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1"
        />
      </noscript>

      {/* Top Bar */}
      <div className="top-bar">
        <p>VOCÊ ESTÁ PRESTES A DESCOBRIR O MÉTODO VALIDADO PARA CRESCER SEU INSTAGRAM DE 0 A 10K SEGUIDORES</p>
      </div>

      {/* Main Content */}
      <main className="vsl-container">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">CRESÇA SEU INSTAGRAM DE 0 A 10K</h1>
            <h2 className="hero-subtitle">Método Validado Por Diversos Clientes Que Criaram Contas Do Zero e Chegaram a 10K Seguidores</h2>
            
            {/* Video Section */}
            <div className="video-section">
              <VideoPlayer />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Este site não é afiliado ao Facebook, Instagram ou a qualquer entidade do Facebook. Se você sair do Facebook, não é responsabilidade deles, mas de nosso site.</p>
          <p>Fazemos o nosso melhor para indicar e mostrar claramente todas as evidências do produto com resultados dos nossos próprios usuários. Não vendemos seu e-mail ou suas informações a terceiros. Nunca enviamos spam.</p>
          <p>Se você tiver alguma dúvida, use o link de contato e fale conosco dias úteis a partir das 9h. até as 18h. De segunda a sexta e sábado das 10h as 14h. Respondemos na ordem de chegada em até 24h.</p>
          <p className="footer-brand">© 2025 Ravinia Amorim | raviniamorim.com.br</p>
        </div>
      </footer>

      {/* Modal de Formulário */}
      <FormModal />
    </>
  )
}
