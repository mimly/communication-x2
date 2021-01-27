// function getTime({ time }) {
// or
window.getTime = ({ time }) => {
    document.getElementById('time').innerHTML = time;
};

document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:8989/getTime';
    iframe.style = 'width:0; height:0; border:0; border:none';
    document.body.append(iframe);
});
