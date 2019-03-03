variable = "";
function elegir(){
    $(".col-md-8").click(function(event) {
        var color = $(event.target).css("color");
        
        document.getElementsByClassName("ejemplo")[0].style.color = color;
        if(document.getElementsByClassName("ejemplo")[0].style.color == "rgb(33, 37, 41)"){
            variable = "";
        }else{
            variable = $(event.target).parent().children()[1].innerHTML;
        }
        document.getElementById("emocion-elegida-texto").innerHTML = variable;
        document.getElementById("emocion-elegida-texto").style.color = color;
    });
}

function enviar(){
    if(variable == ""){
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace(this.responseText);
        }
    };
    xhttp.open("GET", "php/guardarSentimiento.php?nombre="+variable, true);
    xhttp.send();

}

(function () {
    let cuadrados = document.getElementsByClassName('fa-square');
    let frase = document.getElementsByClassName('emocion-text');
    cuadrados[1].classList.add('primero');
    console.log(cuadrados.length);
    console.log(frase.length);
    for(let i=1;i<cuadrados.length;i++){
        cuadrados[i].classList.add(`id${i-1}`);
        frase[i-1].classList.add(`id${i-1}`);
    }
})();