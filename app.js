window.addEventListener("DOMContentLoaded", function () {

// | Variables |
const values = [2, 3, 4, 5, 6 , 7, 8 , 9 , 10, "J", "Q", "K", "A"];
const suits = ["♦", "♥", "♣", "♠"];

// Buttons
const dealBtn = document.querySelector(".deal");
const hitBtn = document.querySelector(".hit");
// USED FOR TESTING 
// const shuffleBtn = document.querySelector(".shuffle");
const stayBtn = document.querySelector(".stay");
const loseBtn = document.querySelector(".lose");
const winBtn = document.querySelector(".win");

// Selectors
const cards_div = document.querySelector(".cards");
const dealer_div = document.querySelector(".dealer");
const playerCount_div = document.querySelector(".player-count");
const dealerCount_div = document.querySelector(".dealer-count");
const loseOverlay_div = document.querySelector(".lose-overlay");
const winOverlay_div = document.querySelector(".win-overlay");
const noClickOverlay_div = document.querySelector(".no-click-overlay");

// Sounds
const drawSound = document.getElementById("clip1");
const shuffleSound = document.getElementById("clip2");
const flipSound = document.getElementById("clip3");
const staySound = document.getElementById("clip4");
staySound.loop = true;
const happySound = document.getElementById("clip5");
const sadSound = document.getElementById("clip6");

// Other

let checkValPlayer = [];
let checkValDealer = [];
let playerScore = 0;
let dealerScore = 0;
let checkArray = [];
let playerBust = false;
let dealerBust = false;

// | Event Listeners |


startUp();

dealBtn.addEventListener('click', function() {
    shuffle();
    startUp();
})

hitBtn.addEventListener('click', function() {
    noClickOverlay_div.classList.add("no-click-modal");
    setTimeout(() => {
        hitMe();
    }, 150);
    setTimeout(() => {
        noClickOverlay_div.classList.remove("no-click-modal");
    },300);
 })

// USED FOR TESTING 
// shuffleBtn.addEventListener('click', function() {
//     shuffle();  
// })

stayBtn.addEventListener('click', function() {
    noClickOverlay_div.classList.add("no-click-modal");
    staySound.play();
    stay();
})

loseBtn.addEventListener('click', function() {
    shuffleSound.play();
    shuffle();
    startUp();
    loseOverlay_div.classList.remove("lose-modal");
})

winBtn.addEventListener('click', function() {
    shuffleSound.play();
    shuffle();
    startUp();
    winOverlay_div.classList.remove("win-modal");
})

// | Functions |

function startUp() {
    hitMe();
    hitDealer();
    hitMe();
}

// Dealing cards

function hitMe() {
    checkArray = [];
    let cardVal = values[Math.floor(Math.random() * 13)];
    let cardSuit = suits[Math.floor(Math.random() * 4)];
    let input = `${cardVal} ${cardSuit}`
    console.log(input);
    
    const alreadyPulled = document.querySelectorAll(".card");
    let cardArray = Array.from(alreadyPulled);

    cardArray.map(function(item) {
        checkArray.push(item.innerHTML);
    }) 
    
    if (checkArray.length === 52) {
        shuffle();
    }
    if (!checkArray.includes(input)) {
        const newCard = document.createElement("div");
        const cardContent = `<p> ${input} </p> <p></p> <p></p> <p> ${input} </p>`;
        newCard.classList.add("card");
        newCard.innerHTML = cardContent;
        cards_div.insertAdjacentElement("beforeend", newCard);

        if (cardSuit === "♦" || cardSuit === "♥") {
            newCard.style.color = "red";
        }
        checkValPlayer.push(cardVal);
        console.log(checkValPlayer);
     
        playerCount(checkValPlayer);

    } else {
        hitMe();
    }
    drawSound.play();
}

function hitDealer() {
    checkArray = [];
    let cardVal = values[Math.floor(Math.random() * 13)];
    let cardSuit = suits[Math.floor(Math.random() * 4)];
    let input = `${cardVal} ${cardSuit}`
    console.log(input);
    
    const alreadyPulled = document.querySelectorAll(".card");
    let cardArray = Array.from(alreadyPulled);

    cardArray.map(function(item) {
        checkArray.push(item.innerHTML);
    }) 
    
    if (checkArray.length === 52) {
        shuffle();
    }
    if (!checkArray.includes(input)) {
        const newCard = document.createElement("div");
        const cardContent = `<p> ${input} </p> <p></p> <p></p> <p> ${input} </p>`;
        newCard.classList.add("card");
        newCard.innerHTML = cardContent;
        dealer_div.insertAdjacentElement("beforeend", newCard);

        if (cardSuit === "♦" || cardSuit === "♥") {
            newCard.style.color = "red";
        }

        checkValDealer.push(cardVal);

        dealerCount(checkValDealer);

    } else {
        hitDealer();
    }
    drawSound.play();
}

// Counting scores

function playerCount(checkValArray) {
    playerScore = 0;
  
    for (const value of checkValArray) {
        if (value > 1) {
            playerScore += value;
        } else if (value === "J" || value === "Q" || value === "K") {
            playerScore += 10;
        }
    }   
    const aceArray = checkValArray.filter(item => item === "A");
 
    aceArray.forEach(function() {
        if (playerScore < 10) {
            playerScore += 11;
        }
        else if (playerScore === 10 && aceArray.length === 1) {
            playerScore += 11;
        } else {
            playerScore++;
        }
    })
    
    playerCount_div.innerHTML = `Your score: ${playerScore}`;

    if (playerScore > 21) {
        playerBust = true;
        loseOverlay_div.classList.add("lose-modal");
        staySound.pause();
        sadSound.play();
    }

    if (playerScore === 21) {
        winOverlay_div.classList.add("win-modal");
        winBtn.innerHTML = "Blackjack! You win! Play again?";
        staySound.pause();
        happySound.play();
    }
}

function dealerCount(checkValArray) {
    dealerScore = 0;
  
    for (const value of checkValArray) {
        if (value > 1) {
            dealerScore += value;
        } else if (value === "J" || value === "Q" || value === "K") {
            dealerScore += 10;
        }
    }   
    const aceArray = checkValArray.filter(item => item === "A");
 
    aceArray.forEach(function() {
        if (dealerScore < 10) {
            dealerScore += 11;
        } else if(dealerScore === 10 && aceArray.length === 1) {
            dealerScore += 11;
        } else {
            dealerScore++;
        }
    })
    dealerCount_div.innerHTML = `Dealer score: ${dealerScore}`;

    if (dealerScore > 21) {
        dealerBust = true;
        winOverlay_div.classList.add("win-modal"); 
        winBtn.innerHTML = "Dealer busts! You win! Play again?"
        staySound.pause();
        happySound.play();
    }
}

function stay() {
    if (dealerScore <= playerScore && !dealerBust) {
        setTimeout(() => {
            flipSound.play();
            hitDealer();
            stay();
        }, 1500);
    } else if (dealerScore > playerScore && !dealerBust) {
        setTimeout(() => {
            loseOverlay_div.classList.add("lose-modal");
            staySound.pause();
            sadSound.play();
        }, 500)
    }
}

// Reset

function shuffle() {
    playerScore = 0;
    dealerScore = 0;
    checkArray = [];
    checkValPlayer = [];
    checkValDealer = [];
    playerBust = false;
    dealerBust = false;
    cards_div.innerHTML = "";
    dealer_div.innerHTML = "";
    playerCount_div.innerHTML = `Your score: ${playerScore}`;
    dealerCount_div.innerHTML = `Dealer score: ${dealerScore}`;
    noClickOverlay_div.classList.remove("no-click-modal");
}

})