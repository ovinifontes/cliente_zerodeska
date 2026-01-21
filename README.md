# Cliente ZeroDeska - Ravinia Amorim

VSL (Video Sales Letter) para o produto "De 0 a 10k" - Método para crescer Instagram de 0 a 10k seguidores.

## 🚀 Deploy no GitHub Pages

### Passo 1: Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `cliente_zerodeska`
3. Deixe **privado** ou **público** (sua escolha)
4. **NÃO** marque "Initialize with README"
5. Clique em "Create repository"

### Passo 2: Conectar ao GitHub

Execute no terminal:

```bash
cd /Users/viniciusfontes/Documents/Projetos/Scripts/zerodeska/cliente_zerodeska

# Adicionar remote (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/cliente_zerodeska.git

# Fazer push
git push -u origin main
```

### Passo 3: Ativar GitHub Pages

1. No repositório GitHub, vá em **Settings** → **Pages**
2. Em **Source**, selecione **"GitHub Actions"**
3. O workflow vai fazer o deploy automaticamente após o primeiro push

### Passo 4: Acessar sua VSL

Após o deploy (pode levar alguns minutos), sua VSL estará disponível em:

- **GitHub Pages**: `https://SEU_USUARIO.github.io/cliente_zerodeska/vsl`
- **Domínio customizado**: `raviniamorim.com.br/vsl` (após configurar DNS)

## 📝 Configurações Necessárias

1. **Meta Pixel**: Substitua `SEU_PIXEL_ID_AQUI` em `app/vsl/page.tsx` pelo ID do seu Meta Pixel
2. **VTURB Video**: Quando o vídeo estiver pronto, atualize `videoId` e `playerScriptUrl` em `app/vsl/components/VideoPlayer.tsx`

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Acessar: http://localhost:3000/vsl
```

## 📁 Estrutura

```
app/
  └── vsl/
      ├── page.tsx          # Página da VSL
      ├── styles.css         # Estilos
      └── components/
          ├── VideoPlayer.tsx   # Player VTURB
          └── FormModal.tsx     # Modal de captura
```

## 🌐 Domínio Customizado

Para usar `raviniamorim.com.br/vsl`:

1. Configure o DNS do domínio apontando para GitHub Pages
2. No GitHub Pages Settings, adicione o domínio customizado
3. O Next.js já está configurado para funcionar com o domínio
