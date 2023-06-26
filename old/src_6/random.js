export function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
}
export function getRandomArbitrary(min = -5, max = 5) {
  return Math.random() * (max - min) + min;
}
