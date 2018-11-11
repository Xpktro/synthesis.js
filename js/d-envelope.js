function attack() {
  return (document.getElementById('attack').value / 100) * 2;
}
function release() {
  return (document.getElementById('release').value / 100) * 2;
}

function envelope() {
  const context = new AudioContext();

  const oscillator = context.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 0;

  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 10000;
  filter.Q.value = 0;

  const amplitude = context.createGain();
  amplitude.gain.value = 0;

  oscillator.connect(filter);
  filter.connect(amplitude);
  amplitude.connect(context.destination);

  oscillator.start();

  log('Playing...');

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

    amplitude.gain.cancelScheduledValues(0);
    amplitude.gain.linearRampToValueAtTime(1, context.currentTime + attack());

    log('Oscillator frequency: ' + oscillator.frequency.value + 'Hz');
    log('Key: ' + event.key);
  };

  document.onkeyup = function(event) {
    amplitude.gain.cancelScheduledValues(0);
    amplitude.gain.setValueAtTime(amplitude.gain.value, context.currentTime);
    amplitude.gain.linearRampToValueAtTime(0, context.currentTime + release());
  };

  document.getElementById('cutoff').oninput = function(event) {
    filter.frequency.value = (event.target.value / 100) * 10000;
  };

  document.getElementById('resonance').oninput = function() {
    filter.Q.value = (event.target.value / 100) * 20;
  };
}