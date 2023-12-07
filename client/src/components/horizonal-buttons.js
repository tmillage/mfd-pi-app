const { Component } = require("react");
const { DefaultButton, Button, Rocker} = require("./button");

class HorizontalButtons extends Component {
	setButtonLength = function(buttons) {
		buttons.length = 5;
		for(let i=0; i<5; i++) {
			buttons[i] = buttons[i] || DefaultButton();
		}
		return buttons;
	}

	state = {
		actionCallback: this.props.actionCallback || function() { },
		buttons: this.setButtonLength(this.props.buttons || [])
	}

	render() {
		console.log(this.state)
		return (
			<div className="horizontalButtons">
				{this.state.buttons.map((button, index) => {
					return(<Button key={index} button={button} actionCallback={this.state.actionCallback} />)
				})}
			</div>
		)
	}
}

export { HorizontalButtons };