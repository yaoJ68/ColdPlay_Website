
function play()
{
    if (document.getElementById("cover-audio").getAttribute("src") == "img/player.png") {
        document.getElementById("cover-audio").src = "img/pause.png";
        document.getElementById("audio-play").play();
    }
    else if(document.getElementById("cover-audio").getAttribute("src") == "img/pause.png") {
        document.getElementById("cover-audio").src = "img/player.png";
        document.getElementById("audio-play").pause();
    }
    else {
        alert("Image Not Located for play()");
    }
    return false;
}
