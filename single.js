var Players = null;

function Display(){
    let field = document.querySelector(".lista");
    field.innerHTML = "";
    let id = -1;
    Players.forEach(x => {
        id += 1;
        let div = document.createElement("div");
        div.innerText = x;
        div.classList.add("input");

        let rem = document.createElement("button");
        rem.innerHTML=`
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#8AF3FF" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"><path d="m.5 10.5 10-10"/><path d="m10.5 10.5-10-10z"/></g></svg>
        `;

        rem.addEventListener('click', () => {
            Players.splice(id);
            Display();
        });

        div.appendChild(rem);
        field.appendChild(div);
    });
}

function Display_few(old_players){
    let field = document.querySelector(".lista_few");
    
    let game = document.createElement("div");
    
    let id = -1;
    old_players.forEach(x => {
        id += 1;
        let div = document.createElement("div");
        div.innerText = x;
        div.classList.add("input");

        game.appendChild(div);
    });

    game.classList.add("old_game");
    game.style.margin = "10vw";
    game.style.background = "rgba(24, 169, 153,0.045)";
    game.style.border = "1px solid rgba(138, 243, 255,0.9)";

    field.append(game);
}


const init = function(){
    Players = new Array();

    let btn = document.querySelector(".input button");
    let input = document.querySelector(".input input");

    input.addEventListener('keyup', (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
        
            btn.click();
        }
    });

    btn.addEventListener('click', () => {
        let name = input.value;
        if(Players.includes(name) == false) {
            Players.push(name);
            input.value = "";
        }
        Display();
    });

    let vai = document.querySelector("#vai");
    vai.addEventListener('click', () => {
        if(Players.length < 2) {
            alert("Coloca pelo menos 2 pessoas aí, por favor!");
        }
        else{
            let Scores = new Array();
            for(let i = 0; i < Players.length; i+=1) Scores.push(100);
            let novo_jogo = {Players, Scores};
            
            localStorage.setItem("jogo_atual", JSON.stringify(novo_jogo));
            localStorage.setItem("ultimo_gerado", JSON.stringify(Players));

            let games = JSON.parse(localStorage.getItem("few_single"));
            if(games == null)
                games = [];
            
            let games2 = games;
            games = [Players];
            for(let i = 0; i <= Math.min(4, games2.length); i += 1){
                games.push(games2[i]);
            }
            localStorage.setItem("few_single", JSON.stringify(games));
            localStorage.setItem("valor_de_inicio", 100);

            window.document.location = './jogo.html';
        }
    });

    let games = JSON.parse(localStorage.getItem("few_single"));
    if(games == null)
        games = [];
    games.forEach(x => {
        if(x != null){
            Display_few(x);

            let listados = document.getElementsByClassName("old_game");
            let id = listados.length - 1;

            listados[id].addEventListener('click', () => {

                let game_players = games[id];
                let game_scores = new Array();
                for(let i = 0; i < game_players.length; i+=1) game_scores.push(100);
                let novo_jogo = {Players: game_players, Scores: game_scores};
            
                localStorage.setItem("jogo_atual", JSON.stringify(novo_jogo));
                localStorage.setItem("ultimo_gerado", JSON.stringify(game_players));
                localStorage.setItem("valor_de_inicio", 100);
                window.document.location = './jogo.html';
            });
        }
    });

}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});
