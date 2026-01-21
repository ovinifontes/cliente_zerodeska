'use client'

import { useEffect } from 'react'

interface VideoPlayerProps {
  videoId?: string
  playerScriptUrl?: string
}

export default function VideoPlayer({ 
  videoId = 'vid-697030f0dd2fe7b48871fc9f',
  playerScriptUrl = 'https://scripts.converteai.net/68062536-7eb4-4ab7-9a0e-c18918a0378d/players/697030f0dd2fe7b48871fc9f/v4/player.js'
}: VideoPlayerProps) {
  useEffect(() => {
    // Preload VTURB resources
    const link1 = document.createElement('link')
    link1.rel = 'preload'
    link1.href = 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js'
    link1.as = 'script'
    document.head.appendChild(link1)

    const link2 = document.createElement('link')
    link2.rel = 'dns-prefetch'
    link2.href = 'https://cdn.converteai.net'
    document.head.appendChild(link2)

    const link3 = document.createElement('link')
    link3.rel = 'dns-prefetch'
    link3.href = 'https://scripts.converteai.net'
    document.head.appendChild(link3)

    const link4 = document.createElement('link')
    link4.rel = 'dns-prefetch'
    link4.href = 'https://images.converteai.net'
    document.head.appendChild(link4)

    const link5 = document.createElement('link')
    link5.rel = 'dns-prefetch'
    link5.href = 'https://api.vturb.com.br'
    document.head.appendChild(link5)

    // Carregar script do VTURB
    const script = document.createElement('script')
    script.src = playerScriptUrl
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup se necessário
      const existingScript = document.querySelector(`script[src="${playerScriptUrl}"]`)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [playerScriptUrl])

  return (
    <div className="video-wrapper">
      <vturb-smartplayer 
        id={videoId} 
        style={{ display: 'block', margin: '0 auto', width: '100%' }}
      />
    </div>
  )
}
