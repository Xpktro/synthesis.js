function notes() {
  const context = new AudioContext();

  const oscillator = context.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 0;

  oscillator.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 10);

  log('Playing...');
  log('---');

  const NOTES = {
    1: 60,
    2: 62,
    3: 64,
    4: 65,
    5: 67,
    6: 69,
    7: 71,
    8: 72
  };

  document.onkeydown = function(event) {
    oscillator.frequency.value = piano2Hz(NOTES[event.key] || 60);
    log('Oscillator frequency: ' + oscillator.frequency.value + 'Hz');
    log('Key: ' + event.key);
  };
}