import React from 'react';
import { Component } from "react";
import { VerticalButtons } from "./vertical-buttons";
import { HorizontalButtons } from "./horizonal-buttons";
import { VerticalLabels } from "./vertical-labels";
import { HorizontalLabels } from "./horizontal-labels";
import { Console } from "./console";

const DefaultMFD = function () {
	return {
		Label: "",
		Background: "",
		Buttons: {
			Top: [],
			Left: [],
			Right: [],
			Bottom: [],
			Rocker: []
		}
	}
}

class MFD extends Component {
	constructor(props) {
		super(props)

		this.actionCallback = this.actionCallback.bind(this);
		this.setBackground = this.setBackground.bind(this);
		this.console = React.createRef("");
	}

	state = {
		mfd: this.props.mfd || DefaultMFD()
	}

	runCommand = async (el, app, cmd) => {
		el.disabled = true;
		const response = await fetch(`/send?app=${app}&cmd=${cmd}`);
		const body = await response.json();
		el.disabled = false;

		if (body.status === "OK") {
			el.style.background = 'green';
		} else {
			el.style.background = 'red';
		}
		setTimeout(() => { el.style.background = '' }, 250);
	}

	setMFD = function (newMFD) {
		console.log(`"MFD.setMFD" ${this.props.id}`);
		this.setState({ mfd: newMFD });
	}



	actionCallback = function (type, color) {
		console.log(`${type}:${color}`)
		console.log(this.console.current);
		this.console.current.log(`${type}:${color}`)
		switch (type) {
			case "start":
				this.setBackground(color);
				break;
			case "end":
				this.setBackground("");
				break;
			default:
		}
	}

	setBackground = function (color) {
		if (this.center) {
			this.center.style.transition = color === "" ? "background-image 1s linear" : "";
			this.center.style.backgroundImage = color === "" ? "" : `radial-gradient(${color}, black)`;
		}
	}

	render = function () {
		this.center = null;
		const T = this;

		return (
			<div className={`mfd`} >
				<VerticalButtons
					top={this.state.mfd.Rocker[0]}
					buttons={this.state.mfd.Left}
					bottom={this.state.mfd.Rocker[2]}
					actionCallback={this.actionCallback}
				/>
				<div className="middleColumn">
					<HorizontalButtons
						buttons={this.state.mfd.Top}
						actionCallback={this.actionCallback}
					/>
					<div ref={el => this.center = el} className="centerScreen crt" style={{ backgroundImage: this.state.mfd.Background }}>
						<div className="scanline"></div>
						<HorizontalLabels
							left={this.state.mfd.Rocker[0]}
							buttons={this.state.mfd.Top}
							right={this.state.mfd.Rocker[1]}
						/>
						<div className="middleLabels">
							<VerticalLabels
								buttons={this.state.mfd.Left}
							/>
							<Console ref={this.console} label={this.state.mfd.Label} max="10" />
							<VerticalLabels
								buttons={this.state.mfd.Right}
							/>
						</div>
						<HorizontalLabels
							left={this.state.mfd.Rocker[2]}
							buttons={this.state.mfd.Bottom}
							right={this.state.mfd.Rocker[3]}
						/>
					</div>
					<HorizontalButtons
						buttons={this.state.mfd.Bottom}
						actionCallback={this.actionCallback}
					/>
				</div>
				<VerticalButtons
					top={this.state.mfd.Rocker[1]}
					buttons={this.state.mfd.Right}
					bottom={this.state.mfd.Rocker[3]}
					actionCallback={this.actionCallback}
				/>
			</div>
		)
	}
}

export default MFD;