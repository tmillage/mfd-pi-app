import React, { useState, useEffect } from 'react';
import { MFD, DefaultMFD } from './components/mfd';
import io from 'socket.io-client';
import './App.css';

const App = function () {
	const defaultMFD = DefaultMFD();

	const [app, setApp] = useState(null);
	const [leftMfd, setLeftMfd] = useState(defaultMFD);
	const [rightMfd, setRightMfd] = useState(defaultMFD);


	const getApp = async function () {
		const app = fetch("/MFD/1")
			.then((response) => response.json())
			.then(data => {
				setApp(data);
				return data;
			})
		return app;
	}

	const runCommand = async (app, cmd) => {
		fetch(`/send?app=${app}&cmd=${cmd}`);
	}

	const padZero = function (n) {
		if (n <= 9)
			return '0' + n;
		return n;
	}

	const setTime = function () {
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

	const swap = async function () {
		getApp()
			.then(data => {
				setLeftMfd(data.pannels[0]);
				setRightMfd(data.pannels[1]);
			})
			.catch((error) => console.log(error))

	}

	useEffect(() => {
		if (!app || !app.curent) {
			getApp()
				.then(data => {
					setLeftMfd(data.pannels[1]);
					setRightMfd(data.pannels[0]);
				})
		}
		setTime();
		window.addEventListener("touchstart", function onFirstTouch() {
			document.addEventListener('contextmenu', event => event.preventDefault());

			window.removeEventListener("touchstart", onFirstTouch, false);
		}, false);
	}, [])


	return (
		<div className='App'>
			<div className='Header'><button style={{ fontSize: "48px" }} onClick={swap}>swap</button></div>
			<div className='Content'>
				<div className='mfdPannel'>
					<MFD mfd={leftMfd} id="left" />
				</div>
				<div id="clock" className='clockPannel'>
					<div id="time"></div>
				</div>ri
				<div className='mfdPannel'>
					<MFD mfd={rightMfd} id="right" />
				</div>
			</div>
		</div >
	)
}

export default App;