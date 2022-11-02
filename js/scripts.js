HTMLDivElement.prototype.removeAll = function() {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
};

HTMLDivElement.prototype.createStartPage = function(gameVar) {
    this.removeAll();
    let title = document.createElement("h1");
    title.setAttribute("class", "text-center");
    title.innerText = "Pig Game";

    gameVar.page = "start";

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
    
    let multiButton = document.createElement("button");
    multiButton.setAttribute("type", "button");
    multiButton.setAttribute("id", "multi");
    multiButton.setAttribute("class", "btn btn-primary ml-2");
    multiButton.innerText = " Multiplayer";

    descriptionLine.appendChild(pDescrition);
    divButtons.appendChild(singleButton);
    divButtons.appendChild(multiButton);
    
    const elements = [title, titleLine, descriptionLine, divButtons]
    for (const e in elements) {
        this.appendChild(elements[e]);
    }
};

function PigGame() {
    this.page = "";
}



addEventListener("load", function() {
    const main = document.querySelector(".container");
    let game = new PigGame();
    main.createStartPage(game);
});