const path = require('path');
const express = require('express');
const app = express();
const port = 8989;

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

//#######################################################
//########## S C R I P T   L O N G - P O L L I N G ######
//#######################################################

const getTime = () => {
    const pad = (number) => {
        return ('0' + number).substr(-2);
    };
    const date = new Date();
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

const publish = (res, payload) => {
    res.set('content-type', 'text/javascript');
    res.send(`getTime({ 'time': '${payload}' })`);
};

const subscriptions = []
const subscribe = (res) => {
    subscriptions.push(res);
};

let payload = undefined;
setInterval(() => {
    payload = getTime();
    subscriptions.forEach((res) => publish(res, payload));
    subscriptions.splice(0, subscriptions.length);
}, 3000);

app.get('/getTime', (req, res) => {
    subscribe(res);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
