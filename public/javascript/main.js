const cards = document.querySelectorAll('.memory-card'); // Récupération de toutes les cartes

let hasFlippedCard = false;
let lockBoard = false; // Empêche les clics pendant le traitement
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return; // Bloque les clics si le plateau est verrouillé
    if (this === firstCard) return; // Empêche de cliquer deux fois sur la même carte

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Première carte retournée
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Deuxième carte retournée
        hasFlippedCard = false;
        secondCard = this;

        // Vérifie si les deux cartes correspondent
        checkForMatch();
    }
}

function checkForMatch() {
    // Vérifie si les cartes correspondent
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    // Désactive les cartes correspondantes
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Add the 'matched' class for the celebration animation
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    // Réinitialise les cartes après un délai
    lockBoard = true; // Verrouille le plateau temporairement
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    // Réinitialise les variables pour le prochain tour
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
// Mélange les cartes
(function shuffle() {
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach((card) => card.addEventListener('click', flipCard));

  