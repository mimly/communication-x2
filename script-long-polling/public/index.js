const getTime = ({ time }) => {
    document.getElementById('time').innerHTML = time;
    const script = document.createElement('script');
    script.src = 'http://localhost:8989/getTime';
    document.body.append(script);
};

document.addEventListener('DOMContentLoaded', () => {
    getTime({});
});
