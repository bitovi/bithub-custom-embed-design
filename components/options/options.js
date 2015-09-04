import can from "can";
import initView from "./options.stache!";

import "components/boolean-option/";
import "components/choice-option/";
import "components/color-option/";
import "./options.less!";

export default can.Component.extend({
	tag: 'bh-options',
	template: initView,
	scope : {
		
	}
});
