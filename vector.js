function Vector( x, y ) {
  this.x = x;
  this.y = y;

  this.setX = function(value) {
    this.x = value;
  }

  this.setY = function(value) {
    this.y = value;
  }

  this.getX = function() {
    return this.x;
  }

  this.getY = function() {
    return this.y;
  }

  this.setAngle = function(angle) {
    var length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  this.getAngle = function() {
    return Math.atan2(this.y, this.x);
  }

  this.setLength = function(length) {
    var angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  this.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  this.add = function(v2) {
    var v3 = new Vector;
    v3.setX(this.x + v2.getX());
    v3.setY(this.y + v2.getY());
    return v3;
  }

  this.subtract = function(v2) {
    var v3 = new Vector;
    v3.setX(this.x - v2.getX());
    v3.setY(this.y - v2.getY());
    return v3;
  }

  this.multiply = function(value) {
    var v3 = new Vector;
    v3.setX(this.x * value);
    v3.setY(this.y * value);
    return v3;
  }

  this.divide = function(value) {
    var v3 = new Vector;
    v3.setX(this.x / value);
    v3.setY(this.y / value);
    return v3;
  }

  this.addTo = function(v2) {
    this.x += v2.getX();
    this.y += v2.getY();
  }

  this.subtractFrom = function(v2) {
    this.x -= v2.getX();
    this.y -= v2.getY();
  }

  this.multiplyBy = function(value) {
    this.x *= value;
    this.y *= value;
  }

  this.divideBy = function(value) {
    this.x /= value;
    this.y /= value;
  }

}
