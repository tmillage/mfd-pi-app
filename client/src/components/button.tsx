import React, { useState, MouseEvent, TouchEvent } from 'react';
import {ButtonDTO, RockerDTO} from "shared/DTO";

interface ButtonProps {
	button?: ButtonDTO;
	label?: string;
	actionCallback: (action: string, buttonAction: string) => void;
	className?: string;
}

const ButtonIcons = {
	Default: "\u2D54",
	NoAction: "\u2A02",
	UpArrow: "\u2191",
	DownArrow: "\u2193"
};

const DefaultButton = function (): ButtonDTO {
	return {
		label: "",
		action: ""
	};
};

const Button: React.FC<ButtonProps> = ({ button, label, actionCallback, className }) => {
	const [pressed, setPressed] = useState(false);

	const getButton = (): ButtonDTO => {
		return button || DefaultButton();
	};

	const actionStart = (evt: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>): void => {
		setPressed(true);
		(evt.target as HTMLButtonElement).style.transition = "";
		(evt.target as HTMLButtonElement).style.backgroundColor = getButton().action !== "" ? "green" : "red";
		actionCallback("start", getButton().action || "");
	};

	const actionEnd = (evt: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>): void => {
		if (pressed) {
			setPressed(false);
			(evt.target as HTMLButtonElement).style.transition = "background-color 1s linear";
			(evt.target as HTMLButtonElement).style.background = "unset";
			actionCallback("end", getButton().action || "");
		}

		try {
			evt.preventDefault();
		} catch { }
	};

	const buttonIcon = (): string => {
		if (getButton().action) {
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
	button?: ButtonDTO | RockerDTO;
}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ button }) => {
	return (
		<div className={`label`}>
			{(button || DefaultButton()).label }
		</div>
	);
};

interface RockerProps {
	rocker?: RockerDTO;
	actionCallback: (action: string, buttonAction: string) => void;
}

const DefaultRocker = function (): RockerDTO {
	return {
		label: "",
		top: DefaultButton(),
		bottom: DefaultButton()
	};
};

const Rocker: React.FC<RockerProps> = ({ rocker, actionCallback }) => {
	const getRocker = (): RockerDTO => {
		return rocker || DefaultRocker();
	};

	return (
		<div className="rocker">
			<Button label={ButtonIcons.UpArrow} button={getRocker().top} actionCallback={actionCallback} />
			<Button label={ButtonIcons.DownArrow} button={getRocker().bottom} actionCallback={actionCallback} />
		</div>
	);
};

interface RockerLabelProps {
	rocker?: RockerDTO;
}

const RockerLabel: React.FC<RockerLabelProps> = ({ rocker }) => {
	return (
		<ButtonLabel button={rocker} />
	);
};

export { DefaultButton, Button, ButtonLabel, DefaultRocker, Rocker, RockerLabel };
