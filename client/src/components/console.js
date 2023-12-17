import { forwardRef, useState, createRef, useEffect, useImperativeHandle } from "react";

const ConsoleFunction = function (props, ref) {
	const el = createRef();
	const [lines, setLines] = useState([])
	const [nextId, setNextid] = useState(0);

	useImperativeHandle(ref, () => {
		console.log("useImperativeHandle")
		return {
			log(text) {
				var newLine = { id: nextId, data: text }
				let newLines = [newLine, ...lines];
				const maxLength = props.max || 20;
				if (newLines.length > maxLength) {
					newLines.length = maxLength;
				}

				setLines(newLines);
				setNextid(n => n + 1);
			}
		}
	}, [lines, nextId, props.max]);

	useEffect(() => {
		const lines = el.current.querySelectorAll(".mfdOutput > div");
		const second = lines[1]
		if (second) {
			second.classList.add("second");
			setTimeout(() => {
				if (second) {
					second.classList.remove("second");
				}
			}, 100);
		}
	}, [lines, el]);

	return (
		<div ref={el} className="console">
			<div className="mfdLabel">{props.label || ""}</div>
			<div
				className="mfdOutput"
			>
				{lines.map((line) => {
					return (<div key={line.id} className={line.id} >{line.data}</div>);
				})}
			</div>
		</div >
	)
}

const Console = forwardRef(ConsoleFunction);

export { Console };