export function playFrequency(frequency, time = 100, volume = 0.1, type = "square", fadeOut = true) {
    return new Promise((resolve) => {
        const context = getAudioContext();
        const oscillator = context.createOscillator();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        const gain = context.createGain();
        gain.gain.setValueAtTime(volume, context.currentTime);
        if (fadeOut) {
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                context.currentTime + time / 1000,
            );
        }
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            resolve();
        }, time);
    });
}

export function getAudioContext() {
    if (!context) {
        context = new (window.AudioContext || window.webkitAudioContext)();
    }
    return context;
}

let context;

export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
