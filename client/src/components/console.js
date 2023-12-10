import { Component, createRef } from "react";

class Console extends Component {
	constructor(props) {
		super(props);

		this.el = createRef("");
	}

	state = {
		nextId: 0,
		lines: []
	}

	log = function (text) {
		var newLine = { id: this.state.nextId, data: text }
		let newLines = new Array(newLine, ...this.state.lines);
		const maxLength = this.props.max || 50;
		if (newLines.length > maxLength) {
			newLines.length = maxLength;
		}

		this.setState({
			nextId: this.state.nextId + 1,
			lines: newLines
		});
	}

	render = function () {
		console.log("render")
		return (
			<div ref={this.el} className="console">
				<div className="mfdLabel">{this.props.label || ""}</div>
				<div
					className="mfdOutput"
				>
					{this.state.lines.map((line, index) => {
						return (<div key={line.id} className={line.id} >{line.data}</div>);
					})}
				</div>
			</div >
		)
	}

	componentDidUpdate = () => {
		console.log("component did update");
		const lines = this.el.current.querySelectorAll(".mfdOutput > div");
		console.log(lines);
		const second = lines[1]
		if (second) {
			second.classList.add("second");
			console.log(second)
			setTimeout(() => {
				console.log("timout");
				if (second) {
					console.log("removing class")
					second.classList.remove("second");
				}
			}, 100);
		}
		//this.el.current.scrollTop = this.el.current.scrollHeight
	}
}

export { Console };