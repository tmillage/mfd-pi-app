import React, { useState, useEffect } from 'react';
import { MFD, DefaultMFD } from './components/mfd';
import useWebSocket from 'react-use-websocket';
import './App.css';

const App = function () {
	const ws_url = 'ws://localhost:5000';
	const { sendJsonMessage, lastJsonMessage } = useWebSocket(ws_url, {
		onOpen: () => {
			console.log('websocket connected')
			getApp()
		},
	});

	const defaultMFD = DefaultMFD();

	const [app, setApp] = useState(null);
	const [leftMfd, setLeftMfd] = useState(defaultMFD);
	const [rightMfd, setRightMfd] = useState(defaultMFD);


	const getApp = async function () {
		sendJsonMessage({ type: "getApp", data: { name: "star-citizen" } });
	}

	useEffect(() => {
		console.log(lastJsonMessage);
		switch (lastJsonMessage?.type) {
			case "app":
				setApp(lastJsonMessage.data);
				setLeftMfd(lastJsonMessage.data.pannels[1]);
				setRightMfd(lastJsonMessage.data.pannels[0]);
				break;
			default:
		}
	}, [lastJsonMessage]);

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
		setLeftMfd(app.pannels[0]);
		setRightMfd(app.pannels[1]);
	}

	useEffect(() => {
		/*if (!app || !app.curent) {
			getApp()
				.then(data => {
					setLeftMfd(data.pannels[1]);
					setRightMfd(data.pannels[0]);
				})
		}*/
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