const { Component } = require("react");
const { DefaultButton, ButtonLabel } = require("./button");

class HorizontalLabels extends Component {
	setButtonLength = function (buttons) {
		buttons.length = 5;
		for (let i = 0; i < 5; i++) {
			buttons[i] = buttons[i] || DefaultButton();
		}
		return buttons;
	}

	state = {
		left: this.props.left || DefaultButton(),
		buttons: this.setButtonLength(this.props.buttons || []),
		right: this.props.right || DefaultButton(),
	}

	render() {
		return (
			<div className="horizontalLabels">
				<ButtonLabel button={this.state.left} size="medium" />
				{this.state.buttons.map((button, index) => {
					return (<ButtonLabel key={index} button={button} size="medium" />)
				})}
				<ButtonLabel button={this.state.right} size="medium" />
			</div>
		)
	}
}

export { HorizontalLabels };