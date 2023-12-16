import React, { useRef, createRef } from 'react';
import { VerticalButtons } from "./vertical-buttons";
import { HorizontalButtons } from "./horizonal-buttons";
import { VerticalLabels } from "./vertical-labels";
import { HorizontalLabels } from "./horizontal-labels";
import { Console } from "./console";

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

const MFD = function ({ mfd }) {
	console.log(mfd)
	const consoleEl = useRef("");
	const center = createRef("");

	const actionCallback = function (type, color) {
		consoleEl.current.log(`${type}:${color}`)
		switch (type) {
			case "start":
				setBackground(color);
				break;
			case "end":
				setBackground("");
				break;
			default:
		}
	};

	const setBackground = function (color) {
		if (center.current) {
			center.current.style.transition = color === "" ? "background-image 1s linear" : "";
			center.current.style.backgroundImage = color === "" ? "" : `radial-gradient(${color}, black)`;
		}
	};

	return (
		<div className={`mfd`} >
			<VerticalButtons
				top={mfd.Rocker[0]}
				buttons={mfd.Left}
				bottom={mfd.Rocker[2]}
				actionCallback={actionCallback}
			/>
			<div className="middleColumn">
				<HorizontalButtons
					buttons={mfd.Top}
					actionCallback={actionCallback}
				/>
				<div ref={center} className="centerScreen crt" style={{ backgroundImage: mfd.Background }}>
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
						<Console ref={consoleEl} label={mfd.Label} max="10" />
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
					actionCallback={actionCallback}
				/>
			</div>
			<VerticalButtons
				top={mfd.Rocker[1]}
				buttons={mfd.Right}
				bottom={mfd.Rocker[3]}
				actionCallback={actionCallback}
			/>
		</div>
	)
}

export { MFD, DefaultMFD };