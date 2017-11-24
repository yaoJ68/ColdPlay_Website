
function play()
{
    if (document.getElementById("cover-audio").getAttribute("src") === "img/player.png") {
        document.getElementById("cover-audio").src = "img/pause.png";
        document.getElementById("audio-play").play();
    }
    else if(document.getElementById("cover-audio").getAttribute("src") === "img/pause.png") {
        document.getElementById("cover-audio").src = "img/player.png";
        document.getElementById("audio-play").pause();
    }
    else {
        alert("Image Not Located for play()");
    }
    return false;
}

//instance for next()
var songlist = ["audio/Yellow.mp3","audio/SJLT.mp3"];
var curSongIndex = 0;

function next(){
    curSongIndex = 1 - curSongIndex;
    document.getElementById("current-audio").src = songlist[curSongIndex];
    document.getElementById("audio-play").load();
    document.getElementById("audio-play").play();
}
