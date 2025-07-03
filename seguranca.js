// ============================================================================
// SISTEMA DE PROTEÇÃO DE IMAGENS
// ============================================================================

// Aguarda o carregamento completo do DOM antes de executar
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================================
    // 1. PROTEÇÃO ESPECÍFICA PARA IMAGEM DE PERFIL
    // ========================================================================
    const profileImg = document.querySelector('.img-profile');
    if (profileImg) {
        profileImg.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            console.log('Clique direito bloqueado na imagem de perfil');
        });
    }

    // ========================================================================
    // 2. PROTEÇÃO GLOBAL DO MENU DE CONTEXTO
    // ========================================================================
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log('Menu de contexto bloqueado');
    }, false);

    // ========================================================================
    // 3. BLOQUEIO DE ATALHOS DO TECLADO
    // ========================================================================
    document.addEventListener('keydown', function(e) {
        // Lista de combinações bloqueadas
        const blockedKeys = [
            // Salvar página
            (e.ctrlKey && e.key.toLowerCase() === 's'),
            // Ver código fonte
            (e.ctrlKey && e.key.toLowerCase() === 'u'),
            // Ferramentas de desenvolvedor
            (e.key === 'F12'),
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i'),
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j'),
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c'),
            // Selecionar tudo
            (e.ctrlKey && e.key.toLowerCase() === 'a'),
            // Imprimir
            (e.ctrlKey && e.key.toLowerCase() === 'p')
        ];

        if (blockedKeys.some(blocked => blocked)) {
            e.preventDefault();
            console.log(`Atalho bloqueado: ${e.key}`);
        }
    }, false);

    // ========================================================================
    // 4. PROTEÇÃO AVANÇADA PARA TODAS AS IMAGENS
    // ========================================================================
    function protectImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(function(img) {
            // Verifica se a imagem já foi protegida
            if (img.dataset.protected === 'true') {
                return;
            }

            // Marca a imagem como protegida
            img.dataset.protected = 'true';

            // Desabilita o arrastar
            img.setAttribute('draggable', 'false');
            
            // Desabilita seleção
            img.style.userSelect = 'none';
            img.style.webkitUserSelect = 'none';
            img.style.mozUserSelect = 'none';
            img.style.msUserSelect = 'none';

            // Bloqueia menu de contexto específico da imagem
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            // Bloqueia eventos de mouse que podem ser usados para salvar
            img.addEventListener('mousedown', function(e) {
                if (e.button === 2) { // Botão direito
                    e.preventDefault();
                }
            });

            // Cria wrapper para proteção adicional
            createImageWrapper(img);
        });
    }

    // ========================================================================
    // 5. FUNÇÃO PARA CRIAR WRAPPER PROTETOR
    // ========================================================================
    function createImageWrapper(img) {
        // Evita criar wrapper duplo
        if (img.parentNode.classList.contains('image-protection-wrapper')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'image-protection-wrapper';
        wrapper.style.cssText = `
            display: inline-block;
            position: relative;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        `;

        // Cria overlay invisível
        const overlay = document.createElement('div');
        overlay.className = 'image-protection-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            cursor: default;
            background: transparent;
            pointer-events: auto;
        `;

        // Reorganiza os elementos
        const parent = img.parentNode;
        parent.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(overlay);

        // Eventos no overlay
        overlay.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        overlay.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });
    }

    // ========================================================================
    // 6. PROTEÇÃO CONTRA FERRAMENTAS DE DESENVOLVEDOR
    // ========================================================================
    function detectDevTools() {
        let devtools = {
            open: false,
            orientation: null
        };

        const threshold = 160;

        setInterval(function() {
            if (window.outerHeight - window.innerHeight > threshold ||
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    console.clear();
                    console.log('%c⚠️ ATENÇÃO: Ferramentas de desenvolvedor detectadas!', 
                               'color: red; font-size: 20px; font-weight: bold;');
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }

    // ========================================================================
    // 7. OBSERVER PARA NOVAS IMAGENS DINÂMICAS
    // ========================================================================
    function setupImageObserver() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Verifica se o próprio node é uma imagem
                            if (node.tagName === 'IMG') {
                                setTimeout(() => protectImages(), 100);
                            }
                            // Verifica se contém imagens
                            else if (node.querySelectorAll && node.querySelectorAll('img').length > 0) {
                                setTimeout(() => protectImages(), 100);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // ========================================================================
    // 8. INICIALIZAÇÃO DO SISTEMA
    // ========================================================================
    
    // Protege imagens existentes
    protectImages();
    
    // Configura observer para novas imagens
    setupImageObserver();
    
    // Ativa detector de dev tools (opcional)
    detectDevTools();

    // Re-executa proteção após um tempo para garantir
    setTimeout(protectImages, 1000);

    console.log('✅ Sistema de proteção de imagens ativado');
});

// ============================================================================
// 9. PROTEÇÕES ADICIONAIS
// ============================================================================

// Desabilita seleção de texto em toda a página
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Desabilita arrastar elementos
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});




/*------------------------------------------------------------------------------------------------------------------------------*/

// Proteção contra ferramentas de desenvolvedor - Versão Modificada
(function() {
    'use strict';
    
    // Detecta se as DevTools estão abertas
    let devtools = {
        open: false,
        orientation: null,
        warningShown: false
    };
    
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                console.log('DevTools detectadas!');
                handleDevToolsOpen();
            }
        } else {
            if (devtools.open) {
                devtools.open = false;
                devtools.warningShown = false; // Reset warning quando DevTools são fechadas
            }
        }
    }, 500);
    
    // Função executada quando DevTools são detectadas
    function handleDevToolsOpen() {
        // Apenas mostra aviso uma vez por sessão
        if (!devtools.warningShown) {
            devtools.warningShown = true;
            
            // Opção 1: Apenas console warning
            console.warn('⚠️ DevTools detectadas! O uso de ferramentas de desenvolvedor pode violar os termos de uso.');
            
            // Opção 2: Alert (descomente se preferir)
            // alert('⚠️ Ferramentas de desenvolvedor detectadas!\nO uso pode violar os termos de uso do site.');
            
            // Opção 3: Notificação discreta na página (descomente se preferir)
            // showNotification('DevTools detectadas. Uso pode violar termos de uso.');
        }
        
        // REMOVIDO: window.location.href = 'about:blank';
        // REMOVIDO: window.close();
    }
    
    // Função para mostrar notificação discreta (opcional)
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove notificação após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
    
    // Desabilita F12 e outras teclas (mantido mais suave)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
            e.stopPropagation();
            
            // Mostra aviso em vez de bloquear
            if (!devtools.warningShown) {
                console.warn('⚠️ Tentativa de acesso às ferramentas de desenvolvedor detectada.');
                // Opcionalmente, mostrar notificação
                // showNotification('Acesso às ferramentas de desenvolvedor restrito.');
            }
            
            return false;
        }
    });
    
    // Desabilita clique direito (opcional - pode ser removido se muito restritivo)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.warn('⚠️ Menu de contexto desabilitado.');
        return false;
    });
    
    // REMOVIDO: Detecção de debugger agressiva
    // REMOVIDO: Limpeza automática do console
    
    // Detecta mudança no tamanho da janela (versão mais suave)
    window.addEventListener('resize', function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                handleDevToolsOpen();
            }
        }
    });
    
    // REMOVIDO: Proteções muito agressivas do console
    // REMOVIDO: Proteção contra seleção de texto (muito restritiva)
    // REMOVIDO: Proteção contra arrastar (muito restritiva)
    
    console.log('Sistema de proteção ativo - Modo não-intrusivo');
})();