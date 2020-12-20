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
//########## J S O N P ##################################
//#######################################################

const getTime = () => {
    const pad = (number) => {
        return ('0' + number).substr(-2);
    };
    const date = new Date();
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

app.get('/getTime', (req, res) => {
    res.set('content-type', 'text/javascript');
    res.send(`getTime({ 'time': '${getTime()}' })`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
