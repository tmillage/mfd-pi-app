import React, {JSX} from 'react';
import { Console, ConsoleLine } from "./console";
import { Button, ButtonLabel, DefaultButton, DefaultRocker, Rocker } from "./button";
import { PanelDTO } from "shared/DTO";

interface MFDProps {
    consoleId: number,
	mfd: PanelDTO,
    consoles: [ConsoleLine[],ConsoleLine[]];
	actionCallback: (mfd: string, type: string, action: string, data: any) => void;
}

const DefaultMFD = function (): PanelDTO {
	return {
		label: "",
		background: "",
		top: [],
		left: [],
		right: [],
		bottom: [],
		rocker: []
	};
};

const MFD = function ({ consoleId, mfd, consoles, actionCallback }: MFDProps): React.JSX.Element {

	const actionCallback2 = function (type: string, action: string) {
		actionCallback(consoleId.toString(), type, action, null);
	};

	const getButtonElements = function (side: string, buttons: any[]) {
		let btns: React.JSX.Element[] = [];
		for (let i = 0; i < 5; i++) {
			btns.push(<div key={`${side}-${i}`} className={`${side}-${i + 1} buttonHolder`}><Button button={buttons[i] || DefaultButton()} actionCallback={actionCallback2} /></div>);
			btns.push(<div key={`${side}-${i}-label`} className={`${side}-${i + 1}-label ${side}-label`}><ButtonLabel button={buttons[i] || DefaultButton()} /></div>);
		}
		return btns;
	};

	const getRockerElements = function (rockers: any[]) {
		let btns: React.JSX.Element[] = [];
		for (let i = 0; i < 4; i++) {
			btns.push(<div key={`rocker-${i}`} className={`rocker-${i + 1} buttonHolder`}><Rocker rocker={rockers[i] || DefaultRocker()} actionCallback={actionCallback2} /></div>)
			btns.push(<div key={`rocker-${i}-label`} className={`rocker-${i + 1}-label rocker-label`}><ButtonLabel button={rockers[i] || DefaultRocker()} /></div>);
		}
		return btns;
	};

	return (
		<div className={`mfd`} >
			{getButtonElements("left", mfd.left)}
			{getButtonElements("top", mfd.top)}
			{getButtonElements("right", mfd.right)}
			{getButtonElements("bottom", mfd.bottom)}
			{getRockerElements(mfd.rocker)}
			<div className="centerScreen crt" style={{ backgroundImage: mfd.background }} />
			<div className="consoleGridLocation">
				<Console label={mfd.label} display={consoles[consoleId]} />
			</div>
		</div>
	);
};

export { MFD, DefaultMFD };