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
			btns.push(<div className={`${side}-${i + 1} buttonHolder`}><Button key={`${side}-${i}`} button={buttons[i] || DefaultButton()} actionCallback={actionCallback2} /></div>);
			btns.push(<div className={`${side}-${i + 1}-label ${side}-label`}><ButtonLabel key={`${side}-${i}-label`} button={buttons[i] || DefaultButton()} /></div>);
		}
		return btns;
	}

	const getRockerElements = function (rockers) {
		let btns = [];
		for (let i = 0; i < 4; i++) {
			btns.push(<div className={`rocker-${i + 1} buttonHolder`}><Rocker key={`rocker-${i}`} rocker={rockers[i] || DefaultRocker()} actionCallback={actionCallback2} /></div>)
			btns.push(<div className={`rocker-${i + 1}-label rocker-label`}><ButtonLabel key={`rocker-${i}-label`} button={rockers[i] || DefaultRocker()} /></div>);
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
			<div className="centerScreen crt" style={{ backgroundImage: mfd.Background }}>
				<Console label={mfd.Label} display={mfd.Display} />
			</div>
			{/*<VerticalButtons
				top={mfd.Rocker[0]}
				buttons={mfd.Left}
				bottom={mfd.Rocker[2]}
				actionCallback={actionCallback2}
			/>
			<div className="middleColumn">
				<HorizontalButtons
					buttons={mfd.Top}
					actionCallback={actionCallback2}
				/>
				<div className="centerScreen crt" style={{ backgroundImage: mfd.Background }}>
					<div className="scanline"></div>
					<HorizontalLabels
						left={mfd.Rocker[0]}
						buttons={mfd.Top}
						right={mfd.Rocker[1]}
					/>
					<div className="middleLabels">
						<VerticalLabels
							buttons={mfd.Left}
						/>
						<Console label={mfd.Label} display={mfd.Display} />
						<VerticalLabels
							buttons={mfd.Right}
						/>
					</div>
					<HorizontalLabels
						left={mfd.Rocker[2]}
						buttons={mfd.Bottom}
						right={mfd.Rocker[3]}
					/>
				</div>
				<HorizontalButtons
					buttons={mfd.Bottom}
					actionCallback={actionCallback2}
				/>
			</div>
			<VerticalButtons
				top={mfd.Rocker[1]}
				buttons={mfd.Right}
				bottom={mfd.Rocker[3]}
				actionCallback={actionCallback2}
		/> */}
		</div>
	)
}

export { MFD, DefaultMFD };