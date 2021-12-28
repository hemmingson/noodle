let animeId, count = -1, timer;
const { log: L } = console;

const tick = () => {
  count++;

  animeId = requestAnimationFrame(tick);
}
tick();

timer = setTimeout(() => {
  cancelAnimationFrame(animeId);

  L(count);
  clearTimeout(timer)
}, 1000)