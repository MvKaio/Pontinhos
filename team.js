var Players = null;

const init = function(){
    Players = new Array();

    let timeA = document.getElementById("timeA");
    let timeB = document.querySelector("#timeB");
    let pessoas = document.querySelector("#quantas");

    let vai = document.querySelector("#vai");
    vai.addEventListener('click', () => {
        if(timeA.value == timeB.value) {
            alert("Coloque nomes diferentes");
        }
        else{
            pessoas = parseInt(pessoas.value);
            
            let Scores = [pessoas*100, pessoas*100];
            Players = [timeA.value, timeB.value];
            
            let game = {Players, Scores};
            
            localStorage.setItem("jogo_atual", JSON.stringify(game));
            localStorage.setItem("ultimo_gerado", JSON.stringify(Players));
            localStorage.setItem("valor_de_inicio", pessoas*100);

            window.document.location = './jogo.html';
        }
    });

}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});
