document.addEventListener("keydown", event => {
  if (!gameInterval) { return } // no events, if game is over or paused

  switch (event.keyCode) {
    case DOWN:
      moveDown();
      break;
    case LEFT:
      moveHorizontal(MOVE_LEFT);
      break;
    case RIGHT:
      moveHorizontal(MOVE_RIGHT);
      break;
    case PAUSE:
      pauseGame();
      break;
    default:
      break;
  }
});