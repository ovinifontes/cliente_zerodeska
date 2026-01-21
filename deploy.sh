#!/bin/bash

echo "🚀 Configurando deploy para GitHub Pages..."
echo ""

# Verificar se já tem remote
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote já configurado"
    REMOTE_URL=$(git remote get-url origin)
    echo "   URL: $REMOTE_URL"
else
    echo "⚠️  Remote não configurado ainda"
    echo ""
    echo "📝 Para conectar ao GitHub, execute:"
    echo "   git remote add origin https://github.com/SEU_USUARIO/cliente_zerodeska.git"
    echo ""
    echo "   (Substitua SEU_USUARIO pelo seu usuário do GitHub)"
    echo ""
    read -p "Deseja configurar o remote agora? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        read -p "Digite seu usuário do GitHub: " GITHUB_USER
        git remote add origin https://github.com/$GITHUB_USER/cliente_zerodeska.git
        echo "✅ Remote configurado!"
    fi
fi

echo ""
echo "📤 Fazendo push para o GitHub..."
git push -u origin main

echo ""
echo "✅ Deploy configurado!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Acesse: https://github.com/SEU_USUARIO/cliente_zerodeska"
echo "   2. Vá em Settings → Pages"
echo "   3. Em 'Source', selecione 'GitHub Actions'"
echo "   4. O deploy será feito automaticamente!"
echo ""
echo "🌐 Sua VSL estará disponível em:"
echo "   https://SEU_USUARIO.github.io/cliente_zerodeska/vsl"
