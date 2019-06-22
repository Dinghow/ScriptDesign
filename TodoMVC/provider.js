(function(){
    var model = window.model;
    var storage = window.localStorage;

    Object.assign(model,{
        init: function(callback){
            var data = storage.getItem(model.TOKEN);
            try{
                // Parse the data
                if (data) this.data = JSON.parse(data);
            }
            catch(e){
                // If error, reset the data token
                storage.setItem(model.TOKEN, '');
                //console.log('Token:'+model.TOKEN)
                console.error(e)
            }
            if (callback) callback();
        },
        flush: function(callback){
            try{
                storage.setItem(model.TOKEN, JSON.stringify(model.data));
            }
            catch(e){
                console.error(e);
            }
            if (callback) callback();
        }
    });
})();