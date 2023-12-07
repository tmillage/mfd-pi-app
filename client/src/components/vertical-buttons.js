const { Component } = require("react");
const { DefaultButton, DefaultRocker, Button, Rocker } = require("./button");

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

	setButtons = function (newTop, newButtons, newBottom) {
		console.log("VerticalButtons.setButtons")
		newButtons = this.setButtonLength(newButtons);
		this.setState({
			top: newTop,
			buttons: newButtons,
			bottom: newBottom
		})

		this.topRocker.setRocker(newTop || DefaultRocker());
		for (let i = 0; i < 5; i++) {
			this.buttons[i]?.setButton(newButtons[i])
		}
		this.bottomRocker.setRocker(newBottom || DefaultRocker());
	}

	render() {
		this.buttons = [];
		return (
			<div className="verticalButtons">
				<Rocker ref={topRocker => this.topRocker = topRocker} rocker={this.state.top} actionCallback={this.state.actionCallback} />
				{this.state.buttons.map((button, index) => {
					return (<Button key={index} ref={btn => this.buttons.push(btn)} button={button} actionCallback={this.state.actionCallback} />)
				})}
				<Rocker ref={bottomRocker => this.bottomRocker = bottomRocker} rocker={this.state.bottom} actionCallback={this.state.actionCallback} />
			</div>
		)
	}
}

export { VerticalButtons };