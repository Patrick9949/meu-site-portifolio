// Define a data e hora final da contagem regressiva
const dataFinal = new Date("2025-12-29T23:59:59").getTime();

// Cria um intervalo que será executado a cada 1 segundo (1000 ms)
const contador = setInterval(function() {
    const agora = new Date().getTime(); // Hora atual
    const tempoRestante = dataFinal - agora; // Diferença entre a data final e a atual

    // Cálculos para obter dias, horas, minutos e segundos
    const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

    // Atualiza o conteúdo do elemento com ID "contador"
    const elementoContador = document.getElementById("contador");
    if (elementoContador) {
        elementoContador.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    // Se o tempo acabar
    if (tempoRestante < 0) {
        clearInterval(contador); // Para o contador
        if (elementoContador) {
            elementoContador.innerHTML = "Licença expirada";
        }

        // Redireciona para a página "paginaForaDoAr.html"
        window.location.replace("paginaForaDoAr.html");
    }
}, 1000);
