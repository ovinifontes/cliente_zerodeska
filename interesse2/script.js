// Proteção contra carregamento múltiplo do script
if (window.__scriptGiovanniLoaded) {
    console.warn('Script já foi carregado anteriormente, ignorando...');
} else {
    window.__scriptGiovanniLoaded = true;

// O cliente Supabase é criado diretamente no HTML quando o script carrega
// Não precisa de inicialização complexa aqui

// Tentar salvar no Supabase - agora aguarda o resultado
async function trySaveToSupabase(nome, telefone) {
    console.log('=== TENTANDO SALVAR NO SUPABASE ===');
    console.log('Dados:', { nome, telefone });
    console.log('Nome da tabela: captura_joaoviral_01');
    
    // Verificar se o Supabase está disponível
    if (!window.supabase) {
        console.error('❌ Supabase SDK não foi carregado!');
        throw new Error('Supabase SDK não disponível');
    }
    
    // Usar o cliente que foi criado no HTML
    let clienteFinal = window.supabaseClient;
    
    console.log('Cliente Supabase disponível?', !!clienteFinal);
    console.log('window.supabase:', typeof window.supabase);
    console.log('window.supabaseClient:', clienteFinal);
    
    // Se não tiver cliente, tentar criar
    if (!clienteFinal) {
        console.log('⚠️ Cliente não encontrado, tentando criar...');
        
        // Aguardar um pouco para garantir que o SDK seja carregado
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            if (window.supabase && typeof window.supabase.createClient === 'function') {
                const SUPABASE_URL = 'https://ilyrnvvaadcdxtfrgsmw.supabase.co';
                const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlseXJudnZhYWRjZHh0ZnJnc213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NTAzODQsImV4cCI6MjA4NjIyNjM4NH0.WSnVh37DBFWrxBADGxMr9QO-l8r3YN2X17Ip52Gwyws';
                clienteFinal = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                window.supabaseClient = clienteFinal;
                console.log('✅ Cliente criado na tentativa', i + 1);
                break;
            }
        }
        
        if (!clienteFinal) {
            console.error('❌ Não foi possível criar o cliente Supabase após 5 tentativas');
            throw new Error('Supabase não disponível após tentativas');
        }
    }
    
    console.log('Enviando dados para Supabase...');
    console.log('Tabela: captura_joaoviral_01');
    console.log('Payload:', { nome, telefone });
    
    const { data, error } = await clienteFinal
        .from('captura_joaoviral_01')
        .insert([{ nome, telefone }]);
    
    if (error) {
        console.error('❌ ERRO ao salvar no Supabase:');
        console.error('Código:', error.code);
        console.error('Mensagem:', error.message);
        console.error('Detalhes:', error.details);
        console.error('Hint:', error.hint);
        console.error('Erro completo:', JSON.stringify(error, null, 2));
        
        // Mostrar erro mais amigável
        alert('Erro ao salvar: ' + error.message + '. Verifique o console para mais detalhes.');
        throw error;
    }
    
    console.log('✅✅✅ DADOS SALVOS COM SUCESSO NO SUPABASE!');
    console.log('ID do registro:', data?.[0]?.id);
    console.log('Dados salvos:', data);
    
    return data;
}

// Enviar webhook após salvar no Supabase
async function sendWebhook(nome, telefone, site) {
    const webhookUrl = 'https://0a10k-n8n-web.tk2vyh.easypanel.host/webhook/captura_cadastro_webnario_joaoviral';
    
    try {
        console.log('=== ENVIANDO WEBHOOK ===');
        console.log('URL:', webhookUrl);
        console.log('Dados:', { nome, telefone, site });
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                telefone: telefone,
                site: site
            })
        });
        
        if (!response.ok) {
            throw new Error(`Webhook retornou status ${response.status}`);
        }
        
        const responseData = await response.json().catch(() => ({}));
        console.log('✅✅✅ WEBHOOK ENVIADO COM SUCESSO!');
        console.log('Resposta:', responseData);
        
        return responseData;
    } catch (error) {
        console.error('❌ ERRO ao enviar webhook:');
        console.error('Erro:', error);
        // Não lançar erro para não interromper o fluxo do usuário
        // O webhook é secundário, o importante é que os dados foram salvos no Supabase
        return null;
    }
}

// Máscara de telefone brasileira
function maskPhone(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    return value;
}

// Formatar telefone para salvar no Supabase: 55DD9XXXXXXXX
function formatPhoneForSupabase(telefone) {
    if (!telefone) return '';
    
    // Remover todos os caracteres não numéricos
    let numeros = telefone.replace(/\D/g, '');
    
    // Se já começar com 55, remover (código do país)
    if (numeros.startsWith('55')) {
        numeros = numeros.substring(2);
    }
    
    // Se tiver 9 dígitos (DD + 7 dígitos), adicionar 9 após o DD
    if (numeros.length === 9) {
        numeros = numeros.substring(0, 2) + '9' + numeros.substring(2);
    }
    // Se tiver 10 dígitos (DD + 8 dígitos), adicionar 9 após o DD
    else if (numeros.length === 10) {
        numeros = numeros.substring(0, 2) + '9' + numeros.substring(2);
    }
    // Se tiver 11 dígitos (DD + 9 + 8 dígitos), está correto
    // Se tiver menos de 9, não fazer nada (número inválido)
    
    // Adicionar código do país 55 no início
    return '55' + numeros;
}

// Scroll até o formulário fixo (função global) - DEFINIDA IMEDIATAMENTE
function openFormModal() {
    const formElement = document.getElementById('topo-form');
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Focar no primeiro campo após um pequeno delay para melhorar UX
        setTimeout(() => {
            const nomeInput = document.getElementById('nomeFixed');
            if (nomeInput) {
                nomeInput.focus();
            }
        }, 500);
    }
}

// Função scrollToForm (alias para openFormModal)
function scrollToForm() {
    openFormModal();
}

// Fechar modal de sucesso - DEFINIDA IMEDIATAMENTE
function closeModal() {
    const successModal = document.getElementById('successModal');
    
    if (successModal) successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Garantir que funções estejam disponíveis globalmente IMEDIATAMENTE
window.openFormModal = openFormModal;
window.scrollToForm = scrollToForm;
window.closeModal = closeModal;

// Função reutilizável para processar submissão do formulário
async function processFormSubmission(nomeElementId, telefoneElementId, formElement) {
    const nome = document.getElementById(nomeElementId);
    const telefone = document.getElementById(telefoneElementId);
    
    if (!nome || !telefone) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    
    const nomeValue = nome.value.trim();
    const telefoneValue = telefone.value.trim();
    
    if (!nomeValue || !telefoneValue) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    
    // Desabilitar botão para evitar múltiplos envios
    const submitButton = formElement.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
    }
    
    // Não precisa fechar modal, pois não existe mais
    
    try {
        // Formatar telefone para o formato 55DD9XXXXXXXX antes de salvar
        const telefoneFormatado = formatPhoneForSupabase(telefoneValue);
        console.log('Telefone original:', telefoneValue);
        console.log('Telefone formatado para Supabase:', telefoneFormatado);
        
        // Aguardar salvamento no Supabase antes de mostrar modal
        await trySaveToSupabase(nomeValue, telefoneFormatado);
        
        // Enviar webhook após salvar no Supabase
        await sendWebhook(nomeValue, telefoneFormatado, 'joaoviral_interesse2');
        
        // Disparar evento de conversão do Meta Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
            console.log('✅ Evento Lead disparado no Meta Pixel');
        }
        
        // LIMPAR FORMULÁRIO
        if (formElement) {
            formElement.reset();
        }
        
        // Mostrar modal de sucesso
        const successModal = document.getElementById('successModal');
        if (successModal) {
            // Ocultar loading indicator
            const loadingIndicator = successModal.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Iniciar countdown de redirecionamento
            startRedirectCountdown();
        } else {
            // Se não houver modal, redirecionar diretamente
            window.location.href = 'https://joaoviral.com.br/interesse/agradecimento';
        }
        
    } catch (error) {
        console.error('Erro ao processar formulário:', error);
        // Mesmo com erro, mostrar modal ou redirecionar
        const successModal = document.getElementById('successModal');
        if (successModal) {
            // Ocultar loading indicator mesmo em caso de erro
            const loadingIndicator = successModal.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            startRedirectCountdown();
        } else {
            window.location.href = 'https://joaoviral.com.br/interesse/agradecimento';
        }
    }
    
    return true;
}

// Countdown de redirecionamento
function startRedirectCountdown() {
    let seconds = 5;
    const countdownElement = document.getElementById('redirectCountdown');
    const secondsElement = document.getElementById('redirectSeconds');
    const whatsappLink = 'https://chat.whatsapp.com/Jmp9GqVrRvoJgz9ZoN1NVI?mode=gi_t';
    
    if (countdownElement) countdownElement.textContent = seconds;
    if (secondsElement) secondsElement.textContent = seconds;
    
    const interval = setInterval(() => {
        seconds--;
        if (countdownElement) countdownElement.textContent = seconds;
        if (secondsElement) secondsElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(interval);
            window.location.href = whatsappLink;
        }
    }, 1000);
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // O cliente Supabase é criado diretamente no HTML, não precisa inicializar aqui
    
    // Aplicar máscara no campo de telefone do formulário fixo
    const telefoneInputFixed = document.getElementById('telefoneFixed');
    if (telefoneInputFixed) {
        telefoneInputFixed.addEventListener('input', function(e) {
            e.target.value = maskPhone(e.target.value);
        });
    }
    
    // Fechar modal de sucesso ao clicar fora
    window.addEventListener('click', function(event) {
        const successModal = document.getElementById('successModal');
        
        if (event.target === successModal) {
            closeModal();
        }
    });
    
    // Submeter formulário fixo - FLUXO SIMPLIFICADO QUE SEMPRE FUNCIONA
    const leadFormFixed = document.getElementById('leadFormFixed');
    if (leadFormFixed) {
        leadFormFixed.addEventListener('submit', function(e) {
            e.preventDefault();
            processFormSubmission('nomeFixed', 'telefoneFixed', leadFormFixed);
        });
    }
});

} // Fim da proteção contra carregamento múltiplo
