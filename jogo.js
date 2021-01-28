var Players = null;
var Scores = null;
var View = null;
var total = null;

function Display(){
    let field = document.querySelector(".lista");
    field.innerHTML = "";
    let id = -1;
    Players.forEach(x => {
        id += 1;
        let div = document.createElement("div");
        div.classList.add("input");
        div.style.background = `rgba(24, 169, 153, ${(Scores[id]/total)*0.2})`;

        let span1 = document.createElement("div");
        let span2 = document.createElement("div");

        span1.innerText = x;
        span2.innerText = Scores[id];

        span1.style.width = "24vw";
        span2.style.width = "24vw";
        span1.style.color = `rgba(138, 243, 255,${0.35 + (Scores[id]/total)*0.65})`
        span2.style.color = `rgba(138, 243, 255,${0.35 + (Scores[id]/total)*0.65})`
        span1.style.textAlign = "center";
        span2.style.textAlign = "center";

        div.appendChild(span1);
        div.appendChild(span2);
        field.appendChild(div);
    });
}

function Monta(){
    let field = document.querySelector(".lista");
    field.innerHTML = "";
    let id = -1;
    Players.forEach(x => {
        id += 1;
        let div = document.createElement("div");
        div.classList.add("input");

        let span1 = document.createElement("div");
        let input = document.createElement("input");
        input.classList.add("pago");

        span1.innerText = x;
        input.innerText = Scores[id];

        span1.style.width = "24vw";
        input.style.width = "24vw";
        span1.style.textAlign = "center";
        input.style.textAlign = "center";

        div.appendChild(span1);
        div.appendChild(input);
        field.appendChild(div);
    });
}

const init = function(){
    let jogo_atual = JSON.parse(localStorage.getItem("jogo_atual"));
    Players = jogo_atual.Players;
    Scores = jogo_atual.Scores;
    View = 0;
    Display();

    total = localStorage.getItem("valor_de_inicio");

    let lanca = document.querySelector("#lanca");
    lanca.addEventListener('click', () => {
        View = !View;
        let header = document.getElementsByClassName("header")[0];
        let field = document.querySelector(".lista");
        
        if(View){
            header.innerText = "Pagou Quanto?";
            Monta();
        }
        else{
            header.innerText = "Pontuação";

            for(let i = 0; i < Players.length; i++){
                let val = field.getElementsByClassName("pago")[i].value;
                if(isNaN(parseInt(val)) == false)
                    Scores[i] -= parseInt(val);
            }

            for(let i = 0; i < Players.length; i++){
                if(Scores[i] <= 0){ 
                    Scores.splice(i,1);
                    Players.splice(i,1);
                    i-=1;
                }
            }

            for(let i = 0; i < Players.length; i++){
                for(let j = i; j < Players.length; j++){
                    if(Scores[i] < Scores[j]){
                        [Scores[i],Scores[j]] = [Scores[j],Scores[i]];
                        [Players[i],Players[j]] = [Players[j],Players[i]];
                    }
                }
            }

            let att_jogo = {Players, Scores};
            localStorage.setItem("jogo_atual", JSON.stringify(att_jogo));

            if(Scores.length == 1){
                field.innerHTML = "";
                let para = document.createElement("h1");
                para.classList.add("header");
                para.style.textAlign = "center";
                para.innerText = `Parabéns ${Players[0]}!`;
                field.appendChild(para);

                lanca.innerText="Vamo!";
                lanca.addEventListener('click', () => {
                    window.document.location = './index.html';
                });
                
            }
            else Display();
        }
    });

    let reinicia = document.querySelector("#reinicia");
    reinicia.addEventListener('click', () => {

        Players = JSON.parse(localStorage.getItem("ultimo_gerado"));
        Scores = new Array();
        for(let i = 0; i < Players.length; i += 1)
            Scores.push(total);
        
        let att_jogo = {Players, Scores};
        localStorage.setItem("jogo_atual", JSON.stringify(att_jogo));

        View = 0;
        Display();
    });

    let home = document.querySelector("#home");
    home.addEventListener('click', () => {
        window.document.location = './index.html';
    });

}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});