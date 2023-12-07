import { Component } from "react";
import { Button, ButtonLabel, Rocker, RockerLabel }  from "./button";

const DefaultMFD = function() {
	return {
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
		app: this.props.app,
		background: this.props.background || "",
		left: this.props.left || "",
		right: this.props.right || "",
		top: this.props.top || "",
		bottom: this.props.bottom || "",

		mfd: this.props.mfd || DefaultMFD()
	}

	runCommand = async (el, app, cmd) => {
		el.disabled = true;
		const response = await fetch(`/send?app=${app}&cmd=${cmd}`);
		const body = await response.json();
		el.disabled = false;
		
		if(body.status === "OK") {
			el.style.background = 'green';
		} else {
			el.style.background = 'red';
		}
		setTimeout(() => {el.style.background = ''}, 250);
	}

	render = function() {
		let T = this;
		let center = null;
		const setBackground = function(color) {
			if(center) {
				center.style.transition = color === "" ? "background-image 1s linear" : "";
				if(color === "") {
					color = "lightgreen"
				} 
				center.style.backgroundImage = `radial-gradient(${color}, black)`;
			}
		}

		const actionCallback = function(type, color) {
			switch (type) {
				case "start":
					setBackground(color);
					break;
				case "end":
					setBackground("");
					break;
			}
		}
		console.log(this.state.mfd);
		console.log(this.state.mfd.Buttons.Rocker);
		return(
			<div className={`mfd`} style={{left: this.props.left, right: this.props.right, top: this.props.top, bottom: this.props.bottom}}>
				<div className="leftButtons">
					<Rocker rocker={this.state.mfd.Buttons.Rocker[0]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Left[0]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Left[1]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Left[2]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Left[3]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Left[4]} actionCallback={actionCallback} />
					<Rocker rocker={this.state.mfd.Buttons.Rocker[2]} actionCallback={actionCallback} />
				</div>
				<div className="middleColumn">
					<div className="topButtons">
						<Button button={this.state.mfd.Buttons.Top[0]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Top[1]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Top[2]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Top[3]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Top[4]} actionCallback={actionCallback} />
					</div>
					<div ref={el => center = el} className="centerScreen crt">
						<div className="scanline"></div>
						<div className="topLabels">
							<RockerLabel rocker={this.state.mfd.Buttons.Rocker[0]} />
							<ButtonLabel button={this.state.mfd.Buttons.Top[0]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Top[1]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Top[2]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Top[3]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Top[4]} size="medium"  />
							<RockerLabel rocker={this.state.mfd.Buttons.Rocker[1]} />
						</div>
						<div className="middleLabels">
							<div className="leftLabels">
								<ButtonLabel button={this.state.mfd.Buttons.Left[0]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Left[1]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Left[2]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Left[3]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Left[4]} size="large"  />
							</div>
							<div className="centerLabels">
								<img className="background" src={this.state.mfd.Background} alt="a background"/>
							</div>
							<div className="rightLabels">
								<ButtonLabel button={this.state.mfd.Buttons.Right[0]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Right[1]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Right[2]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Right[3]} size="large"  />
								<ButtonLabel button={this.state.mfd.Buttons.Right[4]} size="large"  />
							</div>
						</div>
						<div className="bottomLabels">
							<RockerLabel rocker={this.state.mfd.Buttons.Rocker[2]} />
							<ButtonLabel button={this.state.mfd.Buttons.Bottom[0]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Bottom[1]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Bottom[2]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Bottom[3]} size="medium"  />
							<ButtonLabel button={this.state.mfd.Buttons.Bottom[4]} size="medium"  />
							<RockerLabel rocker={this.state.mfd.Buttons.Rocker[3]} />
						</div>
					</div>
					<div className="bottomButtons">
						<Button button={this.state.mfd.Buttons.Bottom[0]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Bottom[1]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Bottom[2]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Bottom[3]} actionCallback={actionCallback} />
						<Button button={this.state.mfd.Buttons.Bottom[4]} actionCallback={actionCallback} />
					</div>
				</div>
				<div className="rightButtons">
					<Rocker rocker={this.state.mfd.Buttons.Rocker[1]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Right[0]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Right[1]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Right[2]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Right[3]} actionCallback={actionCallback} />
					<Button button={this.state.mfd.Buttons.Right[4]} actionCallback={actionCallback} />
					<Rocker rocker={this.state.mfd.Buttons.Rocker[3]} actionCallback={actionCallback} />
				</div>
			</div>
		)
	}
}

export default MFD;