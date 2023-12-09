const { ButtonLabel } = require("./button");

const VerticalLabels = function ({ buttons }) {
	const getLabels = function () {
		var btns = [];
		for (let i = 0; i < 5; i++) {
			btns.push(<ButtonLabel key={i} button={buttons[i]} size="large" />)
		}
		return btns;
	}

	return (
		<div className="verticalLabels" size="medium">
			{getLabels()}
		</div>
	)
}

export { VerticalLabels };