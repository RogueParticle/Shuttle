/*
function rand(randMin,randMax) {
  return Math.floor(Math.random() * (randMax - randMin + 1)) + randMin;
}
*/

/*
function d2h(d) {
  var hexString = d.toString(16);
  while (hexString.length < 6) {
    hexString = '0' + hexString;
  }
  return '#' + hexString;
}
*/

/*
function d2rgb(r,g,b){
  return 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
}
*/

function deg2rad(angle) {
  return angle * Math.PI / 180;
}

function rad2deg(radians) {
    return radians * (180 / Math.PI);
}

var grid = new Grid(100,100,'cyan');
grid.draw();

var shuttle = new Shuttle();

function drawScreen() {
  shuttle.draw();
}

var intervalValue = setInterval(drawScreen, 1);
