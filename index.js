var Players = null;

const init = function(){
    Players = new Array();

    let classic = document.querySelector("#classic");
    classic.addEventListener('click', () => {
        window.document.location = './single.html';
    });

    let team = document.querySelector("#team");
    team.addEventListener('click', () => {
        window.document.location = './team.html';
    });

    let resume = document.querySelector("#resume");
    resume.addEventListener('click', () => {
        if(localStorage.getItem('jogo_atual') == null){
            alert("Não temos nenhum jogo guardado.")
        }
        else{
            window.document.location = './jogo.html';
        }
    });

}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});