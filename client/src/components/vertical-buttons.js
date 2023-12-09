const { Button, Rocker } = require("./button");

const VerticalButtons = ({ top, buttons, bottom, actionCallback }) => {

	const getButtons = function () {
		var btns = [];
		for (let i = 0; i < 5; i++) {
			btns.push(<Button key={i} button={buttons[i]} actionCallback={actionCallback} />)
		}
		return btns;
	}

	return (
		<div className="verticalButtons">
			<Rocker rocker={top} actionCallback={actionCallback} />
			{getButtons()}
			<Rocker rocker={bottom} actionCallback={actionCallback} />
		</div>
	)
}

export { VerticalButtons };