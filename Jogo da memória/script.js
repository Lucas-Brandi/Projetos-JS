// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const attemptsDisplay = document.getElementById('attempts');
    const historyDisplay = document.getElementById('history');

    let cards = [];
    let flippedCards = [];
    let attempts = 0;
    let history = JSON.parse(localStorage.getItem('gameHistory')) || [];


    const images = [
        'https://via.placeholder.com/100x150?text=1',
        'https://via.placeholder.com/100x150?text=2',
        'https://via.placeholder.com/100x150?text=3',
    ];

    
    function initGame() {
        attempts = 0;
        attemptsDisplay.textContent = `Tentativas: ${attempts}`;
        flippedCards = [];
        gameBoard.innerHTML = '';

        
        const shuffledCards = shuffle([...images, ...images]);

        shuffledCards.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const img = document.createElement('img');
            img.src = image;
            card.appendChild(img);

            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                attempts++;
                attemptsDisplay.textContent = `Tentativas: ${attempts}`;

                setTimeout(checkMatch, 1000);
            }
        }
    }

    
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.image === card2.dataset.image) {
            flippedCards = [];

            
            if (document.querySelectorAll('.card:not(.flipped)').length === 0) {
                setTimeout(() => {
                    alert('PARABÉNS! Você encontrou todos os pares!');
                    updateHistory(attempts);
                }, 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }
    }

    
    function updateHistory(attempts) {
        history.push(attempts);
        localStorage.setItem('gameHistory', JSON.stringify(history));
        renderHistory();
    }

    
    function renderHistory() {
        historyDisplay.innerHTML = '';
        history.forEach((attempts, index) => {
            const li = document.createElement('li');
            li.textContent = `Rodada ${index + 1}: ${attempts} tentativas`;
            historyDisplay.appendChild(li);
        });
    }

    
    resetButton.addEventListener('click', () => {
        initGame();
    });

    
    initGame();
    renderHistory();
});
