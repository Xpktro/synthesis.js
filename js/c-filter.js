function filter() {
  const context = new AudioContext();

  const oscillator = context.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 0;

  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 10000;
  filter.Q.value = 0;

  oscillator.connect(filter);
  filter.connect(context.destination);

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

  document.getElementById('cutoff').oninput = function(event) {
    filter.frequency.value = (event.target.value / 100) * 10000;
  };

  document.getElementById('resonance').oninput = function() {
    filter.Q.value = (event.target.value / 100) * 20;
  };
}