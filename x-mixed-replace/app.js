const express = require('express');
const app = express();
const port = 8989;

//#######################################################
//########## X - M I X E D - R E P L A C E ##############
//#######################################################

const getTime = () => {
    const pad = (number) => {
        return ('0' + number).substr(-2);
    };
    const date = new Date();
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

app.get('/', (req, res) => {
    res.set('content-type', 'multipart/x-mixed-replace; boundary=endofsection');

    setInterval(() => {
        const headers = 'content-type: text/html; charset=utf-8';
        const payload = `<h4>${getTime()}</h4>`;
        res.write('--endofsection\r\n');
        res.write(`${headers}\r\n\r\n${payload}`);
    }, 1000);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
