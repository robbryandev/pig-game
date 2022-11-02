// Buisiness Logic
function PigGame() {
    this.page = "";
    this.playerCount = 0;
    this.players = [];
    this.turn = 1; 
}

let game = new PigGame();

function Player(bot) {
    this.bot = bot;
    this.tempScore = 0;
    this.totalScore = 0;
}

function singlePlayer() {
    game.players = [];
    const playerOne = new Player(false);
    const playerTwo = new Player(true);
    game.players.push(playerOne);
    game.players.push(playerTwo);
}

function multiPlayer() {
    game.players = [];
    const playerOne = new Player(false);
    const playerTwo = new Player(false);
    game.players.push(playerOne);
    game.players.push(playerTwo);
}

function endTurn() {
    game.players[game.turn - 1].totalScore += game.players[game.turn - 1].tempScore;
    game.players[game.turn - 1].tempScore = 0;
    setScore(game.players[game.turn - 1].totalScore); 
    setDice();
}

function rollButton() {
    const rand = Math.floor(Math.random() * 6) + 1;
    setDiceValue(game.turn, rand);
    if (rand !== 1) {
        game.players[game.turn - 1].tempScore += rand;
    } else {
        game.players[game.turn - 1].tempScore = 0;
        endTurn();
    }
}

function holdButton() {
    endTurn();
}

// UI logic

function setDice() {
    if (game.turn === 1) {
        game.turn = 2;
        document.getElementById("dice-1").classList.add("invisible");
        document.getElementById("dice-2").classList.remove("invisible");
    } else {
        game.turn = 1;
        document.getElementById("dice-2").classList.add("invisible");
        document.getElementById("dice-1").classList.remove("invisible");
    }
}

function setDiceValue(turn, num) {
    document.getElementById(`dice-${turn}`).setAttribute("src", `images/dice-${num}.svg`);
}

function setScore(score) {
    document.getElementById(`p${game.turn}-score`).innerText = `Player ${game.turn}: ${score}`
}

function setCurrent(score) {
    document.getElementById("current-score").innerText = `Current Roll Value: ${score}`;
}

HTMLDivElement.prototype.removeAll = function() {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
};


HTMLDivElement.prototype.createGamePage = function(playerCount) {
    this.removeAll();
    game.page = "game";
    game.playerCount = playerCount;
    if (playerCount === 1) {
        singlePlayer();
    } else {
        multiPlayer();
    }

    let div1 = document.createElement("div");
    div1.setAttribute("class", "row");

    let div2 = document.createElement("div");
    div2.setAttribute("class", "col-2")

    let div3 = document.createElement("div");
    div3.setAttribute("class", "col-3");

    let h3P1Score = document.createElement("h3");
    h3P1Score.setAttribute("id", "p1-score");
    h3P1Score.setAttribute("class", "ml-5");
    h3P1Score.innerText = "Player 1: ";

    let div4 = document.createElement("div");
    div4.setAttribute("class", "col-2");
    
    let div5 = document.createElement("div");
    div5.setAttribute("class", "col-3");

    let h3P2Score = document.createElement("h3");
    h3P2Score.setAttribute("id", "p2-score");
    h3P2Score.setAttribute("class", "ml-5");
    h3P2Score.innerText = "Player 2: ";

    let div6 = document.createElement("div");
    div6.setAttribute("class", "col-2");

    let hr = document.createElement("hr");
    hr.setAttribute("class", "mt-4");

    let br1 = document.createElement("br");

    let div7 = document.createElement("div");
    div7.setAttribute("class", "row");

    let div8 = document.createElement("div");
    div8.setAttribute("class", "col-2");

    let div9 = document.createElement("div");
    div9.setAttribute("class", "col-3");

    let img1 = document.createElement("img");
    img1.setAttribute("id", "dice-1");
    img1.setAttribute("class", "dice");
    img1.setAttribute("src", "images/dice-6.svg");

    let divA = document.createElement("div");
    divA.setAttribute("class", "col-2");

    let divB = document.createElement("div");
    divB.setAttribute("class", "col-3");

    let img2 = document.createElement("img");
    img2.setAttribute("id", "dice-2");
    img2.setAttribute("class", "dice invisible");
    img2.setAttribute("src", "images/dice-6.svg");

    let divC = document.createElement("div");
    divC.setAttribute("class", "col-2");

    let br2 = document.createElement("br");
    let br3 = document.createElement("br");
    let br4 = document.createElement("br");
    let br5 = document.createElement("br");

    let divD = document.createElement("div");
    divD.setAttribute("class", "row");

    let divE = document.createElement("div");
    divE.setAttribute("class", "col-3");

    let divF = document.createElement("div");
    divF.setAttribute("class", "col-6");
        
    let divButtons = document.createElement("div");
    divButtons.setAttribute("class", "w-75 m-auto text-center pr-4");

    let butt1 = document.createElement("button");
    butt1.setAttribute("class", "btn btn-success w-25");
    butt1.innerText = "Roll!";
    butt1.addEventListener("click", rollButton);

    let butt2 = document.createElement("button");
    butt2.setAttribute("class", "btn btn-danger w-25");
    butt2.innerText = "Hold!";
    butt2.addEventListener("click", holdButton);

    let divG = document.createElement("div");
    divG.setAttribute("class", "col-3");

    let currentDiv = document.createElement("div");
    currentDiv.setAttribute("class", "mt-4");
    
    let currentScoreElement = document.createElement("h4");
    currentScoreElement.setAttribute("id", "current-score");
    currentScoreElement.setAttribute("class", "text-center");
    currentScoreElement.innerText = "Current Roll Value: 0";

    currentDiv.appendChild(currentScoreElement);

    div3.appendChild(h3P1Score);
    div5.appendChild(h3P2Score);

    div9.appendChild(img1);
    divB.appendChild(img2);

    divButtons.appendChild(butt1);
    divButtons.appendChild(butt2);

    divF.appendChild(divButtons);

    const row1Elements = [div2, div3, div4, div5, div6];
    for (const e in row1Elements) {
        div1.appendChild(row1Elements[e]);
    };

    const row2Elements = [div8, div9, divA, divB, divC];
    for (const e in row2Elements) {
        div7.appendChild(row2Elements[e]);
    };

    const row3Elements = [divE, divF, divG];
    for (const e in row3Elements) {
        divD.appendChild(row3Elements[e]);
    }

    const elements = [div1, hr, br1, div7, br2, br3, br4, br5, divD, currentDiv];
    for (const e in elements) {
        this.appendChild(elements[e]);
    }
};

HTMLDivElement.prototype.createStartPage = function(game) {
    const ref = this;
    this.removeAll();
    game.page = "start";

    let title = document.createElement("h1");
    title.setAttribute("class", "text-center");
    title.innerText = "Pig Game";

    let titleLine = document.createElement("hr");
    titleLine.setAttribute("class", "w-50");

    let descriptionLine = document.createElement("div");
    descriptionLine.setAttribute("class", "diescription w-50 m-auto");

    let pDescrition = document.createElement("p");
    pDescrition.setAttribute("class", "text-center");
    pDescrition.innerText = "I'll get there";

    let divButtons = document.createElement("div");
    divButtons.setAttribute("class", "text-center mt-4");

    let singleButton = document.createElement("button");
    singleButton.setAttribute("type", "button");
    singleButton.setAttribute("id", "single");
    singleButton.setAttribute("class", "btn btn-info");
    singleButton.innerText = "Single Player";
    singleButton.addEventListener("click", function() {
        ref.createGamePage(game, 1);
    })
    
    let multiButton = document.createElement("button");
    multiButton.setAttribute("type", "button");
    multiButton.setAttribute("id", "multi");
    multiButton.setAttribute("class", "btn btn-primary ml-2");
    multiButton.innerText = " Multiplayer";
    multiButton.addEventListener("click", function() {
        ref.createGamePage(game, 2);
    })

    descriptionLine.appendChild(pDescrition);
    divButtons.appendChild(singleButton);
    divButtons.appendChild(multiButton);
    
    const elements = [title, titleLine, descriptionLine, divButtons]
    for (const e in elements) {
        this.appendChild(elements[e]);
    }
};

addEventListener("load", function() {
    const main = document.querySelector(".container");
    main.createStartPage(game);
});