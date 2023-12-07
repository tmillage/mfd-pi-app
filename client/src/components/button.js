const { Component } = require("react");


const ButtonIcons =  {
	Default: "\u25CB",
	NoAction: "\u2297",
	UpArrow: "\u2191",
	DownArrow: "\u2193"
	
}

const DefaultButton = function() {
	return {
		TextLabel: "",
		Action: ""
	}
}

class Button extends Component {
	state = {
		button: this.props.button || DefaultButton(),
		actionCallback: this.props.actionCallback || function() { },
		label: this.props.label
	}

	componentDidMount () {
		if(!this.state.label) {
			this.state.label = this.state.button.Action ? ButtonIcons.Default : ButtonIcons.NoAction;
			this.setState(this.state);
		}
	}
	render = function() {
		let button = null;
		const actionStart = (evt) => {
			button.style.transition = "";
			button.style.backgroundColor = this.state.button.Action !== "" ? "green" : "red";
			this.state.actionCallback("start", this.state.button.Action);

			evt.preventDefault();
		}

		const actionEnd = (evt) => {
			button.style.transition = "background-color 1s linear";
			button.style.background = "unset";
			this.state.actionCallback("end", this.state.button.Action);

			evt.preventDefault();
		}

		return (
		<div
			ref = { el => button = el }
			className="button"
			onMouseDown={ actionStart }
			onTouchStart={ actionStart }
			onMouseUp={ actionEnd }
			onTouchEnd={ actionEnd }
		>
			<p>
				{this.state.label}
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

	render = function() {
		return (
			<div className={`label ${this.state.size}`}>
				{this.props.label || this.state.button.TextLabel}
			</div>
		)
	}
}

const DefaultRocker = function() {
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
		actionCallback: this.props.actionCallback || function() { }
	}

	render = function() {
		const upLabel = this.state.rocker.Top.Action ? ButtonIcons.UpArrow : ButtonIcons.NoAction;
		const dwLabel = this.state.rocker.Bottom.Action ? ButtonIcons.DownArrow : ButtonIcons.NoAction;


		return (
			<div className="rocker">
				<Button label={upLabel} button={this.state.rocker.Top} actionCallback={this.state.actionCallback} />
				<Button label={dwLabel} button={this.state.rocker.Bottom} actionCallback={this.state.actionCallback} />
			</div>
		);
	}
}

class RockerLabel extends Component {
	state = {
		rocker: this.props.rocker || DefaultRocker()
	}
	
	render = function() {
		return (
			<ButtonLabel label={this.state.rocker.Label} size="medium" />
		);
	}
}

export {Button, ButtonLabel, Rocker, RockerLabel}