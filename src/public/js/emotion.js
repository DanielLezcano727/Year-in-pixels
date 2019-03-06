var id = 0;

function enviar() {
    if (id == 0) {
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("hide").click();
        }
    };
    let url = window.location.href;
    let day = url.slice(url.length-2,url.length);
    xhttp.open('GET', `/save/${id}/${day}`);
    xhttp.send();
}

function elegir(event) {
    var color = $(event.target).css("color");
    let text = "";
    document.getElementsByClassName("ejemplo")[0].style.color = color;
    if (document.getElementsByClassName("ejemplo")[0].style.color == "rgb(33, 37, 41)") {
        text = "";
        id = 0;
    } else {
        text = $(event.target).parent().children()[1];
        id = text.classList[1];
        text = text.innerHTML;
    }
    document.getElementById("emocion-elegida-texto").innerHTML = text;
    document.getElementById("emocion-elegida-texto").style.color = color;
};

(function () {
    let cuadrados = document.getElementsByClassName('fa-square');
    let frase = document.getElementsByClassName('emocion-text');
    cuadrados[1].classList.add('primero');
    for (let i = 1; i < cuadrados.length; i++) {
        cuadrados[i].classList.add(`id${i}`);
        cuadrados[i].parentNode.addEventListener('click', elegir);
        frase[i - 1].classList.add(`id${i}`);
    }

})();