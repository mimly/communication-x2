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
//########## A J A X   S T R E A M I N G ################
//#######################################################

const getTime = () => {
    const pad = (number) => {
        return ('0' + number).substr(-2);
    };
    const date = new Date();
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

const publish = (res, payload) => {
    res.write('--endofsection\r\n');
    res.write(`content-type: text/html; charset=utf-8\r\n\r\n${payload}`);
};

const subscriptions = []
const subscribe = (res) => {
    subscriptions.push(res);
};

let payload = undefined;
setInterval(() => {
    payload = getTime();
    subscriptions.forEach((res) => publish(res, payload));
}, 3000);

app.get('/getTime', (req, res) => {
    res.set('content-type', 'multipart/x-mixed-replace; boundary=endofsection');
    subscribe(res);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
