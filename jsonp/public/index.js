const getTime = ({ time }) => {
    document.getElementById('time').innerHTML = time;
};

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        const script = document.createElement('script');
        script.src = 'http://localhost:8989/getTime';
        document.body.append(script);
    }, 1000);
});
