document.addEventListener('DOMContentLoaded', () => {
    if (typeof(EventSource) !== 'undefined') {
        const eventSource = new EventSource('/getTime');
        eventSource.onmessage = (ev) => {
            document.getElementById('time').innerHTML = ev.data;
        };
    } else {
        console.error('SSE not supported!');
    }
});
