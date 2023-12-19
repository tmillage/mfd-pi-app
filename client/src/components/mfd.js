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

const MFD = function ({ mfd, actionCallback }) {

	const actionCallback2 = function (type, action) {
		actionCallback(mfd.Label, type, action);
	};

	return (
		<div className={`mfd`} >
			<VerticalButtons
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
			/>
		</div>
	)
}

export { MFD, DefaultMFD };