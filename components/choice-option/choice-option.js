import can from "can";
import initView from "./choice-option.stache!";
import "can/map/define/";

export default can.Component.extend({
	tag: 'bh-choice-option',
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
	}
});
