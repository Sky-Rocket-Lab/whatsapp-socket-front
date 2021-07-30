import "./App.css";
import { useState, useEffect } from "react";
import { socket, config } from "./services/socket";
import axios from "axios";

function App() {
	const [qr, setQr] = useState("");
	const [isAuthed, setIsAuthed] = useState(false);

	const handleMessage = (msg) => console.log(msg);

	useEffect(() => {
		socket.emit("wp-connect", []);

		socket.on("message", (msg) => handleMessage(msg));

		socket.on("ready", (msg) => handleMessage(msg));

		socket.on("qr", (qr) => setQr(qr));

		socket.on("connected", () => {
			console.log("user connected into the server");
		});

		socket.on("authenticated", ({ sessionToken }) => {
			window.sessionStorage.setItem(
				"wpSessionToken",
				JSON.stringify(sessionToken)
			);

			setIsAuthed(true);

			socket.emit("save-session", {
				idAsesor: 1,
				session: sessionToken,
			});

			console.log(
				"user authenticated",
				window.sessionStorage.getItem("wpSessionToken")
			);
		});

		socket.on("session-failed", (msg) => {
			console.error(msg);
		});

		socket.on("session-saved", (msg) => {
			console.log(msg);
		});

		return function cleanUp() {
			socket.disconnect();
		};
	}, []);

	const sendMessage = () => {
		const numbers = [573007778958, 573044197396];

		const sessionToken = JSON.parse(
			window.sessionStorage.getItem("wpSessionToken")
		);

		if (sessionToken) console.log("session token exist");

		let data = {
			number: numbers[1],
			message: "Hello client! want some bitcoins?",
			sessionToken,
		};

		debugger;

		axios({
			method: "post",
			url: `${config.serverDomain}api/message`,
			data,
		});

		// fetch(`${config.serverDomain}/send-message`, {
		// 	method: "POST", // *GET, POST, PUT, DELETE, etc.
		// 	mode: "cors", // no-cors, *cors, same-origin
		// 	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		// 	credentials: "same-origin", // include, *same-origin, omit
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	redirect: "follow", // manual, *follow, error
		// 	referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// 	body: JSON.stringify(data), //
		// });

		// socket.emit("send-message", data);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Hello wrld</h1>

				{!isAuthed && (
					<img src={qr} alt="qr code" width="200px" height="200px" />
				)}

				<button onClick={sendMessage}>send message</button>
			</header>
		</div>
	);
}

export default App;
