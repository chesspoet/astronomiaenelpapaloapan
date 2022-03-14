
var reproOn = 0;
window.onload = function () {
    document.getElementById("audio").onclick = audioLoad;
}

function audioLoad(){
    if(reproOn == 0){
        var audio = document.getElementById("historia");
        document.getElementById("audio").src = "../../img/Reproduccion/BOCINA OFF AZUL.svg";
        audio.play();
        reproOn = 1;
    }else{
        var audio = document.getElementById("historia");
        document.getElementById("audio").src = "../../img/Reproduccion/BOCINA ON AZUL.svg";
        reproOn = 0;
        audio.pause();
    }
    
}