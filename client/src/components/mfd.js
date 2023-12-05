import { Component } from "react";
import { Button, Rocker }  from "./button";

class MFD extends Component {
	state = {
		app: this.props.app,
		position: this.props.position || "",
		background: this.props.background || "",
		buttons: this.props.buttons || [],
		left: this.props.left || "",
		right: this.props.right || "",
		top: this.props.top || "",
		bottom: this.props.bottom || ""
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

	//div className={`labels mfd-${this.state.position}`}

	render = function() {
		let T = this;
		let center = null;
		const setBackground = function(color) {
			console.log(color)
			if(center) {
				center.style.transition = color === "" ? "background-color 1s linear" : "";
				center.style.backgroundColor = color;
			}
		}

		const buttonAction = function(color) {
			return function (actionType) {
				switch (actionType) {
					case "start":
						setBackground(color);
						break;
					case "end":
						setBackground("");
						break;
				}
			}
		}
		return(
			<div className={`mfd`} style={{left: this.props.left, right: this.props.right, top: this.props.top, bottom: this.props.bottom}}>
				<div className="leftButtons">
					<Rocker actionUp={ buttonAction("grey") } actionDown={ buttonAction("purple") } />
					<Button action={ buttonAction("red") } />
					<Button action={ buttonAction("blue") } />
					<Button action={ buttonAction("white") }/>
					<Button />
					<Button />
					<Rocker />
				</div>
				<div className="middleColumn">
					<div className="topButtons">
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
					</div>
					<div ref={el => center = el} className="centerScreen"><img className="background" src={this.state.background} alt="a background"/></div>
					<div className="bottomButtons">
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
					</div>
				</div>
				<div className="rightButtons">
					<Rocker />
					<Button />
					<Button />
					<Button />
					<Button />
					<Button />
					<Rocker />
				</div>
			</div>
		)
	}
}

export default MFD;