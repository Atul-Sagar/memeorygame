

document.addEventListener('DOMContentLoaded', () => {
    const allCards = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🥥', '🍒', '🍍', '🥝', '🥭', '🍑'];
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    let flippedCards = [];
    let matchedCards = [];
    let canFlip = true;
    let shuffledCards;
  
    function initializeGame(cardCount) {
      const selectedCards = allCards.slice(0, cardCount);
      shuffledCards = shuffle(selectedCards.concat(selectedCards));
      gameBoard.innerHTML = '';
  
      // Adjust the grid based on the number of cards
      const columns = Math.ceil(Math.sqrt(shuffledCards.length));
      gameBoard.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
  
      shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.innerHTML = `
          <div class="card-inner">
            <div class="card-front">${card}</div>
            <div class="card-back"></div>
          </div>`;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
      });
  
      flippedCards = [];
      matchedCards = [];
      canFlip = true;
    }
  
    // Function to shuffle an array
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Function to flip a card
    function flipCard(cardElement) {
      if (!canFlip || cardElement.classList.contains('matched') || cardElement.classList.contains('flipped')) return;
  
      cardElement.classList.add('flipped');
      flippedCards.push(cardElement);
  
      if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(checkMatch, 1000);
      }
    }
  
    // Function to check if the flipped cards match
    function checkMatch() {
      const [card1, card2] = flippedCards;
      const index1 = parseInt(card1.dataset.index);
      const index2 = parseInt(card2.dataset.index);
  
      if (shuffledCards[index1] === shuffledCards[index2]) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        if (matchedCards.length === shuffledCards.length) {
          setTimeout(() => {
            alert('Congratulations! You have won the game!');
            restartGame();
          }, 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
        }, 500);
      }
  
      flippedCards = [];
      canFlip = true; // Resetting the flag here
    }
  
    // Function to restart the game
    function restartGame() {
      initializeGame(6); // Change the number to the desired number of pairs
    }
  
    restartButton.addEventListener('click', restartGame);
  
    // Initialize the game with the desired number of pairs
    initializeGame(6); // Change the number to the desired number of pairs
  });
  

  