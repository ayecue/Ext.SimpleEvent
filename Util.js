Ext.define('Ext.Util',{
	singleton: true,
    /**
     *	A special forEach loop which can handle every object type and also collect 
     * 	results and got a props like skip and result
     */
    forEach : function(obj,callback,pre){
		if (obj == null) {
			return pre;
		}

		var t, d = {result:pre,skip:false};

		if (typeof obj == 'function') {
			while ((t = obj.call(d)) && !d.skip) {                        
				callback.call(d,t);
			}
		} else if (t = obj.length) {
			for (var k = 0; k < t && !d.skip; callback.call(d,k,obj[k++]));                                
		} else {
			for (var k in obj) {
				typeof obj[k] != 'unknown' && callback.call(d,k, obj[k]);
		
				if (d.skip) {
					break;
				}
			}
		}
		
		return d.result;
	}
});