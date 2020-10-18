var Players = null;
var Scores = null;
var View = null;

function Display(){
    let field = document.querySelector(".lista");
    field.innerHTML = "";
    let id = -1;
    Players.forEach(x => {
        id += 1;
        let div = document.createElement("div");
        div.classList.add("input");
        div.style.background = `rgba(24, 169, 153, ${(Scores[id]/100)*0.2})`;

        let span1 = document.createElement("div");
        let span2 = document.createElement("div");

        span1.innerText = x;
        span2.innerText = Scores[id];

        span1.style.width = "24vw";
        span2.style.width = "24vw";
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
    Players = JSON.parse(localStorage.getItem("Players"));
    Scores = new Array();
    for(let i = 0; i < Players.length; i+=1) Scores.push(100);
    View = 0;
    Display();

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


}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});