import { useState } from 'react';

const ButtonIcons = {
	Default: "\u2D54",
	NoAction: "\u2A02",
	UpArrow: "\u2191",
	DownArrow: "\u2193"

}

const DefaultButton = function () {
	return {
		TextLabel: "",
		Action: ""
	}
}

const Button = ({ button, label, actionCallback, className }) => {
	const [pressed, setPressed] = useState(false);

	const getButton = () => {
		return button || DefaultButton();
	}

	const actionStart = (evt) => {
		setPressed(true);
		evt.target.style.transition = "";
		evt.target.style.backgroundColor = getButton().Action !== "" ? "green" : "red";
		actionCallback("start", getButton().Action);
	}

	const actionEnd = (evt) => {
		if (pressed) {
			setPressed(false);
			evt.target.style.transition = "background-color 1s linear";
			evt.target.style.background = "unset";
			actionCallback("end", getButton().Action);
		}

		try { evt.preventDefault(); } catch { }
	}

	const buttonIcon = () => {
		if (getButton().Action) {
			return label || ButtonIcons.Default;
		}
		return ButtonIcons.NoAction;
	}

	return (
		<button
			className={className || "button"}
			onMouseDown={actionStart}
			onTouchStart={actionStart}
			onMouseUp={actionEnd}
			onTouchEnd={actionEnd}
			onMouseLeave={actionEnd}
		>
			{buttonIcon()}
		</button>);
}

const ButtonLabel = ({ button }) => {

	return (
		<div className={`label`}>
			{(button || DefaultButton()).TextLabel}
		</div>
	)
}

const DefaultRocker = function () {
	return {
		TextLabel: "",
		Top: DefaultButton(),
		Bottom: DefaultButton()
	}
}

const Rocker = ({ rocker, actionCallback }) => {
	const getRocker = () => {
		return rocker || DefaultRocker();
	}
	return (
		<div className="rocker">
			<Button label={ButtonIcons.UpArrow} button={getRocker().Top} actionCallback={actionCallback} />
			<Button label={ButtonIcons.DownArrow} button={getRocker().Bottom} actionCallback={actionCallback} />
		</div>
	);
}

const RockerLabel = ({ rocker }) => {

	return (
		<ButtonLabel label={rocker} size="medium" />
	);
}

export { DefaultButton, Button, ButtonLabel, DefaultRocker, Rocker, RockerLabel }