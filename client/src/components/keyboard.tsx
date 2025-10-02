import React, { useEffect } from 'react';
import { Button } from './button';
import { ButtonDTO } from 'shared/DTO'

interface Key {
	label?: string;
	value: string;
	size?: number;
	height?: number;
}

interface KeyboardProps {
	IsVisible: boolean;
	actionCallback: (mfd: string, type: string, action: string, data: any) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ IsVisible, actionCallback }) => {
	const [currentlyPressed, setCurrentlyPressed] = React.useState<string[]>([]);

	const keys: Key[][] = [
		[
			{ label: 'Esc', value: 'ESCAPE' },
			{ value: "" },
			{ value: 'F1' },
			{ value: 'F2' },
			{ value: 'F3' },
			{ value: 'F4' },
			{ value: 'F5' },
			{ value: 'F6' },
			{ value: 'F7' },
			{ value: 'F8' },
			{ value: 'F9' },
			{ value: 'F10' },
			{ value: 'F11' },
			{ value: 'F12' },
			{ value: "" },
			{ label: "Print Screen", value: 'PRINT_SCREEN' },
			{ label: "Scroll Lock", value: 'SCROLL_LOCK' },
			{ label: "Pause", value: 'PAUSE' },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" }
		],
		[
			{ label: '`', value: 'GRAVE_ACCENT' },
			{ value: '1' },
			{ value: '2' },
			{ value: '3' },
			{ value: '4' },
			{ value: '5' },
			{ value: '6' },
			{ value: '7' },
			{ value: '8' },
			{ value: '9' },
			{ value: '0' },
			{ label: '-', value: 'MINUS' },
			{ label: '=', value: 'EQUALS' },
			{ label: 'Bksp', value: 'BACKSPACE' },
			{ value: "" },
			{ label: 'Insert', value: 'INSERT' },
			{ label: 'Home', value: 'HOME' },
			{ label: 'Page Up', value: 'PAGE_UP' },
			{ value: "" },
			{ label: "Num Lock", value: 'KEYPAD_NUMLOCK' },
			{ label: '/', value: 'KEYPAD_FORWARD_SLASH' },
			{ label: '*', value: 'KEYPAD_ASTERISK' },
			{ label: '-', value: 'KEYPAD_MINUS' }
		],
		[
			{ label: 'Tab', value: 'TAB' },
			{ value: 'Q' },
			{ value: 'W' },
			{ value: 'E' },
			{ value: 'R' },
			{ value: 'T' },
			{ value: 'Y' },
			{ value: 'U' },
			{ value: 'I' },
			{ value: 'O' },
			{ value: 'P' },
			{ value: 'LBRACKET', label: '[' },
			{ value: 'RBRACKET', label: ']' },
			{ value: 'BACKSLASH', label: '\\' },
			{ value: "" },
			{ value: 'DELETE', label: 'Del' },
			{ value: 'END', label: 'End' },
			{ label: 'PG DN', value: 'PAGE_DOWN' },
			{ value: "" },
			{ label: '7', value: 'KEYPAD_SEVEN' },
			{ label: '8', value: 'KEYPAD_EIGHT' },
			{ label: '9', value: 'KEYPAD_NINE' },
			{ label: '+', value: 'KEYPAD_PLUS', height: 2 }
		],
		[
			{ value: 'CAPS_LOCK', label: 'Caps Lock' },
			{ value: 'A' },
			{ value: 'S' },
			{ value: 'D' },
			{ value: 'F' },
			{ value: 'G' },
			{ value: 'H' },
			{ value: 'J' },
			{ value: 'K' },
			{ value: 'L' },
			{ value: 'SEMICOLON', label: ';' },
			{ value: 'QUOTE', label: "'" },
			{ value: 'ENTER', label: 'Enter', size: 2 },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ value: "" },
			{ label: '4', value: 'KEYPAD_FOUR' },
			{ label: '5', value: 'KEYPAD_FIVE' },
			{ label: '6', value: 'KEYPAD_SIX' }
		],
		[
			{ label: 'Shift', value: 'LEFT_SHIFT', size: 2 },
			{ value: 'Z' },
			{ value: 'X' },
			{ value: 'C' },
			{ value: 'V' },
			{ value: 'B' },
			{ value: 'N' },
			{ value: 'M' },
			{ value: 'COMMA', label: ',' },
			{ value: 'PERIOD', label: '.' },
			{ value: 'FORWARD_SLASH', label: '/' },
			{ value: 'RIGHT_SHIFT', label: 'Shift', size: 2 },
			{ value: "" },
			{ value: "" },
			{ label: '\u2191', value: 'UP_ARROW' },
			{ value: "" },
			{ value: "" },
			{ label: '1', value: 'KEYPAD_ONE' },
			{ label: '2', value: 'KEYPAD_TWO' },
			{ label: '3', value: 'KEYPAD_THREE' },
			{ label: "Enter", value: 'KEYPAD_ENTER', height: 2 }
		],
		[
			{ label: 'Ctrl', value: 'LEFT_CONTROL' },
			{ value: 'LEFT_GUI', label: 'Win' },
			{ value: 'LEFT_ALT', label: 'Alt' },
			{ value: 'SPACEBAR', label: 'Space', size: 8 },
			{ value: 'RIGHT_ALT', label: 'Alt' },
			{ value: 'RIGHT_GUI', label: 'Menu' },
			{ value: 'RIGHT_CONTROL', label: 'Ctrl' },
			{ value: "" },
			{ label: '\u2190', value: 'LEFT_ARROW' },
			{ label: '\u2193', value: 'DOWN_ARROW' },
			{ label: '\u2192', value: 'RIGHT_ARROW' },
			{ value: "" },
			{ label: "0", value: 'KEYPAD_ZERO', size: 2 },
			{ label: '.', value: 'KEYPAD_PERIOD' }]
	];

	const getButton = (keyboardButton: Key): ButtonDTO => {
		return {
			label: keyboardButton.label || keyboardButton.value,
			action: keyboardButton.value
		}
	}

	const keypress = (type: string, action: string) => {
		if (type === "start") {
			setCurrentlyPressed([...currentlyPressed, action]);
		} else {
			setCurrentlyPressed(currentlyPressed.filter((key) => key !== action));
		}
	}

	useEffect(() => {
		if (currentlyPressed.length > 0) {
			const action = currentlyPressed.join("+");
			actionCallback("keyboard", "start", "keyboard", action);
		} else {
			actionCallback("keyboard", "end", "keyboard", "");
		}
	}, [currentlyPressed]);

	const getKey = (rowIndex: number, keyIndex: number, key: Key) => {
		let height = 1;
		let size = 1;
		let isBlank = true;

		if (key.value !== "") {
			height = key.height || 1;
			size = key.size || 1;
			isBlank = false
		}

		return (
			<div style={{ gridColumn: `span ${size}`, gridRow: `${rowIndex + 1} / ${rowIndex + 1 + height}` }} key={rowIndex + "-" + keyIndex} >
				{isBlank ? null : <Button label={key.label || key.value} button={getButton(key)} actionCallback={keypress} />}
			</div>
		);
	}

	return (
		<div className={`KeyboardTray${IsVisible ? " Show" : ""}`}>
			<div className="Keyboard">
				{keys.map((row, rowIndex) => (
					row.map((key, keyIndex) => (
						getKey(rowIndex, keyIndex, key)
					))
				))}
			</div>
		</div>
	);
};

export default Keyboard;
