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
		if (app == null) return DefaultMFD();
		console.log(`getMfdByLabel: ${label}`)
		console.log(app.pannels)
		return app.pannels.find(p => p.Label === label) || DefaultMFD();
	}

	const actionCallback = function (mfd, type, action, data) {
		if (action === "") {
			return;
		}
		console.log(`actionCallback: ${mfd} ${type} ${action} ${data}`);
		sendJsonMessage({ type: "action", data: { mfd: mfd, type: type, action: action, data: data } });
	}

	useEffect(() => {
		const type = lastJsonMessage?.type;
		const data = lastJsonMessage?.data;

		switch (type) {
			case "app":
				setApp(data);
				setMfds([data.pannels[0], data.pannels[1]]);
				break;
			case "actionResponse":
				console.log(data)
				console.log(data.mfd)
				const mfd = getMfdByLabel(data.mfd);
				if (mfd.Display) {
					const newDisplay = [{ id: nextId, data: data.response }, ...mfd.Display];
					if (newDisplay.length > 20) {
						newDisplay.length = 20;
					}
					mfd.Display = newDisplay;
					setNextid(n => n + 1);
					setApp({ ...app });
				}
				break;
			default:
		}
	}, [lastJsonMessage]);

	const setTime = function () {
		const callback = function () {
			var el = document.getElementById('time');
			var el2 = document.getElementById('date');
			if (el != null && el2 != null) {
				var now = new Date();
				el.innerHTML = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
				el2.innerHTML = now.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
				setTimeout(callback, 60000 - 1000 * now.getSeconds() - now.getMilliseconds())
			} else {
				setTimeout(callback, 100)
			}
		}
		callback();
	}

	const switchTo = async function (left, right) {
		console.log(`switchTo: ${left} ${right}`);
		setMfds([getMfdByLabel(left), getMfdByLabel(right)]);
	}

	const pull = async function () {
		sendJsonMessage({ type: "pull", data: {} });

		setTimeout(() => {
			window.location.reload();
		}, 10000);
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
				<div className='mfdPannelLeft'>
					<MFD mfd={mfds[0]} id="left" actionCallback={actionCallback} />
				</div>
				<div id="clock" className='clockPannel'>
					<div id="time"></div>
					<div id="date"></div>
					<button onClick={() => pull()}>Update from GitHub</button>
				</div>ri
				<div className='mfdPannelRight'>
					<MFD mfd={mfds[1]} id="right" actionCallback={actionCallback} />
				</div>
			</div>

			{app !== null ? <Keyboard IsVisible={keyboardIsVisible} actionCallback={actionCallback} /> : null}
		</div >
	)
}

export default App;