function log(obj) {
  var element = document.getElementsByTagName('pre')[0];
  element.innerHTML += obj + '\n';
  element.scrollTop = element.scrollHeight;
}

function piano2Hz(keyNumber) {
  // https://en.wikipedia.org/wiki/MIDI_tuning_standard#Frequency_values
  return Math.pow(2, (keyNumber - 69) / 12) * 440;
}
