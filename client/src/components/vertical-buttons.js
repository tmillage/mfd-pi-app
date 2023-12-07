const { Component } = require("react");
const { DefaultButton, Button, Rocker } = require("./button");

class VerticalButtons extends Component {
	setButtonLength = function (buttons) {
		buttons.length = 5;
		for (let i = 0; i < 5; i++) {
			buttons[i] = buttons[i] || DefaultButton();
		}
		return buttons;
	}

	state = {
		actionCallback: this.props.actionCallback || function () { },
		top: this.props.top,
		buttons: this.setButtonLength(this.props.buttons || []),
		bottom: this.props.bottom
	}

	setButtons = function (top, buttons, bottom) {
		this.setState({
			top: top,
			buttons: buttons,
			bottom: bottom
		})
	}

	render() {
		console.log("render vertical buttons")
		return (
			<div className="verticalButtons">
				<Rocker rocker={this.state.top} actionCallback={this.state.actionCallback} />
				{this.state.buttons.map((button, index) => {
					return (<Button key={index} button={button} actionCallback={this.state.actionCallback} />)
				})}
				<Rocker rocker={this.state.bottom} actionCallback={this.state.actionCallback} />
			</div>
		)
	}
}

export { VerticalButtons };