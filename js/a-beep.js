function beep() {
  const context = new AudioContext();

  const oscillator = context.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 440;

  oscillator.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 1);

  log('Oscillator frequency: ' + oscillator.frequency.value + 'Hz');
  log('---');
}