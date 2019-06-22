// Author: 1652741, Dinghao Yang
// Date: 2019-06-22
// Description: This is the final project for Web Programming course, focusing on js practice, and this file contains the script for the index page.

// Search helper
var $ = function(sel) {
    return document.querySelector(sel);
};
var $All = function(sel) {
    return document.querySelectorAll(sel);
};

var model = window.model;

// Set some const status string
const CL_COMPLETED = 'Completed';
const CL_SELECTED = 'selected';
const CL_ACTIVE = 'Active';

// Update the list
function update(){
    var filter = model.data.filter;
    var items = model.data.items;
    var list = $('#todo-list');
    var active = $('#todo-count');
    var item, i, tempItem;

    // Clear the list
    list.innerHTML = '';

    for(i = 0; i<items.length; ++i){
        item = items[i];
        if(item.state == filter || filter == 'All'){
            tempItem = createItem(item.msg);
            tempItem.id = 'item_' + i;
            tempItem.classList.add(item.state);
            //console.log(tempItem.id);
            list.insertBefore(tempItem, list.firstChild);
        }
    }
    //console.log('items.length:'+items.length);
    console.log('list.children.length:'+list.children.length);
    // console.log('list:'+list);
    // console.log('active:'+active);
    active.innerHTML = list.children.length + ' items left';
}

function addNewItem(){
    var content = $('#input-content');
    var message = content.value;
    if(message == ''){
        console.warn('message is empty');
        return;
    }
    var newItem = {msg: message, state:CL_ACTIVE};
    console.log('message:'+message);
    model.data.items.push(newItem);
    model.flush();
    update();
    content.value = '';
}

// function editItem(id){
//     var item = model.data.items[id];
//     console.log('item:'+item);
//     var itemContent = item.firstChild;
//     console.log('itemContent:'+itemContent);
//     var editBox = document.createElement('input');
//     var finished = false;
//     editBox.setAttribute('class','item-content');
//     editBox.setAttribute('type', 'text');
//     editBox.setAttribute('value', itemContent.innerHTML);

//     function finish() {
//         if (finished) return;
//         finished = true;
//         item.removeChild(editBox);
//     }

//     editBox.addEventListener('blur', function() {
//         finish();
//       });
  
//     editBox.addEventListener('keyup', function(ev) {
//         if (ev.keyCode == 27) { // Esc
//             finish();
//         } else if (ev.keyCode == 13) {
//             itemContent.innerHTML = this.value;
//             var id = item.id.split('_')[1];
//             console.log('id:'+id);
//             model.data.items[id].msg = this.value;
//             model.flush();
//             update();
//             finish();
//         }
//     });
  
//     item.appendChild(editBox);
//     editBox.focus();
// }

function createItem(message){
    var item = document.createElement('div');
    item.classList.add('list-item');

    var itemCheck = document.createElement('div');
    itemCheck.classList.add('item-toggle');

    var itemContent = document.createElement('div');
    itemContent.classList.add('item-content');
    itemContent.innerHTML = message;

    var itemRemove = document.createElement('div');
    itemRemove.classList.add('item-remove');
    itemRemove.innerHTML = '-';

    item.appendChild(itemCheck);
    item.appendChild(itemContent);
    item.appendChild(itemRemove);

    // Change the states of item
    itemCheck.addEventListener('click', function(){
        var id = item.id.split('_')[1];

        if(item.classList.contains(CL_COMPLETED)){
            item.classList.remove(CL_COMPLETED);
            model.data.items[id].state = CL_ACTIVE;
        }
        else{
            item.classList.remove(CL_ACTIVE);
            model.data.items[id].state = CL_COMPLETED;
        }
        model.flush();
        update();
    })

    itemContent.addEventListener('dblclick', function(){
        //console.log('item.msg:'+item.msg);
        var editBox = document.createElement('input');
        var finished = false;
        editBox.setAttribute('class','item-content');
        editBox.setAttribute('type', 'text');
        editBox.setAttribute('value', itemContent.innerHTML);

        function finish() {
            if (finished) return;
            finished = true;
            item.removeChild(editBox);
        }

        editBox.addEventListener('blur', function() {
            finish();
          });
      
        editBox.addEventListener('keyup', function(ev) {
            if (ev.keyCode == 27) { // Esc
                finish();
            } else if (ev.keyCode == 13) {
                itemContent.innerHTML = this.value;
                var id = item.id.split('_')[1];
                console.log('id:'+id);
                model.data.items[id].msg = this.value;
                model.flush();
                update();
                finish();
            }
        });
      
        item.appendChild(editBox);
        editBox.focus();
    })

    itemRemove.addEventListener('click', function(){
        var id = item.id.split('_')[1];
        model.data.items.splice(id, 1);
        model.flush();
        update();
    })

    // Add hammer.js function
    var hammertime = new Hammer(itemContent);

    var press = new Hammer.Press({
        time: 600
    });

    // Press to edit item
    hammertime.add(press);
    hammertime.on('press',function(){
        var editBox = document.createElement('input');
        var finished = false;
        editBox.setAttribute('class','item-content');
        editBox.setAttribute('type', 'text');
        editBox.setAttribute('value', itemContent.innerHTML);

        function finish() {
            if (finished) return;
            finished = true;
            item.removeChild(editBox);
        }

        editBox.addEventListener('blur', function() {
            finish();
          });
      
        editBox.addEventListener('keyup', function(ev) {
            if (ev.keyCode == 27) { // Esc
                finish();
            } else if (ev.keyCode == 13) {
                itemContent.innerHTML = this.value;
                var id = item.id.split('_')[1];
                console.log('id:'+id);
                model.data.items[id].msg = this.value;
                model.flush();
                update();
                finish();
            }
        });
      
        item.appendChild(editBox);
        editBox.focus();
    })

    // Swipe to change item state
    hammertime.on('swiperight',function(ev){
        var id = item.id.split('_')[1];
        if(ev.deltaX > 0){
            console.log('item id: '+id);
            if(item.classList.contains(CL_COMPLETED)){
                item.classList.remove(CL_COMPLETED);
                model.data.items[id].state = CL_ACTIVE;
            }
            else{
                item.classList.remove(CL_ACTIVE);
                model.data.items[id].state = CL_COMPLETED;
            }
            model.flush();
            update();
        }
    })

    return item;
}

function clearCompletedItems(){
    var items = model.data.items;
    for(var i=items.length-1; i>=0;--i){
        var temp = items[i];
        console.log(i);
        if(temp.state == CL_COMPLETED){
            console.log('Delete item '+i);
            items.splice(i,1)
        }
    }
    model.flush();
    update();
}

function selectAllItems(){
    var items = model.data.items;
    var toggleAll = $('.select-all');
    var newState;

    //console.log('select all');
    if(toggleAll.classList.contains(CL_SELECTED)){
        toggleAll.classList.remove(CL_SELECTED)
        newState = CL_ACTIVE;
    }
    else{
        //console.log('unselected');
        toggleAll.classList.add(CL_SELECTED);
        newState = CL_COMPLETED;
    }
    for (var i = 0; i < items.length; ++i){
        items[i].state = newState;
    }
    model.flush();
    update();
}

window.onload = function(){
    // Initial stored data
    model.init(update);

    // Add listener to the DOM elements
    $('#input-content').addEventListener('keyup',function(ev){
        if(ev.keyCode != 13) return;
        addNewItem();
    },)

    $('#input-add').addEventListener('click', addNewItem);
    $('.clear-completed').addEventListener('click', clearCompletedItems);
    $('.select-all').addEventListener('click', selectAllItems);

    var filters = $All('.filters li a');
    // Reset the selected condition based on different filter
    for(var i = 0; i < filters.length; ++i){
        (function(filter) {
            filter.addEventListener('click', function() {
                for (var j = 0; j < filters.length; ++j) {
                    filters[j].classList.remove(CL_SELECTED);
                }
                console.log('filter:'+filter.innerHTML);
                filter.classList.add(CL_SELECTED);
                model.data.filter = filter.innerHTML;
                model.flush();
                update();
            });
        })(filters[i])
    }
}