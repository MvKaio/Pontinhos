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
        // else{
        //     localStorage.setItem('from','home');
        //     localStorage.setItem('carts', carts);
        //     window.document.location = './cartelas.html';
        // }
    });

    let vai = document.querySelector("#vai");
    vai.addEventListener('click', () => {
        if(Players.length < 2) {
            alert("Coloca pelo menos 2 pessoas aí, por favor!");
        }
        else{
            localStorage.setItem('Players', JSON.stringify(Players));
            window.document.location = './jogo.html';
        }
    });

}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});