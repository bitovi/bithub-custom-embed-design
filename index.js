import can from "can";
import initView from "./index.stache!";
import $ from "jquery";
import Communicator from "communicator/";
import "components/options/";

import "can/map/delegate/";
import "style/style.less!";
import  "bootstrap/dist/css/bootstrap.css!";

var AppState = can.Map.extend({
	embedUrl : function(){
		var params = can.param(this.attr('optionValues').attr());
		return "http://localhost:8888/bithub-custom-widget/external-widget.html?" + params;
	}
});

var appState = new AppState({
	optionValues: {}
});

var preventSendingOptionValues = false;

appState.delegate('optionValues.*', 'change', function(){
	if(!preventSendingOptionValues){
		communicator.send('option-values', appState.attr('optionValues').attr());
	}
})

$('#app').html(initView({state: appState}));

var communicator = new Communicator(document.documentElement, {
	iframe: $('iframe'),
	actions:  {
		"register-options" : function(payload){
			var optValues = {};
			preventSendingOptionValues = true;
			appState.attr('options', payload);
			for(var k in payload){
				if(payload.hasOwnProperty(k)){
					appState.optionValues.attr(k, payload[k].value);
				}
			}
			preventSendingOptionValues = false;
		}
	}
});
communicator.send('pong');
