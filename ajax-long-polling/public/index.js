const getTime = () => {
    fetch('/getTime')
        .then((res) => res.json())
        .then(({ time }) => {
            document.getElementById('time').innerHTML = time;
            getTime();
        }).catch(console.error);
};

document.addEventListener('DOMContentLoaded', () => {
    getTime();
});
