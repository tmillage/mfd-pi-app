import React from 'react';

const Keyboard = ({ IsVisible }) => {
	const keys = [
		[
			{ label: 'Esc', value: 'ESCAPE' },
			{ blank: true },
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
			{ blank: true },
			{ label: "Print Screen", value: 'PRINT_SCREEN' },
			{ label: "Scroll Lock", value: 'SCROLL_LOCK' },
			{ label: "Pause", value: 'PAUSE' },
			{ blank: true },
			{ blank: true },
			{ blank: true },
			{ blank: true },
			{ blank: true }
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
			{ blank: true },
			{ label: 'Insert', value: 'INSERT' },
			{ label: 'Home', value: 'HOME' },
			{ label: 'Page Up', value: 'PAGE_UP' },
			{ blank: true },
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
			{ blank: true },
			{ value: 'DELETE', label: 'Del' },
			{ value: 'END', label: 'End' },
			{ label: 'PG DN', value: 'PAGE_DOWN' },
			{ blank: true },
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
			{ blank: true },
			{ blank: true },
			{ blank: true },
			{ blank: true },
			{ blank: true },
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
			{ blank: true },
			{ blank: true },
			{ label: '\u2191', value: 'UP_ARROW' },
			{ blank: true },
			{ blank: true },
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
			{ blank: true },
			{ label: '\u2190', value: 'LEFT_ARROW' },
			{ label: '\u2193', value: 'DOWN_ARROW' },
			{ label: '\u2192', value: 'RIGHT_ARROW' },
			{ blank: true },
			{ label: "0", value: 'KEYPAD_ZERO', size: 2 },
			{ label: '.', value: 'KEYPAD_PERIOD' }]
	];

	const getButton = (keyboardButton) => {
		return {
			TextLabel: keyboardButton.label || keyboardButton.value,
			Action: keyboardButton.value
		}
	}

	const keypress = (evt, key, type) => {
		console.log(evt);
		console.log(evt.target)
		console.log(key)
	}

	const getKey = (rowIndex, keyIndex, key) => {
		console.log(`${key.value} ${rowIndex + 1} / ${rowIndex + 1 + (key.height || 1)}`);
		return (
			(key.blank) ? (<div style={{ gridRow: rowIndex + 1 }} key={rowIndex + "-" + keyIndex}></div>) :
				<button
					key={rowIndex + "-" + keyIndex}
					style={{ gridColumn: `span ${key.size || 1}`, gridRow: `${rowIndex + 1} / ${rowIndex + 1 + (key.height || 1)}` }}
					onMouseDown={(evt) => keypress(evt, key, "start")}
					onTouchStart={(evt) => keypress(evt, key, "start")}
					onMouseUp={(evt) => keypress(evt, key, "end")}
					onTouchEnd={(evt) => keypress(evt, key, "end")}
					onMouseLeave={(evt) => keypress(evt, key, "end")}
				>
					{key.label || key.value}
				</button>
		)
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
