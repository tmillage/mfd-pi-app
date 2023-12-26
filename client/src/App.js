import React, { useState, useEffect } from 'react';
import { MFD, DefaultMFD } from './components/mfd';
import useWebSocket from 'react-use-websocket';
import './App.css';
import Keyboard from './components/keyboard';

const App = function () {
	const [nextId, setNextid] = useState(2);
	const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

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

	const getMfdByLabel = function (label) {
		console.log(`getMfdByLabel: ${label}`)
		console.log(app.pannels)
		return app.pannels.find(p => p.Label === label) || DefaultMFD();
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
				console.log(data)
				console.log(data.mfd)
				const mfd = getMfdByLabel(data.mfd);
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

	const switchTo = async function (left, right) {
		console.log(`switchTo: ${left} ${right}`);
		console.log(getMfdByLabel(left));
		console.log(getMfdByLabel(right));
		setMfds([getMfdByLabel(left), getMfdByLabel(right)]);
	}

	useEffect(() => {
		setTime();
		window.addEventListener("touchstart", function onFirstTouch() {
			document.addEventListener('contextmenu', event => event.preventDefault());

			window.removeEventListener("touchstart", onFirstTouch, false);
		}, false);
	}, [])

	const eventNotinKeyboard = function (evt) {
		let el = evt.target;
		while (el) {
			if (el.classList.contains('Keyboard')) {
				return false;
			}
			el = el.parentElement;
		}
		return true;
	}


	return (
		<div className='App' onClick={(evt) => { keyboardIsVisible && eventNotinKeyboard(evt) && setKeyboardIsVisible(false) }}>
			<div className='Header'>
				<button style={{ fontSize: "48px" }} onClick={() => setKeyboardIsVisible(!keyboardIsVisible)}>Keyboard</button>
				<button style={{ fontSize: "48px" }} onClick={() => switchTo("Targeting", "Flight")}>Flight</button>
				<button style={{ fontSize: "48px" }} onClick={() => switchTo("Emotes", "On Foot")}>On Foot</button>
				<button style={{ fontSize: "48px" }} onClick={() => switchTo("Salvage", "Gimble")}>Salvage</button>
			</div>
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

			<Keyboard IsVisible={keyboardIsVisible} />
		</div >
	)
}

export default App;