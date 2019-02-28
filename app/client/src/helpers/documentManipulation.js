export function animateStartButtonOnClick() {
    const startButton = document.getElementById('start-button');
    const start = document.getElementById('start-title');
    startButton.style.textShadow =
        '2px 2px 1px rgba(0,0,0,.4), 0 0 20px rgb(86, 176, 255), 0 0 40px #08f, 0 0 50px #08f, 0 0 100px #08f';
    startButton.style.boxShadow =
        '2px 2px 1px rgba(0,0,0,.4), inset 2px 2px 1px rgba(0,0,0,.4), 0 0 20px #08f, inset 0 0 20px #08f';

    start.animate(
        [
            { transform: 'rotate(360deg) scale(1)' },
            { transform: 'rotate(0deg) scale(1.05)' }
        ],
        {
            easing: 'ease-in',
            iterations: Infinity,
            duration: 900
        }
    );
}
