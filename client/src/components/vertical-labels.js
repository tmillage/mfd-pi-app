const { Component } = require("react");
const { DefaultButton, ButtonLabel} = require("./button");

class VerticalLabels extends Component {
	setButtonLength = function(buttons) {
		buttons.length = 5;
		for(let i=0; i<5; i++) {
			buttons[i] = buttons[i] || DefaultButton();
		}
		return buttons;
	}

	state = {
		buttons: this.setButtonLength(this.props.buttons || []),
	}

	render() {
		return (
			<div className="verticalLabels">
				{this.state.buttons.map((button, index) => {
					return(<ButtonLabel key={index} button={button} size="large" />)
				})}
			</div>
		)
	}
}

export { VerticalLabels };