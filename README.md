# BlackJack-game

## Description

This is my first application built from scratch. The motivation behind building this was to challenge myself to build an app without the use of tutorials for outside help. I allowed myself to call on code from previous projects but for the most part all of the code is unique to this project. Google search, MDN docs, and W3Schools were my primary sources.

This app is a simple BlackJack game. The goal is to get to a score of 21 without going over. Your score is then compared with the "Dealer" (which is just a computer player) who is simply trying to beat your score without going over 21. Players "hit" (meaning "to draw cards") first and then the Dealer does the same. 

## What does it do?

1. Game begins: hit Player, hit Dealer, hit Player
   - Scores are then tallied up 
   - Each card has a numerical value attached to it
     - 2-10 = simply that number
     - Jack, Queen, King = 10
     - Ace can be 11 or 1, player's choice
   - At this point the Dealer has 1 card and the player has 2 cards
   - If player score is equal to 21, player will automatically win

2. Player is given the option to hit or stay
   - Cards are created dynamically through JavaScript
     - Before a card is created as an HTML element, the values must first be compared with a "memory bank" array
     - The card values (i.e. 8 of clubs) is stored in the memory bank array once the card itself is created
     - If a generated value is found in the memory bank, the app will simply not create the card and instead call the same function to produce a new value
     - This allows us to pull random cards from a (52 - # of cards drawn) card deck and also ensures no repeats (i.e we don't want two instances of 8 of clubs UNLESS we wanted to add a second deck of playing cards, which this app does not have a method of doing yet)
     - Cards are given a class through JS and styled in CSS
   - When player clicks "stay" the computer will automatically start generating cards for the Dealer until they either "bust" (go over 21) or produce a score better than the player
     - A modal element is present at z-index: -9 and then a class is added in JS that changes the index to 9, thus blocking the player from clicking any buttons/producing any inputs
     - The same modal technique is used to block double-clicks on the hit button

3. A result is reached when the Dealer goes over 21 or produces a better score
   - The modal element is used again here to give the user only one option which is to simply reset the game
   - A "shuffle" function in JS resets all the relevant values to ensure none of them are used in the following iteration of the game
     - We don't want the app to remember any cards so clearing the memory bank is one of the many values changed in the shuffle function
   - The player can then repeat the process, each time getting a fresh 52 card deck to play with

## What did I learn

Getting the app to produce a random value from a deck of playing cards was the first challenge. By putting the numerical values (2-10, J, Q, K, A) into one array variable and the suits (♦, ♥, ♣, ♠) into a seperate one, I was able to run `Math.floor(Math.random() * array.length)` to get a random index for each array. They are then joined in a template string and initialized within the `hitme()` function as the `input` variable. 

I learned how to effectively use the `.map()` array method to produce a memory bank in JS. This memory bank is then referenced with an `.includes()` method to see whether or not our `input` is present in the memory bank.

I gained some experience with manipulating the DOM through JS by using methods like `.insertAdjacentElement()` and also template strings to write out entire lines of HTML.

Counting the scores was the most bug-ridden part of the project. The aces can be very tricky. Many times I thought I had nailed each corner case scenario but ended up finding small holes in my logic throughout the design process. To solve this, however, it was actually quite simple. Aces have two values: 11 or 1. However, a player doesn't want a score above 21. So Aces really only have a value of 11 when the player's score is 10 or less. For most cases, this would be the end of the logic, but there is more to it. If you add the scores A A 10, without going over 21, you'd have to end up with a score of 12. My function was giving me 22. This is because the count function will first count all non-Ace values first, thus giving me a starting score of 10 before counting any Aces. The first Ace sees the score at 10 so it adds 11. The second Ace sees a score above 10, so it adds 1, giving a total of 22. To solve this I added an `aceArray` which keeps track of how many aces are present in the player's line of cards. If `aceArray.length` is 1 (meaning there is only 1 Ace) and the player has a score of 10, then 11 will be added to the score. If the array is longer than 1 (so there is more than 1 Ace) and player score is 10, then only 1 will be added for each Ace. Ace values are added using a `.forEach()` method called upon `aceArray`.

## License

Still working on an official license. For the time being, this project should not be modified, however, code can be copied for personal use.