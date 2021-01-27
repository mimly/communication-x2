const getTime = () => {
    fetch('/getTime')
        .then(async (res) => {
            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
              const { value } = await reader.read();
              const time = decoder.decode(value).split('\r\n\r\n')[1];
              document.getElementById('time').innerHTML = time;
            }
        }).catch(console.error);
};

document.addEventListener('DOMContentLoaded', () => {
    getTime();
});
