import { createRef, useEffect } from "react";

const Console = ({ label, display }) => {
	const el = createRef();

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
	}, [display, el]);

	return (
		<div ref={el} className="console">
			<div className="mfdLabel">{label || ""}</div>
			<div
				className="mfdOutput"
			>
				{display && display.map((line) => {
					return (<div key={line.id} className={line.id} >{line.data}</div>);
				})}
			</div>
		</div >
	)
}

export { Console };