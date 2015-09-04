import can from "can";
import initView from "./color-option.stache!";

import "spectrum-colorpicker/spectrum"
import "spectrum-colorpicker/spectrum.css!";

export default can.Component.extend({
	tag: 'bh-color-option',
	template: initView,
	scope : {
		define : {
			optionValue : {
				get : function(){
					return this.attr('optionValues').attr(this.attr('optionName'));
				},
				set : function(val){
					this.attr('optionValues').attr(this.attr('optionName'), val);
				}
			}
		}
	},
	events : {
		inserted : function(){
			var self = this;
			setTimeout(function(){
				console.log('aaa')
				self.element.find('.colorpicker').spectrum({
					color: self.scope.attr('optionValue'),
					preferredFormat: 'hex'
				})
			});
		}
	}
});
