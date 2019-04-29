// Author: 1652741, Dinghao Yang
// Date: 2019-04-26
// Description: This is the forth homework for Web Programming course, focusing on js practice, and this file contains the script for the index page.

window.onload = function(){
    "user strict";
    var shuffle_button = document.getElementById("shufflebutton");

    shuffle_button.onclick = ShufflePuzzle;
    Initialize();
};

function Swap(clicked) {
    "user strict";
    var clicked_tile = clicked;
    var tiles = document.getElementById("puzzlearea").childNodes;
    var clicked_index = null;
    var empty_index = null;

    for (var i = 3; i < 19; i++) {
        if (tiles.item(i).id == "blanktile") {
            empty_index = i;
        }
        else if (tiles.item(i).id == clicked_tile.parentElement.id) {
            clicked_index = i;
        }
    }

    if (clicked_index == (empty_index - 1)) {
        tiles.item(empty_index).parentNode.insertBefore(tiles.item(empty_index), tiles.item(clicked_index));
    }
    else if (clicked_index == (empty_index + 1)) {
        tiles.item(clicked_index).parentNode.insertBefore(tiles.item(clicked_index), tiles.item(empty_index));
    }
    else if (clicked_index == (empty_index - 4)) {
        var storedClkIndex = clicked_index;
        var storedEmpIndex = empty_index;
        tiles.item(empty_index).parentNode.insertBefore(tiles.item(empty_index), tiles.item(clicked_index));
        tiles.item(clicked_index).parentNode.insertBefore(tiles.item(clicked_index+1), tiles.item(storedEmpIndex+1));
    }
    else if (clicked_index == (empty_index + 4)) {
        var storedClkIndex = clicked_index;
        var storedEmpIndex = empty_index;
        tiles.item(clicked_index).parentNode.insertBefore(tiles.item(clicked_index), tiles.item(empty_index));
        tiles.item(empty_index).parentNode.insertBefore(tiles.item(empty_index+1), tiles.item(storedClkIndex+1));
    }
}

function Initializer(e) {
    Swap(e.target);
}

function Initialize(){
    "user strict";
    var puzzle_area = document.getElementById("puzzlearea");
    puzzle_area.addEventListener('click', Initializer, false);

    for(var i = 0; i < 15; i++){
        var tile = document.createElement("div");
        tile.classList.add("puzzletile");
        tile.setAttribute("id","number"+i);
        var number = document.createTextNode(i+1);
        var text = document.createElement("p")
        text.classList.add("tilenumber");
        text.appendChild(number)
        tile.appendChild(text);
        puzzle_area.appendChild(tile);

        tile.onmouseover = MouseHover;
        tile.onmouseout = MouseOut;
    }

    var blank_tile = document.createElement("div");
    blank_tile.setAttribute("id","blanktile");
    puzzle_area.appendChild(blank_tile);

    var tile_array = document.querySelectorAll(".puzzletile");

    var index = 0;
    for(var j = 0;j<4;j++){
        for(var k = 0;k<4;k++){
            tile_array[index].style.backgroundPosition = k*-100 + "px"+ " " + j*-100 +"px";
            index += 1;
            if(index == 15){
                break;
            }
        }
    }
}

function ShufflePuzzle() {
    for (var i = 0; i < 1000; i++) {
      var varvalid_neighbors = GetValidNeighbors();
      var random_neighbor = Math.floor(Math.random() * (varvalid_neighbors.length));
      var selected_tile = varvalid_neighbors[random_neighbor];

      if(selected_tile.childNodes.length == 0){
          Swap(selected_tile);
      }
      else{
        Swap(selected_tile.childNodes[0]);
      }
    }
}

function isInArray(arr,value){
    var tiles = document.getElementById("puzzlearea").childNodes;
    tile = tiles.item(value);
    for(var i = 0; i < arr.length; i++){
        if(tile === arr[i]){
            return true;
        }
    }
    return false;
}

function MouseHover(){
    "user strict";
    var tiles = document.getElementById("puzzlearea").childNodes;
    var varvalid_neighbors = GetValidNeighbors();
    var this_index = null;

    for(var i = 3; i < 19; i++){
        if(tiles.item(i) == this ){
            this_index = i;
        }
    }
    if(isInArray(varvalid_neighbors, this_index)){
        this.style.border="5px solid red";
        this.style.cursor="pointer";
    }
}

function MouseOut(){
    this.style.border="5px solid black";
}

function GetValidNeighbors(){
    var tiles = document.getElementById("puzzlearea").childNodes;
    var empty_index = null;
    var varvalid_neighbors = new Array();

    for (var j = 3; j < 19; j++) {
        if (tiles.item(j).id == "blanktile") {
          empty_index = j;
        }
    }

    neighbors = [tiles.item(empty_index - 1), tiles.item(empty_index+1), tiles.item(empty_index - 4), tiles.item(empty_index + 4)];
    for(var i = 0; i < 4; i ++){
        var temp = neighbors[i];
        if(temp){
            if(neighbors[i].childNodes.length > 0){
                varvalid_neighbors.push(neighbors[i]);
            }
        }
    }

    return varvalid_neighbors;
}