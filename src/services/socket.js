import io from "socket.io-client";
export const config = {
	// serverDomain: "http://34.135.191.239/",
	serverDomain: "http://localhost:8030/",
};

export const socket = io(config.serverDomain, {
	transports: ["websocket"],
	upgrade: false,
	reconnection: false,
	forceNew: true,
});
