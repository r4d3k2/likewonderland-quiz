import confetti from "canvas-confetti";

export function popConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FFD93D", "#FF8FAB", "#6BCB77", "#4D96FF", "#C780FA"],
  });
}

export function bigConfetti() {
  const end = Date.now() + 1200;
  const colors = ["#FFD93D", "#FF8FAB", "#6BCB77", "#4D96FF", "#C780FA", "#FFA94D"];
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
