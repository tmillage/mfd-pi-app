const { Component } = require("react");


const ButtonIcons =  {
	Default: "\u20DD",
	NoAction: "\u2297",
	UpArrow: "\u2191",
	DownArrow: "\u2193"
	
}

class Button extends Component {
	state = {
		action: this.props.action || function () {},
		label: this.props.label || (this.props.action ? ButtonIcons.Default : ButtonIcons.NoAction)
	}

	render = function() {
		return (
		<div className="button" onClick={ this.props.action }>
			<p>
				{this.state.label}
			</p>
		</div>);
	}
}

class Rocker extends Component {
	state = {
		label: this.props.label || "X"
	}

	render = function() {
		return (
		<div className="rocker">
			<Button label={ButtonIcons.UpArrow} />
			<Button label={ButtonIcons.DownArrow} />
		</div>);
	}
}

export {Button, Rocker}