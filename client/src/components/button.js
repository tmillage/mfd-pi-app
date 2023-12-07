const { Component } = require("react");


const ButtonIcons = {
	Default: "\u25CB",
	NoAction: "\u2297",
	UpArrow: "\u2191",
	DownArrow: "\u2193"

}

const DefaultButton = function () {
	return {
		TextLabel: "",
		Action: ""
	}
}

class Button extends Component {
	state = {
		actionCallback: this.props.actionCallback || function () { },
		label: this.props.label || ButtonIcons.Default,
		action: (this.props.button || DefaultButton()).Action
	}

	setButton = function (newButton) {
		console.log("Button.setButton");
		this.setState({ action: (newButton || DefaultButton()).Action });

	}

	componentDidMount() {
		console.log("button mount");
		const actionStart = (evt) => {
			this.button.style.transition = "";
			this.button.style.backgroundColor = this.state.action !== "" ? "green" : "red";
			this.state.actionCallback("start", this.state.action);
		}

		const actionEnd = (evt) => {
			this.button.style.transition = "background-color 1s linear";
			this.button.style.background = "unset";
			this.state.actionCallback("end", this.state.action);

			try { evt.preventDefault(); } catch { }
		}


		this.button.addEventListener("mousedown", actionStart, false);
		this.button.addEventListener("touchstart", actionStart, false);
		this.button.addEventListener("mouseup", actionEnd, false);
		this.button.addEventListener("touchend", actionEnd, false);

	}

	componentWillUnmount() {
		console.log("button unmount");
	}

	render = function () {
		this.button = null;

		return (
			<div
				ref={el => this.button = el}
				className="button"
			>
				<p>
					{this.state.action ? this.state.label : ButtonIcons.NoAction}
				</p>
			</div>);
	}
}

class ButtonLabel extends Component {
	state = {
		label: this.props.label,
		button: this.props.button || DefaultButton(),
		size: this.props.size
	}

	render = function () {
		return (
			<div className={`label ${this.state.size}`}>
				{this.props.label || this.state.button.TextLabel}
			</div>
		)
	}
}

const DefaultRocker = function () {
	return {
		Label: "",
		Top: DefaultButton(),
		Bottom: DefaultButton()
	}
}

class Rocker extends Component {
	state = {
		action: this.props.action || function () { },
		rocker: this.props.rocker || DefaultRocker(),
		actionCallback: this.props.actionCallback || function () { }
	}

	setRocker = function (newRocker) {
		console.log("Rocker.setRocker");
		this.setState({ rocker: newRocker });
		this.topButton.setButton(newRocker.Top);
		this.bottomButton.setButton(newRocker.Bottom);
	}

	render = function () {
		this.topButton = null;
		this.bottomButton = null;

		return (
			<div className="rocker">
				<Button ref={btn => this.topButton = btn} label={ButtonIcons.UpArrow} button={this.state.rocker.Top} actionCallback={this.state.actionCallback} />
				<Button ref={btn => this.bottomButton = btn} label={ButtonIcons.DownArrow} button={this.state.rocker.Bottom} actionCallback={this.state.actionCallback} />
			</div>
		);
	}
}

class RockerLabel extends Component {
	state = {
		rocker: this.props.rocker || DefaultRocker()
	}

	render = function () {
		return (
			<ButtonLabel label={this.state.rocker.Label} size="medium" />
		);
	}
}

export { DefaultButton, Button, ButtonLabel, DefaultRocker, Rocker, RockerLabel }