import { Console } from "./console";
import { Button, ButtonLabel, DefaultButton, DefaultRocker, Rocker } from "./button";

const DefaultMFD = function () {
	return {
		Label: "",
		Background: "",
		Top: [],
		Left: [],
		Right: [],
		Bottom: [],
		Rocker: []
	}
}

const MFD = function ({ mfd, actionCallback }) {

	const actionCallback2 = function (type, action) {
		actionCallback(mfd.Label, type, action);
	};

	const getButtonElements = function (side, buttons) {
		let btns = [];
		for (let i = 0; i < 5; i++) {
			btns.push(<div key={`${side}-${i}`} className={`${side}-${i + 1} buttonHolder`}><Button button={buttons[i] || DefaultButton()} actionCallback={actionCallback2} /></div>);
			btns.push(<div key={`${side}-${i}-label`} className={`${side}-${i + 1}-label ${side}-label`}><ButtonLabel button={buttons[i] || DefaultButton()} /></div>);
		}
		return btns;
	}

	const getRockerElements = function (rockers) {
		let btns = [];
		for (let i = 0; i < 4; i++) {
			btns.push(<div key={`rocker-${i}`} className={`rocker-${i + 1} buttonHolder`}><Rocker rocker={rockers[i] || DefaultRocker()} actionCallback={actionCallback2} /></div>)
			btns.push(<div key={`rocker-${i}-label`} className={`rocker-${i + 1}-label rocker-label`}><ButtonLabel button={rockers[i] || DefaultRocker()} /></div>);
		}
		return btns;
	}

	return (
		<div className={`mfd`} >
			{getButtonElements("left", mfd.Left)}
			{getButtonElements("top", mfd.Top)}
			{getButtonElements("right", mfd.Right)}
			{getButtonElements("bottom", mfd.Bottom)}
			{getRockerElements(mfd.Rocker)}
			<div className="centerScreen crt" style={{ backgroundImage: mfd.Background }} />
			<div className="consoleGridLocation">
				<Console label={mfd.Label} display={mfd.Display} />
			</div>
		</div>
	)
}

export { MFD, DefaultMFD };