import React, { useState, MouseEvent, TouchEvent } from 'react';

interface ButtonProps {
	button?: ButtonType;
	label?: string;
	actionCallback: (action: string, buttonAction: string) => void;
	className?: string;
}

interface ButtonType {
	Label?: string;
	TextLabel: string;
	Action: string;
}

const ButtonIcons = {
	Default: "\u2D54",
	NoAction: "\u2A02",
	UpArrow: "\u2191",
	DownArrow: "\u2193"
};

const DefaultButton = function (): ButtonType {
	return {
		TextLabel: "",
		Action: ""
	};
};

const Button: React.FC<ButtonProps> = ({ button, label, actionCallback, className }) => {
	const [pressed, setPressed] = useState(false);

	const getButton = (): ButtonType => {
		return button || DefaultButton();
	};

	const actionStart = (evt: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>): void => {
		setPressed(true);
		(evt.target as HTMLButtonElement).style.transition = "";
		(evt.target as HTMLButtonElement).style.backgroundColor = getButton().Action !== "" ? "green" : "red";
		actionCallback("start", getButton().Action);
	};

	const actionEnd = (evt: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>): void => {
		if (pressed) {
			setPressed(false);
			(evt.target as HTMLButtonElement).style.transition = "background-color 1s linear";
			(evt.target as HTMLButtonElement).style.background = "unset";
			actionCallback("end", getButton().Action);
		}

		try {
			evt.preventDefault();
		} catch { }
	};

	const buttonIcon = (): string => {
		if (getButton().Action) {
			return label || ButtonIcons.Default;
		}
		return ButtonIcons.NoAction;
	};

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
		</button>
	);
};

interface ButtonLabelProps {
	button?: ButtonType | RockerType;
}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ button }) => {
	return (
		<div className={`label`}>
			{(button || DefaultButton()).TextLabel}
		</div>
	);
};

interface RockerProps {
	rocker?: RockerType;
	actionCallback: (action: string, buttonAction: string) => void;
}

interface RockerType {
	TextLabel: string;
	Top: ButtonType;
	Bottom: ButtonType;
}

const DefaultRocker = function (): RockerType {
	return {
		TextLabel: "",
		Top: DefaultButton(),
		Bottom: DefaultButton()
	};
};

const Rocker: React.FC<RockerProps> = ({ rocker, actionCallback }) => {
	const getRocker = (): RockerType => {
		return rocker || DefaultRocker();
	};

	return (
		<div className="rocker">
			<Button label={ButtonIcons.UpArrow} button={getRocker().Top} actionCallback={actionCallback} />
			<Button label={ButtonIcons.DownArrow} button={getRocker().Bottom} actionCallback={actionCallback} />
		</div>
	);
};

interface RockerLabelProps {
	rocker?: RockerType;
}

const RockerLabel: React.FC<RockerLabelProps> = ({ rocker }) => {
	return (
		<ButtonLabel button={rocker} />
	);
};

export { DefaultButton, Button, ButtonLabel, ButtonType, DefaultRocker, Rocker, RockerLabel, RockerType };
