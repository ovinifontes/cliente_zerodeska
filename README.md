# Cliente ZeroDeska - Ravinia Amorim

Páginas estáticas hospedadas no GitHub Pages para o produto "De 0 a 10k" e "Jornada da Prosperidade".

## 🌐 URLs Publicadas

- **Página Principal**: [raviniamorim.com.br](https://raviniamorim.com.br)
- **VSL (Video Sales Letter)**: [raviniamorim.com.br/vsl](https://raviniamorim.com.br/vsl)
- **Página de Interesse**: [raviniamorim.com.br/interesse](https://raviniamorim.com.br/interesse)

## 📁 Estrutura do Projeto

```
cliente_zerodeska/
├── .gitignore
├── CNAME                    # Configuração do domínio customizado
├── README.md
├── index.html               # Página principal
├── vsl/                     # VSL - De 0 a 10k
│   ├── index.html
│   ├── script.js
│   └── styles.css
└── interesse/               # Página de interesse - Jornada da Prosperidade
    ├── index.html
    ├── script.js
    ├── styles.css
    ├── images/
    └── agradecimento/
        ├── index.html
        └── styles.css
```

## 🚀 Deploy no GitHub Pages

Este projeto usa GitHub Pages com HTML estático. Para fazer deploy:

1. Faça commit e push das alterações:
   ```bash
   git add .
   git commit -m "Atualização"
   git push origin main
   ```

2. O GitHub Pages publica automaticamente a partir da branch `main`

3. O domínio customizado está configurado via arquivo `CNAME`

## 📝 Configurações

### Meta Pixel
- **VSL**: ID `1917254782203311` configurado em `vsl/index.html`
- **Interesse**: ID `1837527450261242` configurado em `interesse/index.html`

### Integrações
- **VSL**: Integração com VTURB para player de vídeo
- **Interesse**: Integração com Supabase para captura de leads (`interesse/script.js`)

## 🛠️ Desenvolvimento Local

Como são páginas HTML estáticas, você pode abrir diretamente no navegador ou usar um servidor local simples:

```bash
# Usando Python
python3 -m http.server 8000

# Usando Node.js (http-server)
npx http-server -p 8000

# Acessar: http://localhost:8000
```

## 📄 Licença

Projeto privado - Ravinia Amorim
