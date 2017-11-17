
function play()
{
    if (document.getElementById("cover-audio").getAttribute("src") == "img/play_button.png") {
        document.getElementById("cover-audio").src = "img/pause_button.png";
        document.getElementById("audio-play").play();
    }
    else if(document.getElementById("cover-audio").getAttribute("src") == "img/pause_button.png") {
        document.getElementById("cover-audio").src = "img/play_button.png";
        document.getElementById("audio-play").pause();
    }
    else {
        alert("Image Not Located for play()");
    }
    return false;
}
