import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'De 0 a 10k | Ravinia Amorim',
  description: 'Descubra o método validado para crescer seu Instagram de 0 a 10k seguidores. Assista ao vídeo e veja se você se qualifica.',
  metadataBase: new URL('https://raviniamorim.com.br'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
