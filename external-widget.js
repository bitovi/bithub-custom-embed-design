import can from "can";
import $ from "jquery";
import initView from "./external-widget.stache!";
import CommunicatorClient from "communicator/client";

import "can/map/delegate/";
import "bootstrap/dist/css/bootstrap.css!";
import "style/embed.less!";

function createClass(name,rules){
	var oldStyle = document.getElementById('custom-style');
	var style = document.createElement('style');

	$(oldStyle).remove();

	style.type = 'text/css';
	style.id = 'custom-style';
	document.getElementsByTagName('head')[0].appendChild(style);
	if(!(style.sheet||{}).insertRule){
		(style.styleSheet || style.sheet).addRule(name, rules);
	} else {
		style.sheet.insertRule(name+"{"+rules+"}",0);
	}
}

var createCSSClassFromAppState = function(state){
	var parts = [
		"background: " +  state.attr('optionValues.cardBackground'),
		"border-radius: " + state.attr('optionValues.cardBorderRadius') + "px"];
	createClass('.card', parts.join(';'));
}
var urlOptions = {};
var defaultOptions = {
	theme: 'light',
	fontStyle: 'serif',
	onlyImages: false,
	headerColor: '#f30',
	cardBackground: '#98BADD',
	cardBorderRadius: 0
}

if(window.location.search){
	urlOptions = can.deparam(window.location.search.substr(1));
}


var AppState = can.Map.extend();
var appState = new AppState({
	optionValues: $.extend(defaultOptions, urlOptions)
});




appState.on('change', function(){
	createCSSClassFromAppState(appState);
});

var client = new CommunicatorClient(document.documentElement, {
	actions: {
		'option-values' : function(payload){
			console.log(payload)
			appState.attr('optionValues', payload);
		}
	}});

client.send('ping');

var options = {
	theme : {
		type: 'choice',
		name: 'Theme',
		value: appState.attr('optionValues.theme'),
		options: [{
			id: 'dark',
			name : 'Dark'
		}, {
			id: 'light',
			name: 'Light'
		}]
	},
	'fontStyle': {
		type : 'choice',
		name : 'Font Style',
		value : appState.attr('optionValues.fontStyle'),
		options : [{
			id: 'serif',
			name: 'Serif'
		}, {
			id: 'sans-serif',
			name: 'Sans-serif'
		}]
	}, 
	'onlyImages' : {
		type : 'boolean',
		name : 'Show Only Images',
		value: appState.attr('optionValues.onlyImages')
	}, 
	'headerColor' : {
		type : 'color',
		name: 'Header Color',
		value : appState.attr('optionValues.headerColor')
	},
	'cardBackground' : {
		type : 'color',
		name: 'Card Background',
		value : appState.attr('optionValues.cardBackground')
	},
	'cardBorderRadius': {
		type : 'choice',
		name : 'Card Border Radius',
		value : appState.attr('optionValues.cardBorderRadius'),
		options : [{
			id: 0,
			name: '0px'
		}, {
			id: 10,
			name: '10px'
		}, {
			id: 20,
			name: '20px'
		}]
	}, 
}

client.send('register-options', options);

$('#app').html(initView({state: appState}));
