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
//########## A J A X   P O L L I N G ####################
//#######################################################

const getTime = () => {
    const pad = (number) => {
        return ('0' + number).substr(-2);
    };
    const date = new Date();
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

let payload = getTime();
setInterval(() => {
    payload = getTime();
}, 3000);

app.get('/getTime', (req, res) => {
    res.json({ time: payload });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
