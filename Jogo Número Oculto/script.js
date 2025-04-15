const numeroPensado = 57;
let tentativasRestantes = 5;

const botao = document.querySelector(".style_button");
const botaoReiniciar = document.createElement("button");
const message = document.getElementById('message');

const imagemVitoria = document.createElement("img");
imagemVitoria.src = "https://media1.tenor.com/m/UTrLSr85tYEAAAAC/happy-cat-cat.gif";
imagemVitoria.classList.add("imagem-vitoria");
document.body.appendChild(imagemVitoria);

botaoReiniciar.textContent = "Reiniciar Jogo";
botaoReiniciar.classList.add("reiniciar-botao");
document.body.appendChild(botaoReiniciar);

botao.addEventListener("click", function () {
    const input = document.getElementById('userInput').value;
    const userGuess = parseInt(input);

    if (isNaN(userGuess) || userGuess < 0 || userGuess > 100) {
        message.textContent = "Por favor, insira um número válido entre 0 e 100.";
        return;
    }

    if (tentativasRestantes > 0) {
        if (userGuess === numeroPensado) {
            message.textContent = "Parabéns! Você adivinhou o número 57!";
            botao.disabled = true;
            botaoReiniciar.style.display = "inline-block";
            imagemVitoria.style.display = "block";
        } else if (userGuess < numeroPensado) {
            tentativasRestantes--;
            message.textContent = `O número é maior. Você tem ${tentativasRestantes} tentativas restantes.`;
        } else {
            tentativasRestantes--;
            message.textContent = `O número é menor. Você tem ${tentativasRestantes} tentativas restantes.`;
        }

        if (tentativasRestantes === 0) {
            message.textContent = "Você esgotou todas as suas tentativas! O jogo acabou.";
            botao.disabled = true;
            botaoReiniciar.style.display = "inline-block";
        }
    }
});

botaoReiniciar.addEventListener("click", function () {
    tentativasRestantes = 5;
    botao.disabled = false;
    message.textContent = "";
    botaoReiniciar.style.display = "none";
    imagemVitoria.style.display = "none";
    document.getElementById('userInput').value = "";
});

