// Author: 1652741, Dinghao Yang
// Date: 2019-04-17
// Description: This is the third homework for Web Programming course, focusing on js practice, and this file contains the script for the index page.

"user strict";
var input = "";
var word_frames = null;
var speed = 171;
var current_frame = 0;
var repeat = false;
var animation_play = null;

window.onload = function(){
    "user strict";
    var start_button = document.getElementById("start-button");
    var stop_button = document.getElementById("stop-button");
    var size_group = document.getElementsByName("size");

    start_button.onclick = readerStart;
    stop_button.onclick = readerStop;
    document.getElementById("speed-select").onchange = speedChange;
    for(i = 0; i < size_group.length; i+=1){
        size_group[i].onchange = sizeChange;
    }
};

function readerStart(){
    "user strict";
    document.getElementById("stop-button").disabled = false;
    document.getElementById("start-button").disabled = true;
    input = document.getElementById("input-box");

    word_frames = input.value.split(/['\u0020'\t\n]+/);
    animation_play = setInterval(readingAnimation,speed);
}

function readerStop(){
    "user strict";
    document.getElementById("stop-button").disabled = true;
    document.getElementById("start-button").disabled = false;
    document.getElementById("input-box").disabled = false;

    clearInterval(animation_play);
    animation_play = null;
    document.getElementById("reader-box").innerHTML = "";
}

function speedChange(){
    "user strict";
    speed = document.getElementById("speed-select").value;
    //Change the speed without stop
    if(document.getElementById("start-button").disabled) {
        clearInterval(animation_play);
        animation_play = setInterval(readingAnimation,speed);
    }
}

function sizeChange(){
    "user strict";
    var reader_box = document.getElementById("reader-box");
    var size_group = document.getElementsByName("size");
    // Change font size of all the text input if a size radio button is checked
    for(var i = 0; i < size_group.length; i++) {
        if(size_group[i].checked) {
            reader_box.style.fontSize = size_group[i].value +"pt";
        }
    }
}

function readingAnimation(){
    if(current_frame == word_frames.length){
        readerStop();
        current_frame = 0;
    }
    else{
        var characters = word_frames[current_frame].split("");
        if(characters.length == 0){
            current_frame++;
            return;
        }
        var last_character = characters[characters.length - 1];
        var is_letter = last_character.match(/[a-zA-Z]/i);
        document.getElementById("input-box").disabled = true;

        if (is_letter == null && !repeat) {
            var new_word = word_frames[current_frame].replace(word_frames[current_frame].charAt(word_frames[current_frame].length - 1), "");
            word_frames.splice(current_frame+1,0,new_word);
            document.getElementById("reader-box").innerHTML = new_word;
            repeat = true;
        } else {
            document.getElementById("reader-box").innerHTML = word_frames[current_frame];
        }

        if(repeat){
            repeat = false;
        }

        current_frame++;
    }
}