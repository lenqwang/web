/**
 * 继承
 *  extend({}, {});
 */

var extend = function(child, parent) {
    for(var i in parent) {
        if(parent.hasOwnProperty(i)) {
            child[i] = parent[i];
        }
    }
    
    function __() {
        this.constructor = child;
    }
    
    __.prototype = parent.prototype;
    
    child.prototype = new __();
};