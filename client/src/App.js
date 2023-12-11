import React, { Component } from 'react';
import { MFD, DefaultMFD } from './components/mfd';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		app: {
		},
		Left: {
			position: 'mfd-left',
			background: 'STARCITIZEN_WHITE.png',
			labels: ["Pin 1", "Pin 2", "Pin 3", "Unlock", "", "Hstl Near", "Exit Seat", "Wipe Helmet", "Gimbal", "", "Cheer", "Clap", "Point", "Salute", "Wave", "", "", "", "", "Frnd Near", "Hstl+", "Hstl-", "", "Drop", "Cntr+", "Cntr-", "Frnd+", "Frnd-"]
		},
		Right: {
			position: 'mfd-right',
			background: 'STARCITIZEN_WHITE.png',
			labels: ["Acpt", "Dcln", "", "Reset Head", "Head Track", "Cycl Cfg", "VTOL", "Lights", " ATC ", "Auto Land", "Gear", "Flt Rdy", "Eng Pwr", "Shld Pwr", "Wep Pwr", "Reset", "Load 3", "Load 2", "Load 1", "Cam", "Ping-", "Ping+", "Open", "Close", "Lock", "Unlck", "FOV+", "FOV-"]
		}
	};

	componentDidMount() {
		this.setTime();
		window.addEventListener("touchstart", function onFirstTouch() {
			document.addEventListener('contextmenu', event => event.preventDefault());

			window.removeEventListener("touchstart", onFirstTouch, false);
		}, false);
	}

	getApp() {
		const app = fetch("/MFD/1")
			.then((value) => { return value });
		console.log(app);
		return app;
	}

	runCommand = async (app, cmd) => {
		fetch(`/send?app=${app}&cmd=${cmd}`);
	}

	padZero = function (n) {
		if (n <= 9)
			return '0' + n;
		return n;
	}

	setTime = function () {
		const callback = function () {
			var el = document.getElementById('time');
			var now = new Date();
			if (el != null) {
				el.innerHTML = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
				setTimeout(callback, 60000 - 1000 * now.getSeconds() - now.getMilliseconds())
			} else {
				setTimeout(callback, 100)
			}
		}
		callback();
	}

	swap = async function () {
		/*const response = await fetch("/MFD/1");
		console.log(response);

		const data = await response.json();
		
		console.log(data);

		const app = eval(data);
		console.log(app)*/
		const response = await fetch("/MFD/1")
			.then((response) => response.json())
			.then(data => {
				console.log(data)
				console.log(data.name)
				this.setState({ app: data })
				this.leftMfd.setMFD(data.pannels[0]);
				this.rightMfd.setMFD(data.pannels[1]);
			})
			.catch((error) => console.log(error))
		/*console.log(this.state.app.pannels);
		if (this.leftMfd && this.leftMfd.setMFD) {
			this.leftMfd.setMFD(this.state.app.pannels[0]);
			this.rightMfd.setMFD(this.state.app.pannels[1]);
		}*/
	}

	render() {
		console.log("app render called")

		return (
			<div className='App'>
				<div className='Header'><button style={{ fontSize: "48px" }} onClick={() => { this.swap() }}>swap</button></div>
				<div className='Content'>
					<div className='mfdPannel'>
						<MFD ref={mfd => this.leftMfd = mfd} mfd={DefaultMFD()} id="left" />
					</div>
					<div id="clock" className='clockPannel'>
						<div id="time"></div>
					</div>
					<div className='mfdPannel'>
						<MFD ref={mfd => this.rightMfd = mfd} mfd={DefaultMFD()} id="right" />
					</div>
				</div>
			</div >
		)
	}
}

export default App;