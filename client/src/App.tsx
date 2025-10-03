import React, { useState, useEffect } from 'react';
import { MFD, DefaultMFD } from './components/mfd';
import { ConsoleLine } from "./components/console";
import useWebSocket from 'react-use-websocket';
import './App.css';
import Keyboard from './components/keyboard';
import { ApplicationDTO, PanelDTO, PanelSetDTO } from 'shared/DTO';
import { ConsoleMessage } from 'shared/console-message';
import { WebSocketResponse } from 'shared/web-socket-response';

const App = function () {
	const [nextId, setNextid] = useState<number>(2);
    const [consoles, setConsoles] = useState<[ConsoleLine[], ConsoleLine[]]>([[{id:1,data:""}], [{id:1,data:""}]])
	const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);
    const [panelSets, setPanelSets] = useState<PanelSetDTO[]>([])

	const ws_url = 'ws://localhost:5000';
	const { sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocket>(ws_url, {
		onOpen: () => {
			console.log('websocket connected')
			getApp().then(r => {});
		},
        onMessage: (event) => {
            const response = JSON.parse(event.data) as WebSocketResponse;
            console.log("message received:")
            console.log(response);
            
            switch (response.type) {
                case "application" :
                    const application: ApplicationDTO = response.data as ApplicationDTO;
                    setApp(application);
                    setPanelSets(application.panelSets);
                    setMfds([application.panels[0], application.panels[1]]);
                    break;
                case "consoleMessage":
                    //todo: i broke this with my dto changes. will need to come up with a new solution
                    const consoleMessage = response.data as ConsoleMessage;
                    const consoleId = consoleMessage.consoleId;
                    const console = consoles[consoleId];
                    if (console) {
                        const newConsole = [{ id: nextId, data: consoleMessage.message }, ...console];
                        if (newConsole.length > 20) {
                            newConsole.length = 20;
                        }
                        consoles[consoleId] = newConsole;
                        setNextid(n => n + 1);
                        setConsoles(consoles);
                    }
                    break;
                default:
            }
        }
	});

	const defaultMFD = DefaultMFD();

	const [app, setApp] = useState<ApplicationDTO | null>(null);
	const [mfds, setMfds] = useState<[PanelDTO, PanelDTO]>([defaultMFD, defaultMFD]);


	const getApp = async function () {
		sendJsonMessage({ type: "getApp", data: { name: "star-citizen" } });
	}

	const getMfdByLabel = function (label:string) {
		if (app == null) return DefaultMFD();
		console.log(`getMfdByLabel: ${label}`)
		console.log(app.panels)
		return app.panels.find(p => p.label === label) || DefaultMFD();
	}

	const actionCallback = function (mfd: string, type: string, action: string, data: any) {
		if (action === "") {
			return;
		}
		console.log(`actionCallback: ${mfd} ${type} ${action} ${data}`);
		sendJsonMessage({ type: "action", data: { mfd: mfd, type: type, action: action, data: data } });
	}

	const setTime = function () {
		const callback = function () {
			var el = document.getElementById('time');
			var el2 = document.getElementById('date');
			if (el != null && el2 != null) {
				let now = new Date();
				el.innerHTML = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
				el2.innerHTML = now.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
				setTimeout(callback, 60000 - 1000 * now.getSeconds() - now.getMilliseconds())
			} else {
				setTimeout(callback, 100)
			}
		}
		callback();
	}

	const switchTo = async function (left: string, right: string) {
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
		window.addEventListener("touchstart", function onFirstTouch():void {
			document.addEventListener('contextmenu', event => event.preventDefault());

			window.removeEventListener("touchstart", onFirstTouch, false);
		}, false);
	}, [])

	const eventNotinKeyboard = function (evt: React.MouseEvent<HTMLDivElement>) {
		let el:HTMLElement | null = null;
        if(evt.target instanceof HTMLElement) {
            el = evt.target as HTMLElement;
        }
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
				<button onClick={() => setKeyboardIsVisible(!keyboardIsVisible)}>Keyboard</button>
                {panelSets.map((panel, index) => (
                    <button onClick={() => switchTo(panel.panels[0], panel.panels[1])}>{panel.label}</button>
                ))}
			</div>
			<div className='Content'>
				<div className='mfdPannelLeft'>
					<MFD mfd={mfds[0]} consoleId={0} consoles={consoles} actionCallback={actionCallback} />
				</div>
				<div id="clock" className='clockPannel'>
					<div id="time"></div>
					<div id="date"></div>
					<button onClick={() => pull()}>Update from GitHub</button>
				</div>ri
				<div className='mfdPannelRight'>
					<MFD mfd={mfds[1]} consoleId={1} consoles={consoles} actionCallback={actionCallback} />
				</div>
			</div>

			{app !== null ? <Keyboard IsVisible={keyboardIsVisible} actionCallback={actionCallback} /> : null}
		</div >
	)
}

export default App;