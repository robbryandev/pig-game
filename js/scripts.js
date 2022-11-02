// Buisiness Logic
function PigGame() {
    this.page = "";
    this.players = 0;
}

// UI logic

HTMLDivElement.prototype.removeAll = function() {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
};

{/* <div class="row">
<div class="col-2"></div>
<div class="col-3">
    <h3 id="p1-score" class="ml-5">Player 1: 0</h3>
</div>
<div class="col-2"></div>
<div class="col-3">
    <h3 id="p2-score" class="ml-5">Player 2: 0</h3>
</div>
<div class="col-2"></div>
</div>
<hr class="mt-4">
<br>
<div class="row">
<div class="col-2"></div>
<div class="col-3">
    <img id="dice-1" class="dice" src="images/dice-six.svg">
</div>
<div class="col-2"></div>
<div class="col-3">
    <img id="dice-2" class="dice" src="images/dice-six.svg">
</div>
<div class="col-2"></div>
</div>
<br><br><br><br>
<div class="row">
<div class="col-3"></div>
<div class="col-6">
    <div class="w-75 m-auto text-center pr-4">
        <button class="btn btn-success w-25">Roll</button>
        <button class="btn btn-danger w-25">Hold</button>
    </div>
</div>
<div class="col-3"></div>
</div> */}

HTMLDivElement.prototype.createGamePage = function(gameVar, players) {
    this.removeAll();
    gameVar.page = "game";
    gameVar.players = players;

  
    
};

HTMLDivElement.prototype.createStartPage = function(gameVar) {
    const ref = this;
    this.removeAll();
    gameVar.page = "start";

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
        ref.createGamePage(gameVar, 1);
    })
    
    let multiButton = document.createElement("button");
    multiButton.setAttribute("type", "button");
    multiButton.setAttribute("id", "multi");
    multiButton.setAttribute("class", "btn btn-primary ml-2");
    multiButton.innerText = " Multiplayer";
    multiButton.addEventListener("click", function() {
        ref.createGamePage(gameVar, 2);
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
    let game = new PigGame();
    main.createStartPage(game);
});