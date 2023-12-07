const { Component } = require("react");
const { DefaultButton, Button } = require("./button");

class HorizontalButtons extends Component {
	setButtonLength = function (buttons) {
		buttons.length = 5;
		for (let i = 0; i < 5; i++) {
			buttons[i] = buttons[i] || DefaultButton();
		}
		return buttons;
	}

	state = {
		actionCallback: this.props.actionCallback || function () { },
		buttons: this.setButtonLength(this.props.buttons || [])
	}

	setButtons = function (newButtons) {
		console.log("HorizontallButtons.setButtons")
		this.setState({
			buttons: newButtons
		})

		for (let i = 0; i < 5; i++) {
			this.buttons[i]?.setButton(newButtons[i])
		}
	}

	render() {
		this.buttons = [];

		return (
			<div className="horizontalButtons">
				{this.state.buttons.map((button, index) => {
					return (<Button key={index} ref={btn => this.buttons.push(btn)} button={button} actionCallback={this.state.actionCallback} />)
				})}
			</div>
		)
	}
}

export { HorizontalButtons };