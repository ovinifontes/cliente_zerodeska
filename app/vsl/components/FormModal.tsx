'use client'

import { useState, useEffect } from 'react'

export default function FormModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  })

  useEffect(() => {
    // Expor função global para abrir modal (caso seja chamada pelo vídeo)
    ;(window as any).openFormModal = () => setIsOpen(true)
    
    return () => {
      delete (window as any).openFormModal
    }
  }, [])

  const maskPhone = (value: string) => {
    value = value.replace(/\D/g, '')
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3')
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskPhone(e.target.value)
    setFormData({ ...formData, telefone: maskedValue })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nome || !formData.email || !formData.telefone) {
      alert('Por favor, preencha todos os campos.')
      return
    }
    
    // Aqui você pode adicionar integração com Supabase ou outro serviço
    console.log('Dados do formulário:', formData)
    
    // Exemplo de sucesso
    alert('Obrigado! Entraremos em contato em breve.')
    setIsOpen(false)
    setFormData({ nome: '', email: '', telefone: '' })
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div 
      className={`modal ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal()
        }
      }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>×</button>
        <h2 className="modal-title">Garanta Seu Acesso ao Método</h2>
        <h3 className="modal-subtitle">De 0 a 10k</h3>
        <p className="modal-description">Preencha seus dados abaixo para garantir sua vaga e começar a crescer seu Instagram hoje mesmo:</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Seu melhor e-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="Seu WhatsApp (com DDD)"
              value={formData.telefone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">QUERO CRESCER MEU INSTAGRAM AGORA</button>
        </form>
      </div>
    </div>
  )
}
