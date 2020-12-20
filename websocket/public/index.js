document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('ws://localhost:8989/getTime');

    socket.onopen = (ev) => {
        console.log('Connection established');

        document.getElementById('button').addEventListener('click', (ev) => {
            socket.send('get current time, now!');
        });

    };

    socket.onmessage = (ev) => {
        console.log(`Data received from server: ${ev.data}`);
        document.getElementById('time').innerText = ev.data;
    };

    socket.onclose = (ev) => {
        if (ev.wasClean) {
            console.log(`Connection closed cleanly, code=${ev.code} reason=${ev.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('Connection died');
        }
    };

    socket.onerror = (ev) => {
        console.error(`${ev.message}`);
    };
});
