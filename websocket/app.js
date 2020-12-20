const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 8989;

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

//#######################################################
//########## W E B S O C K E T ##########################
//#######################################################

const getTime = () => {
    const pad = (number) => {
        return ('0' + number).substr(-2);
    };
    const date = new Date();
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

app.ws('/getTime', (ws, req) => {
    ws.on('message', (msg) => {
        if (msg === 'get current time, now!') {
            ws.send(getTime());
        }
    });

    setInterval(() => {
        ws.send(getTime());
    }, 3000);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
