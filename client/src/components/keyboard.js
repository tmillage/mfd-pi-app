import React from 'react';

const Keyboard = ({ IsVisible }) => {
	const keys = [
		[{ value: 'Esc' }, { value: 'F1' }, { value: 'F2' }, { value: 'F3' }, { value: 'F4' }, { value: 'F5' }, { value: 'F6' }, { value: 'F7' }, { value: 'F8' }, { value: 'F9' }, { value: 'F10' }, { value: 'F11' }, { value: 'F12' }, { value: 'Del' }, { label: 'PG UP', value: 'PGUP' }, { label: "PRT SCR", value: 'PrtScr' }, { label: "SCR LCK", value: 'ScrLck' }, { value: 'Pause' }],
		[{ value: '`' }, { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' }, { value: '9' }, { value: '0' }, { value: '-' }, { value: '=' }, { value: 'Bksp' }, { label: 'PG DN', value: 'PGDN' }, { value: 'VolUp' }, { value: 'VolDn' }, { value: 'Mute' }],
		[{ value: 'Tab' }, { value: 'Q' }, { value: 'W' }, { value: 'E' }, { value: 'R' }, { value: 'T' }, { value: 'Y' }, { value: 'U' }, { value: 'I' }, { value: 'O' }, { value: 'P' }, { value: '[' }, { value: ']' }, { value: '\\' }, { value: '' }, { value: 'Num7' }, { value: 'Num8' }, { value: 'Num9' }],
		[{ value: 'Cps Lck' }, { value: 'A' }, { value: 'S' }, { value: 'D' }, { value: 'F' }, { value: 'G' }, { value: 'H' }, { value: 'J' }, { value: 'K' }, { value: 'L' }, { value: ';' }, { value: "'" }, { value: 'Entr' }, { value: 'Home' }, { value: 'End' }, { value: 'Num4' }, { value: 'Num5' }, { value: 'Num6' }],
		[{ value: 'Shift' }, { value: 'Z' }, { value: 'X' }, { value: 'C' }, { value: 'V' }, { value: 'B' }, { value: 'N' }, { value: 'M' }, { value: ',' }, { value: '.' }, { value: '/' }, { value: 'Shift' }, { value: '' }, { value: 'Up' }, { value: '' }, { value: 'Num1' }, { value: 'Num2' }, { value: 'Num3' }],
		[{ value: 'Ins' }, { value: 'LCtrl' }, { value: 'LWin' }, { value: 'LAlt' }, { value: 'Space', size: 5 }, { value: 'RAlt' }, { value: 'Menu' }, { value: 'RCtrl' }, { value: 'Left' }, { value: 'Down' }, { value: 'Right' }, { value: 'Num0' }]
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

	return (
		<div className={`KeyboardTray${IsVisible ? " Show" : ""}`}>
			<div className="Keyboard">
				{keys.map((row, rowIndex) => (
					row.map((key, keyIndex) => (
						<button
							key={rowIndex + "-" + keyIndex}
							style={{ gridColumn: `span ${key.size || 1}` }}
							onMouseDown={(evt) => keypress(evt, key, "start")}
							onTouchStart={(evt) => keypress(evt, key, "start")}
							onMouseUp={(evt) => keypress(evt, key, "end")}
							onTouchEnd={(evt) => keypress(evt, key, "end")}
							onMouseLeave={(evt) => keypress(evt, key, "end")}
						>
							{key.label || key.value}
						</button>
					))
				))}
			</div>
		</div>
	);
};

export default Keyboard;
