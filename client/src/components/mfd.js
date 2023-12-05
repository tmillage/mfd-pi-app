import { Component } from "react";
import { Button, ButtonLabel, Rocker, RockerLabel }  from "./button";

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

	render = function() {
		let T = this;
		let center = null;
		const setBackground = function(color) {
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
					<div ref={el => center = el} className="centerScreen">
						<div className="topLabels">
							<RockerLabel labelUp="rk1 u" labelDown="rk1 d" />
							<ButtonLabel label="top 1" size="medium" />
							<ButtonLabel label="top 2" size="medium" />
							<ButtonLabel label="top 3" size="medium" />
							<ButtonLabel label="top 4" size="medium" />
							<ButtonLabel label="top 5" size="medium" />
							<RockerLabel labelUp="rk2 u" labelDown="rk2 d" />
						</div>
						<div className="middleLabels">
							<div className="leftLabels">
								<ButtonLabel label="lft 1" size="large" />
								<ButtonLabel label="lft 2" size="large" />
								<ButtonLabel label="lft 3" size="large" />
								<ButtonLabel label="lft 4" size="large" />
								<ButtonLabel label="lft 5" size="large" />
							</div>
							<div className="centerLabels">
								<img className="background" src={this.state.background} alt="a background"/>
							</div>
							<div className="rightLabels">
								<ButtonLabel label="lft 1" size="large" />
								<ButtonLabel label="lft 2" size="large" />
								<ButtonLabel label="lft 3" size="large" />
								<ButtonLabel label="lft 4" size="large" />
								<ButtonLabel label="lft 5" size="large" />
							</div>
						</div>
						<div className="bottomLabels">
							<RockerLabel labelUp="rk3 u" labelDown="rk3 d" />
							<ButtonLabel label="btm 1" size="medium" />
							<ButtonLabel label="btm 2" size="medium" />
							<ButtonLabel label="btm 3" size="medium" />
							<ButtonLabel label="btm 4" size="medium" />
							<ButtonLabel label="btm 5" size="medium" />
							<RockerLabel labelUp="rk4 u" labelDown="rk4 d" />
						</div>
					</div>
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