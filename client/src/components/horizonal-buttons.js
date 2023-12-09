const { Button } = require("./button");

const HorizontalButtons = ({ buttons, actionCallback }) => {
	const getButtons = function () {
		var btns = [];
		for (let i = 0; i < 5; i++) {
			btns.push(<Button key={i} button={buttons[i]} actionCallback={actionCallback} />)
		}
		return btns;
	}

	return (
		<div className="horizontalButtons">
			{getButtons()}
		</div>
	)
}

export { HorizontalButtons };