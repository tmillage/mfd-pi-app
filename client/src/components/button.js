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
		label: this.props.label,
		pressedColor: "red"
	}

	componentDidMount () {
		if(!this.state.label) {
			this.state.label = this.state.button.Action ? ButtonIcons.Default : ButtonIcons.NoAction;
			this.state.pressedColor = this.state.button.Action ? "green" : "red"
			this.setState(this.state);
		}
	}
	render = function() {
		let button = null;
		return (
		<div
			ref = { el => button = el }
			className="button"
			onMouseDown={ () => {
				button.style.transition = "";
				button.style.backgroundColor = this.state.pressedColor;
				this.state.actionCallback("start", this.state.button.Action);
			} }
			onMouseUp={ () => {
				button.style.transition = "background-color 1s linear";
				button.style.background = "unset";
				this.state.actionCallback("end", this.state.button.Action);
			}}
		>
			<p>
				{this.state.label}
			</p>
		</div>);
	}
}

class ButtonLabel extends Component {
	state = {
		button: this.props.button || DefaultButton(),
		size: this.props.size
	}

	render = function() {
		return (
			<div className={`label ${this.state.size}`}>
				{this.state.button.TextLabel}
			</div>
		)
	}
}

const DefaultRocker = function() {
	return {
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
		const dwLabel = this.state.rocker.Bottom.Action ? ButtonIcons.DownArrow 	 : ButtonIcons.NoAction;


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
		console.log(this.state.rocker)
		console.log(this.state.rocker.Top)
		console.log(this.state.rocker.Bottom)
		return (
			<div className="rocker-label">
				<ButtonLabel button={this.state.rocker.Top} size="small" />
				<ButtonLabel button={this.state.rocker.Bottom} size="small" />
			</div>
		);
	}
}

export {Button, ButtonLabel, Rocker, RockerLabel}