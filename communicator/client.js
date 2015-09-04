import can from "can";

export default can.Control({}, {
	init : function(el, opts){
		this.actions = opts.actions;
	},
	parseMessage : function(msg){
		var parsed = JSON.parse(msg);
		return {
			type: parsed[0],
			payload: parsed[1]
		}
	},
	send : function(msg, opts){
		if(opts){
			msg = JSON.stringify([msg, opts]);
		} else {
			msg = JSON.stringify([msg]);
		}
		if(window.parent && window !== window.parent){
			window.parent.postMessage(msg, '*');
		}
	},
	"{window} message" : function(window, event){
		var data = event.originalEvent.data;
		var msg = this.parseMessage(data);
		if(this.actions[msg.type]){
				this.actions[msg.type](msg.payload);
		} else {
			console.log("CLIENT", msg.type, msg.payload);
		}
	}
});
