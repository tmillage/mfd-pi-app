const { ButtonLabel } = require("./button");

const HorizontalLabels = ({ left, buttons, right }) => {
	const getLabels = function () {
		var btns = [];
		for (let i = 0; i < 5; i++) {
			btns.push(<ButtonLabel key={i} button={buttons[i]} size="medium" />)
		}
		return btns;
	}

	return (
		<div className="horizontalLabels">
			<ButtonLabel button={left} size="medium" />
			{getLabels()}
			<ButtonLabel button={right} size="medium" />
		</div>
	)
}

export { HorizontalLabels };