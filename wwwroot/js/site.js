// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


class Game {
    startGame() {

    }
}

class AnswerHandler {

    correctAnswer(realAnswer) {
        console.log(realAnswer);

        return this.correctAnswerHelper(parseInt(realAnswer));
    }

    correctAnswerHelper(realAnswer) {
        //Grab users inputed answer
        var input = document.getElementsByTagName('input')[0];
        var userAnswer = parseInt(input.value);
        console.log("input value: " + input.value);
        console.log("real answer: " + realAnswer);

        //Compare the two answers
        if (userAnswer == realAnswer)
            return true;
        else
            return false;
    }
}

class GameHandler {
    showStartScreen() {
        var url = "/";
        window.location.href = url;
    }

    displayCorrectIndicator() {
        var correct = document.getElementById('correct');
        correct.style.opacity = 1;
    }

    displayIncorrectIndicator() {
        var incorrect = document.getElementById('incorrect');
        incorrect.style.opacity = 1;
    }

    hideCorrectIndicator() {
        var correct = document.getElementById('correct');
        correct.style.opacity = 0;
    }

    hideIncorrectIndicator() {
        var incorrect = document.getElementById('incorrect');
        incorrect.style.opacity = 0;
    }

    displayNextButton() {
        var nextBtn = document.getElementById('next');
        nextBtn.style.visibility = "visible";
    }

    hideNextButton() {
        var nextBtn = document.getElementById('next');
        nextBtn.style.visibility = "hidden";
    }

    addEventListeners() {
        // Loop through each food item and add an event listener to it
        let food_items = document.getElementsByClassName("food_item");
        var food_price;
        
        for (let i = 0; i < food_items.length; i++) {

            food_items[i].addEventListener("click", () => {

                let bank = (document.querySelector('#bank span')).innerText;
                //Grab the sibling element (the price)
                food_price = food_items[i].lastElementChild.textContent;
                if (parseInt(food_price) > parseInt(bank))
                    return;

                console.log("clicked");


                //increase hunger by that much
                //Hunger increases by percentage of how much there already is
                var currentHungerPercentage = parseInt(hungerBar.style.width);
                var newPercentage = currentHungerPercentage + (parseInt(food_price) * 0.1 * currentHungerPercentage)
                hungerBar.setAttribute("style", "width: " + newPercentage + "%");

                //decrease bank account
                let bankHandler = new BankHandler();
                bankHandler.withdraw(food_price);

                var foodHandler = new FoodHandler();
                foodHandler.grayOutFoods();
            });

            /*
            food_items[i].addEventListener("mouseover", () => {
                console.log("Hover")
                if (food_items[i].style.background == "transparent")
                    food_items[i].style.background = "#ADD8E6";
            })

            
            food_items[i].addEventListener("mouseout", () => {
                console.log("Hover")
                if (food_items[i].style.background == "#ADD8E6")
                    food_items[i].style.background = "transparent";
            })
            */
        }
    }

    //takes true or false (indicating whether to start or stop the timer)
    startTimer() {
        setInterval(function () {
            //timerBar.setAttribute("style", `width: ${timerWidth}%;`);
            //timerWidth++;
            var currentWidth = parseInt(timerBar.style.width);
            var newWidth = currentWidth + 1;
            timerBar.style.width = `${newWidth}%`;
            if (newWidth == 100) {
                //Game Over, You Lose
                console.log("Game over");
                var gameHandler = new GameHandler();
                gameHandler.showStartScreen();
            }
        }, 1500);
        
    }

    resetTimer() {
        timerBar.style.width = "0%";
    }
}

class FoodHandler {

    startHunger() {
        //Start hunger
        let hungerWidth = 100;
        setInterval(function () {
            //Hunger goes down 5% every 3 seconds
            
            var currentWidth = parseInt(hungerBar.style.width);
            var newWidth = currentWidth - (currentWidth * 0.05);
            hungerBar.setAttribute("style", `width: ${newWidth}%`);
        }, 3000)
    }

    grayOutFoods() {
        //Gray-out foods
        let food_items = document.getElementsByClassName("food_item");
        let bank = (document.querySelector('#bank span')).innerText;
        let food_price;
        for (let i = 0; i < food_items.length; i++) {
            food_price = food_items[i].lastElementChild.textContent;
            //console.log(`food_price: ${food_price}, bank: ${bank}`);
            if (parseInt(food_price) > parseInt(bank)) {
                food_items[i].style.background = "#D3D3D3";
                food_items[i].style.opacity = 0.5;
                food_items[i].style.cursor = "default";
            }
            else {
                food_items[i].style.background = "transparent";
                food_items[i].style.opacity = 1;
                food_items[i].style.cursor = "pointer";
            }
        }
    }
    
}

class BankHandler {
    deposit(amnt) {
        var newBalance = parseInt(bankBalance.textContent) + amnt;
        if (newBalance <= 0)
            bankBalance.textContent = 0;
        else
            bankBalance.textContent = newBalance;
    }

    withdraw(amnt) {
        var newBalance = parseInt(bankBalance.textContent) - amnt;
        if (newBalance <= 0)
            bankBalance.textContent = 0;
        else
            bankBalance.textContent = newBalance;
    }
}




//Cache DOM


var progBars = document.getElementsByClassName('progress-bar');
var hungerBar = progBars[0];
var timerBar = progBars[1];
var bankBalance = document.querySelector('#bank span');

var gameHandler = new GameHandler();
gameHandler.addEventListeners();
gameHandler.startTimer();
var foodHandler = new FoodHandler();

foodHandler.startHunger();
foodHandler.grayOutFoods();



