# Cliente ZeroDeska - Ravinia Amorim

Projeto Next.js para a VSL do produto "De 0 a 10k" da Ravinia Amorim.

## 🚀 Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse a VSL em:
```
http://localhost:3000/vsl
```

## 📝 Configurações necessárias

1. **Meta Pixel**: Substitua `SEU_PIXEL_ID_AQUI` no arquivo `app/vsl/page.tsx` pelo ID do seu Meta Pixel do Facebook.

2. **VTURB Video**: Quando o vídeo estiver pronto no VTURB, atualize os seguintes valores no arquivo `app/vsl/components/VideoPlayer.tsx`:
   - `videoId`: ID do vídeo no VTURB
   - `playerScriptUrl`: URL do script do player do VTURB

## 🌐 Deploy

O projeto está configurado para ser acessível em `raviniamorim.com.br/vsl` após o deploy.

## 📁 Estrutura do projeto

```
app/
  ├── layout.tsx          # Layout raiz
  ├── globals.css          # Estilos globais
  └── vsl/
      ├── page.tsx         # Página da VSL
      ├── styles.css       # Estilos da VSL
      └── components/
          ├── VideoPlayer.tsx   # Componente do player VTURB
          └── FormModal.tsx     # Modal de captura de leads
```
