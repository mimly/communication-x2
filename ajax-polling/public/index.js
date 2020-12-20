const getTime = () => {
    fetch('/getTime')
        .then((res) => res.json())
        .then(({ time }) => {
            document.getElementById('time').innerHTML = time;
        }).catch(console.error);
};

document.addEventListener('DOMContentLoaded', () => {
    setInterval(getTime, 1000);
});
