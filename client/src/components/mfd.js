import { Component } from "react";
import { VerticalButtons } from "./vertical-buttons";
import { HorizontalButtons } from "./horizonal-buttons";
import { VerticalLabels } from "./vertical-labels";
import { HorizontalLabels } from "./horizontal-labels";

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

	render = function () {
		this.center = null;
		const T = this;

		const setBackground = function (color) {
			if (T.center) {
				T.center.style.transition = color === "" ? "background-image 1s linear" : "";
				T.center.style.backgroundImage = color === "" ? "" : `radial-gradient(${color}, black)`;
			}
		}

		const actionCallback = function (type, color) {
			console.log(`${type}:${color}`)
			switch (type) {
				case "start":
					setBackground(color);
					break;
				case "end":
					setBackground("");
					break;
				default:
			}
		}

		return (
			<div className={`mfd`} >
				<VerticalButtons
					top={this.state.mfd.Rocker[0]}
					buttons={this.state.mfd.Left}
					bottom={this.state.mfd.Rocker[2]}
					actionCallback={actionCallback}
				/>
				<div className="middleColumn">
					<HorizontalButtons
						buttons={this.state.mfd.Top}
						actionCallback={actionCallback}
					/>
					<div ref={el => this.center = el} className="centerScreen crt">
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
							<div className="centerLabels">
								<div className="mfdLabel">{this.state.mfd.Label}</div>
								{this.state.mfd.Background !== "" &&
									<img className="background" src={this.state.mfd.Background} alt="a background" />
								}
							</div>
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
						actionCallback={actionCallback}
					/>
				</div>
				<VerticalButtons
					top={this.state.mfd.Rocker[1]}
					buttons={this.state.mfd.Right}
					bottom={this.state.mfd.Rocker[3]}
					actionCallback={actionCallback}
				/>
			</div>
		)
	}
}

export default MFD;