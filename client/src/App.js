import React, { useState, useEffect } from 'react';
import { MFD, DefaultMFD } from './components/mfd';
import useWebSocket from 'react-use-websocket';
import './App.css';

const App = function () {
	const [nextId, setNextid] = useState(2);

	const ws_url = 'ws://localhost:5000';
	const { sendJsonMessage, lastJsonMessage } = useWebSocket(ws_url, {
		onOpen: () => {
			console.log('websocket connected')
			getApp()
		},
	});

	const defaultMFD = DefaultMFD();

	const [app, setApp] = useState(null);
	const [mfds, setMfds] = useState([defaultMFD, defaultMFD]);


	const getApp = async function () {
		sendJsonMessage({ type: "getApp", data: { name: "star-citizen" } });
	}

	const getMFD = function (label) {
		return app.pannels.find(p => p.label === label);
	}

	const actionCallback = function (mfd, type, action) {
		if (action === "") {
			return;
		}
		console.log(`actionCallback: ${mfd} ${type} ${action}`);
		sendJsonMessage({ type: "action", data: { mfd: mfd, type: type, action: action } });
	}

	useEffect(() => {
		const type = lastJsonMessage?.type;
		const data = lastJsonMessage?.data;

		switch (type) {
			case "app":
				setApp(data);
				setMfds([data.pannels[1], data.pannels[0]]);
				break;
			case "actionResponse":
				const mfd = getMFD(data.mfd);
				const newDisplay = [{ id: nextId, data: data.response }, ...mfd.Display];
				if (newDisplay.length > 20) {
					newDisplay.length = 20;
				}
				mfd.Display = newDisplay;
				setNextid(n => n + 1);
				setApp({ ...app });
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
		setMfds([app.pannels[0], app.pannels[1]]);
	}

	useEffect(() => {
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
					<MFD mfd={mfds[0]} id="left" actionCallback={actionCallback} />
				</div>
				<div id="clock" className='clockPannel'>
					<div id="time"></div>
				</div>ri
				<div className='mfdPannel'>
					<MFD mfd={mfds[1]} id="right" actionCallback={actionCallback} />
				</div>
			</div>
		</div >
	)
}

export default App;