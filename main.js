


  // Arrays para nomes em português (mais eficiente que múltiplos ifs)
        const dias = [
            "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", 
            "Quinta-feira", "Sexta-feira", "Sábado"
        ];
        
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        // Função para atualizar a hora
        function myTimer() {
            const d = new Date();
            let displayDate;
            
            // Verifica se é Firefox (compatibilidade com versões antigas)
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                displayDate = d.toLocaleTimeString('pt-BR');
            } else {
                displayDate = d.toLocaleTimeString('pt-BR', {timeZone: 'America/Sao_Paulo'});
            }
            
            document.getElementById("tela1").innerHTML = displayDate;
        }

        // Função para atualizar a data
        function updateDate() {
            const now = new Date();
            const dayName = dias[now.getDay()];
            const monthName = meses[now.getMonth()];
            const dayNumber = now.getDate();
            const year = now.getFullYear(); // Usar getFullYear() ao invés de getYear()
            
            const todaysDate = `${dayNumber} de ${monthName} de ${year} - ${dayName}`;
            document.getElementById("tela2").innerHTML = todaysDate;
        }

        // Executa quando a página carrega
        window.onload = function() {
            // Atualiza a data imediatamente
            updateDate();
            
            // Atualiza a hora imediatamente
            myTimer();
            
            // Configura o intervalo para atualizar a hora a cada segundo
            const myVar = setInterval(myTimer, 1000);
            
            // Atualiza a data a cada minuto (opcional, para casos de mudança de dia)
            setInterval(updateDate, 60000);
        };

        // Versão alternativa mais moderna (comentada)
        /*
        // VERSÃO MODERNA ALTERNATIVA:
        function updateClock() {
            const now = new Date();
            
            // Hora formatada
            const timeOptions = {
                timeZone: 'America/Sao_Paulo',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            // Data formatada
            const dateOptions = {
                timeZone: 'America/Sao_Paulo',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            
            const timeString = now.toLocaleTimeString('pt-BR', timeOptions);
            const dateString = now.toLocaleDateString('pt-BR', dateOptions);
            
            document.getElementById("tela1").innerHTML = timeString;
            document.getElementById("tela2").innerHTML = dateString;
        }

        window.onload = function() {
            updateClock();
            setInterval(updateClock, 1000);
        };

      */