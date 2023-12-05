const { Component } = require("react");


const ButtonIcons =  {
	Default: "\u25CB",
	NoAction: "\u2297",
	UpArrow: "\u2191",
	DownArrow: "\u2193"
	
}

class Button extends Component {
	state = {
		action: this.props.action,
		label: this.props.label || (this.props.action ? ButtonIcons.Default : ButtonIcons.NoAction)
	}

	render = function() {
		let button = null;
		return (
		<div
			ref = { el => button = el }
			className="button"
			onMouseDown={ () => {
				button.style.transition = "";
				if(this.state.action) {
					button.style.backgroundColor = "green";
					this.state.action("start")
				} else {
					button.style.backgroundColor = "red";
				}
			} }
			onMouseUp={ () => {
				if(this.state.action) {
					this.state.action("end")
				}
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

class Rocker extends Component {
	state = {
		label: this.props.label || "X",
		actionUp: this.props.actionUp,
		actionDown: this.props.actionDown
	}

	render = function() {
		return (
		<div className="rocker">
			<Button label={this.state.actionUp ? ButtonIcons.UpArrow : ButtonIcons.NoAction} action={this.state.actionUp} />
			<Button label={this.state.actionUp ? ButtonIcons.DownArrow : ButtonIcons.NoAction} action={this.state.actionDown} />
		</div>);
	}
}

export {Button, Rocker}