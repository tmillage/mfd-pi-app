import React, { Component } from 'react';
import logo from './logo.svg';
import MFD from './components/mfd';
import './App.css';

class App extends Component {
	state = {
		app: require(`./applications/star-citizen.json`),
		Left: {
			position: 'mfd-left',
			background: 'STARCITIZEN_WHITE.png',
			labels: ["Pin 1", "Pin 2","Pin 3","Unlock","", "Hstl Near", "Exit Seat", "Wipe Helmet", "Gimbal", "","Cheer","Clap", "Point", "Salute", "Wave", "", "", "", "", "Frnd Near", "Hstl+", "Hstl-", "", "Drop", "Cntr+", "Cntr-", "Frnd+", "Frnd-"]
		},
		Right: {
			position: 'mfd-right',
			background: 'STARCITIZEN_WHITE.png',
			labels: ["Acpt", "Dcln","","Reset Head","Head Track", "Cycl Cfg", "VTOL", "Lights", " ATC ", "Auto Land","Gear","Flt Rdy", "Eng Pwr", "Shld Pwr", "Wep Pwr", "Reset", "Load 3", "Load 2", "Load 1", "Cam", "Ping-", "Ping+", "Open", "Close", "Lock", "Unlck", "FOV+", "FOV-"]
		}
	};

	componentDidMount() {
		this.setTime();
		this.setState()
		//document.addEventListener('contextmenu', event => event.preventDefault());

	}

	runCommand = async (app, cmd) => {
		fetch(`/send?app=${app}&cmd=${cmd}`);
	}
	
	padZero = function(n) {
		if( n<=9 )
			return '0' + n;
		return n;
	}
	
	setTime = function() {
		const callback = function() {
			var el = document.getElementById('time');
			var el2 = document.getElementById('date');
			var now = new Date();
			if(el != null) {
				el.innerHTML = now.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
				el2.innerHTML = now.toLocaleDateString([], {weekday: 'short', month: 'short', day: 'numeric'});
				setTimeout(callback, 60000 - 1000*now.getSeconds() - now.getMilliseconds())
			} else {
				setTimeout(callback, 100)
			}
		}
		callback();
	}

	render() {
		const app = this.state.app;

		return (
			<div className='App'>
				
				{app.pannels.map(function(pannel, index) {
					return (
					<MFD
						key={index}
						app={app.name}
						position={pannel.position}
						background={pannel.background}
						buttons={pannel.buttons}
						mfd={pannel}
						left = "25px"
						bottom = "25px"
					/>)
				})}
				<div id="clock" >
					<div id="time"></div>
					<div id="date"></div>
				</div>
			</div>
		)
	}
}

export default App;