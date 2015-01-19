Ext.define('Ext.SimpleEvent', {
    requires: [
        'Ext.Util'
    ],
    /**
     *  Event/constructor
     *
     *  Description:
     *      Constructor.
     */
	constructor : function(params){
		this.collection = [];
	},
    /**
     *  Event/add
     *
     *  Description:
     *      Add multiple callbacks to the event holder.
     *
     *  Arguments:
     *      *(object|function)
     *          .callback : function
     *          .once : boolean
     *          .context : object
     *          .args : array
     */
    add : function(){
        Array.prototype.push.apply(this.collection,arguments);
    },
    /**
     *  Event/addOnce
     *
     *  Description:
     *      Shortcut fn.
     *
     *  Arguments:
     *      *function
     */
    addOnce : function(){
        var self = this;

        Ext.Util.forEach(arguments,function(_,fn){
            self.add({
                once : true,
                callback : fn
            });
        });
    },
    /**
     *  Event/fire
     *
     *  Description:
     *      Call all callbacks which are in the event holder.
     *
     *  Arguments:
     *      object
     *      array
     */
    fire : function(context,args){
        var self = this,
            collection = [].concat(self.collection);
        
        Ext.Util.forEach(collection,function(index,object){
            var type = typeof object;
            
            if (type == 'function') {
                object.apply(context || self,args || arguments);
            } else if (type == 'object') {
                if (object.once === true) {
                    self.collection.splice(index,1);
                }

                object.callback.apply(object.context || context || self,object.args || args || arguments);
            }
        });
    },
    /**
     *  Event/indexOf
     *
     *  Description:
     *      Get the index of a function in the event holder.
     *
     *  Arguments:
     *      function
     *
     *  Returns:
     *      integer
     */
    indexOf : function(fn){
        var self = this;

        return Ext.Util.forEach(self.collection,function(index,object){
            var type = typeof object;

            if ((type == 'function' && object == fn) || (type == 'object' && object.callback == fn)) {
                this.result = index;
                this.skip = true;
            }
        }, -1);
    },
    /**
     *  Event/remove
     *
     *  Description:
     *      Remove callback from event holder.
     *
     *  Arguments:
     *      function
     */
    remove : function(fn){
        var self = this,
            index = self.indexOf(fn);

        if (index != -1) {
            self.collection.splice(index,1);
        }
    },
    /**
     *  Event/isEmpty
     *
     *  Description:
     *      Check if event holder is empty.
     *
     *  Returns:
     *      boolean
     */
    isEmpty : function(){
        return this.collection.length == 0;
    },
    /**
     *  Event/clear
     *
     *  Description:
     *      Clear all callback from the event holder.
     */
    clear : function(){
        this.collection = [];
    },
    /**
     *  Event/getFirst
     *
     *  Description:
     *      Get first callback in the event holder.
     *
     *  Returns:
     *      (function|object)
     */
    getFirst : function(){
        return this.collection[0];
    },
    /**
     *  Event/getLast
     *
     *  Description:
     *      Get last callback in the event holder.
     *
     *  Returns:
     *      (function|object)
     */
    getLast : function(){
        return this.collection[this.collection.length - 1];
    },
    /**
     *  Event/destroy
     *
     *  Description:
     *      Clear all variables of the Event.
     */
    destroy : function(){
        var self = this;

        //clear vars
        self.collection = null;
    }
});