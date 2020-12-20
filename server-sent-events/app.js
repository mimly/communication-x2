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
//########## S E R V E R - S E N T   E V E N T S ########
//#######################################################

const getTime = () => {
    const pad = (number) => {
        return ('0' + number).substr(-2);
    };
    const date = new Date();
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

app.get('/getTime', (req, res) => {
    res.set('content-type', 'text/event-stream');

    setInterval(() => {
        res.write(`data: ${getTime()}\r\n\r\n`);
    }, 1000);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
