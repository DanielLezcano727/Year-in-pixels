function preload(){
    img = loadImage("img/logo2.png");
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "allemotions", false);
    xhttp.send();
    colores = xhttp.responseText;
    
    spaceBetweenDays = 250;
    start = true;
    heightBar = 100;
    widthTimeLine = 7;
    currentDate = new Date();
    totalDays = day() + meses.slice(0,currentDate.getMonth()).reduce((x,y) => x+y) - 1;

}

function setup() {
    createCanvas(windowWidth,windowHeight-4);
    
    //Set Variables for timeline
    
    widthTimeLine = 7;
    timelinePos = windowWidth /2;
    
    //Draw the view
    
    touchMoved();
}

function touchMoved(){

    clear();

    //Put the image on the screen

    image(img,10,10);
    
    fill(29);   

    //Timeline

    amount = start ? -spaceBetweenDays*totalDays : mouseX - posicionX; //Amount of space moved with the mouse
    
    //Dia y mes
    
    textSize(50);
    
    let dia = 1;
    let mes = 1;
    let espacio, num, col, textoAColocar;
    let cantDias = 0;
    for(let x = timelinePos+amount;x<windowWidth;x+=spaceBetweenDays){     

        if(cantDias < colores.length){
            num = colores.slice(cantDias,cantDias+2);
            col = sentimientos[+num];
            console.log(num);
            fill(col);
            cantDias+=2;
            textSize(20);
            textoAColocar = emocion(num);
            if(textoAColocar !== ""){
                text(emocion(num), x-(textoAColocar.length/2)*7.3,windowHeight/2-widthTimeLine*20+5);
            }
            textSize(50);
        }else{
            fill(33,37,41);
        }

        if(mes < 10 && dia < 10){
            espacio = 30;
        }else if(mes < 10 || dia < 10){
            espacio = 50;
        }else{
            espacio = 60;
        }

        text( String(dia) + "/" + String(mes),x-espacio,windowHeight/2+widthTimeLine*15);
        dia += 1;
        if(dia>meses[mes-1]){
            dia = 1;
            mes = mes == 12 ? 1 : mes + 1;
        }
        
        //Timeline
        rect(x+5,
            windowHeight/2-widthTimeLine,
            windowWidth-timelinePos-amount,
            widthTimeLine);    
        
        //Cuadrado
        rect(x-20,windowHeight/2-(widthTimeLine*11),50,8);
        rect(x-20,windowHeight/2-(widthTimeLine*17),50,8);
        rect(x-20,windowHeight/2-(widthTimeLine*17),8,50);
        rect(x+25,windowHeight/2-(widthTimeLine*17),8,50);

        //Barras Verticales
        rect(x,windowHeight/2-heightBar/2,8,heightBar);   
    }
    if(start){
        start = false;
        mouseReleased();
    }
}

function mousePressed(){
    posicionX = mouseX;
}

function mouseReleased(){
    timelinePos += amount;
    amount = 0;
}

function mouseClicked(){
    let position = timelinePos + spaceBetweenDays*totalDays;
    if(mouseX % spaceBetweenDays >= (position-20) % spaceBetweenDays && mouseX % spaceBetweenDays < (position+25) % spaceBetweenDays && mouseY > windowHeight/2-(widthTimeLine*17) && mouseY < windowHeight/2-(widthTimeLine*11)){
        let day = parseInt(-timelinePos / 250 + 2) + parseInt(mouseX / 250);
        simulateClick(day);
    }
}

function emocion(num){
    switch (num) {
        case "01":
        return "feliz - alegre";
        case "02":
        return "triste - decepcionado/a";
        case "03":
        return "enojado/a - furioso/a";
        case "04":
        return "productivo/a";
        case "05":
        return "estresado/a - nervioso/a";
        case "06":
        return "cansado/a - exhausto";
        case "07":
        return "enfermo/a";
        case "08":
        return "perezoso/a";
        case "09":
        return "excitado/a - emocionado/a";
        case "10":
        return "preocupado/a - tenso/a";
        case "11":
        return "normal - neutro/a";
        case "12":
        return "aburrido/a";
        case "13":
        return "relajado/a - tranquilo/a";
    }
    return "";
}

var posicionX = 0, amount = 0, colores = "";
var start, heightBar, widthTimeLine, timelinePos, spaceBetweenDays, currentDate, totalDays;
var sentimientos = [
    "#212529",
    "#F34236",
    "#E81D62",
    "#00BBD3",
    "#6639B6",
    "#3E50B4",
    "#2095F2",
    "#4BAE4F",
    "#CCDB38",
    "#785447",
    "#5F7C8A",
    "#FEC007",
    "#8AC249",
    "#00BBD3",
    ];
var meses = [31,28,31,30,31,30,31,31,30,31,30,31];

function simulateClick(day){
    let hide = document.getElementsByClassName('hide')[0];
    console.log(day);
    hide.setAttribute('href',`/emotion/${day}`);
    hide.click();
}