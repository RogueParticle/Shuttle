document.body.addEventListener('keydown', function(event) {

  //const key = event.key;
  const key = event.code;

  switch ( key ) {
    case 'ArrowLeft':
      shuttle.rotate('left');
      break;
    case 'ArrowUp':
      break;
    case 'ArrowRight':
      shuttle.rotate('right');
      break;
    case 'ArrowDown':
      break;
    case 'Space':
      // increase Speed
      shuttle.accelorate();
      break;
  }
});
document.body.addEventListener('keyup', function(event) {

  const key = event.code;

  switch ( key ) {
    case 'Space':
      shuttle.clearThruster();
      break;
  }

});
