import can from "can";

export default can.Control.extend({}, {
	init : function(el, opts){
		this.isConnected = false;
		this.msgQueue = [];
		this.iframe = opts.iframe[0];
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
		if(this.isConnected){
			this.iframe.contentWindow.postMessage(msg, '*');
		} else {
			this.msgQueue.push(msg);
		}
	},
	"{window} message": function(window, event){
		var data = event.originalEvent.data;
		var msg = this.parseMessage(data);
		if(msg.type === 'ping'){
			this.runMsgQueue();
		} else if(this.actions[msg.type]){
				this.actions[msg.type](msg.payload);
		} else {
			console.log("COMMUNICATOR", msg.type, msg.payload);
		}
	},
	runMsgQueue : function(){
		
		this.isConnected = true;
		
		while(this.msgQueue.length){
			this.send(this.msgQueue.shift());
		}
	}
});
