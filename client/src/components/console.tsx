import React, { createRef, useEffect, RefObject } from "react";

interface ConsoleProps {
	label: string;
	display: ConsoleLine[];
}

interface ConsoleLine {
	id: string;
	data: string;
}

const Console: React.FC<ConsoleProps> = ({ label, display }) => {
	const el: RefObject<HTMLDivElement> = createRef();

	useEffect(() => {
		const lines = el.current?.querySelectorAll(".mfdOutput > div");
		const second = lines?.[1];
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
			<div className="mfdOutput">
				{display && display.map((line) => (
					<div key={line.id} className={line.id}>
						{line.data}
					</div>
				))}
			</div>
		</div>
	);
};

export { Console, ConsoleProps, ConsoleLine };