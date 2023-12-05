const { Component } = require("react");


const ButtonIcons =  {
	Default: "\u25CB",
	NoAction: "\u2297",
	UpArrow: "\u2191",
	DownArrow: "\u2193"
	
}

class Button extends Component {
	state = {
		action: this.props.action || function() {},
		label: this.props.label || (this.props.action ? ButtonIcons.Default : ButtonIcons.NoAction),
		pressedColor: this.props.action ? "green" : "red"
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
				this.state.action("start")
			} }
			onMouseUp={ () => {
				this.state.action("end");
				button.style.transition = "background-color 1s linear";
				button.style.background = "unset";
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
		label: this.props.label,
		size: this.props.size
	}

	render = function() {
		return (
			<div className={`label ${this.state.size}`}>
				{this.state.label}
			</div>
		)
	}
}

class Rocker extends Component {
	state = {
		actionUp: this.props.actionUp,
		actionDown: this.props.actionDown
	}

	render = function() {
		return (
			<div className="rocker">
				<Button label={this.state.actionUp ? ButtonIcons.UpArrow : ButtonIcons.NoAction} action={this.state.actionUp} />
				<Button label={this.state.actionUp ? ButtonIcons.DownArrow : ButtonIcons.NoAction} action={this.state.actionDown} />
			</div>
		);
	}
}

class RockerLabel extends Component {
	state = {
		labelUp: this.props.labelUp,
		labelDown: this.props.labelDown
	}
	
	render = function() {
		return (
			<div className="rocker-label">
				<ButtonLabel label={this.state.labelUp} size="small" />
				<ButtonLabel label={this.state.labelDown} size="small" />
			</div>
		);
	}
}

export {Button, ButtonLabel, Rocker, RockerLabel}