function Shuttle( ) {

  this.deg2rad = function(angle) {
    return angle * Math.PI / 180;
  }

  this.rad2deg = function(radians) {
      return radians * (180 / Math.PI);
  }

  this.canvas = document.getElementById('shuttleCanvas');
  this.ctx = this.canvas.getContext('2d');

  this.maxX = this.canvas.width;
  this.maxY = this.canvas.height;
  this.centerX = this.maxX/2;
  this.centerY = this.maxY/2;

  this.rotateSpeed = 1;
  this.direction = 0; //angle of movement
  this.dirRadians = this.deg2rad(this.direction);
  this.attitudeAngle = this.direction;
  this.attitudeRadians = this.dirRadians;

  this.speed = 0; //velocity
  this.velocity = new Vector(0,0);
  this.velocity.setLength( this.speed );
  this.velocity.setAngle( this.dirRadians );

  this.position = new Vector(this.centerX, this.centerY);

  this.acceleration = 0;
  this.accelorationRate = .001;
  this.acceloration = new Vector(this.accelorationRate, this.accelorationRate);
  this.acceloration.setAngle(this.attitudeRadians);

  this.height = 10; //length of rocket in pixels along x axis at 0 degrees
  this.width = 20; //width of rocket in pixels along y axis at 0 degrees
  this.noseExtension = this.width / 2;
  this.fillColor = 'grey';
  this.borderColor = 'black';

  this.drawThruster = false;
  this.thrusterLength = 20;

  this.rotate = function(dir) {
    if (dir == 'right') {
      this.attitudeAngle += this.rotateSpeed;
      this.attitudeRadians = deg2rad(this.attitudeAngle);
      this.acceloration.setAngle(this.attitudeRadians);
      //this.rotateSpeed += 1;
    } else {
      this.attitudeAngle -= this.rotateSpeed;
      this.attitudeRadians = deg2rad(this.attitudeAngle);
      this.acceloration.setAngle(this.attitudeRadians);
      //this.rotateSpeed == 1;
    }
  }

  this.accelorate = function() {
    this.velocity.addTo(this.acceloration);
    this.drawThruster = true;
  }

  this.clearThruster = function() {
    this.drawThruster = false;
  }

  this.updateConsole = function() {
    //update postion
    document.getElementById("px").innerHTML = Math.round((this.position.getX() + Number.EPSILON) * 100) / 100;
    document.getElementById("py").innerHTML = Math.round((this.position.getY() + Number.EPSILON) * 100) / 100;
    document.getElementById("plength").innerHTML = Math.round((this.position.getLength() + Number.EPSILON) * 100) / 100;
    document.getElementById("pspeed").innerHTML = Math.round((this.speed + Number.EPSILON) * 100) / 100;
    document.getElementById("pangle").innerHTML = Math.round((this.position.getAngle() + Number.EPSILON) * 100) / 100;
    //update velocity
    document.getElementById("vx").innerHTML = Math.round((this.velocity.getX() + Number.EPSILON) * 100) / 100;
    document.getElementById("vy").innerHTML = Math.round((this.velocity.getY() + Number.EPSILON) * 100) / 100;
    document.getElementById("vlength").innerHTML = Math.round((this.velocity.getLength() + Number.EPSILON) * 100) / 100;
    //document.getElementById("vspeed").innerHTML = this.speed;
    document.getElementById("vangle").innerHTML = Math.round((this.velocity.getAngle() + Number.EPSILON) * 100) / 100;
    //update Acceloration
    document.getElementById("ax").innerHTML = Math.round((this.acceloration.getX() + Number.EPSILON) * 100) / 100;
    document.getElementById("ay").innerHTML = Math.round((this.acceloration.getY() + Number.EPSILON) * 100) / 100;
    document.getElementById("alength").innerHTML = Math.round((this.acceloration.getLength() + Number.EPSILON) * 100) / 100;
    //document.getElementById("vspeed").innerHTML = this.speed;
    var angle = this.rad2deg(this.acceloration.getAngle());
    document.getElementById("aangle").innerHTML = Math.round((angle + Number.EPSILON) * 100) / 100;
    //update attitudeAngle
    //document.getElementById("a2x").innerHTML = Math.round((this.velocity.getX() + Number.EPSILON) * 100) / 100;
    //document.getElementById("a2y").innerHTML = Math.round((this.velocity.getY() + Number.EPSILON) * 100) / 100;
    //document.getElementById("a2length").innerHTML = Math.round((this.velocity.getLength() + Number.EPSILON) * 100) / 100;
    //document.getElementById("vspeed").innerHTML = this.speed;
    document.getElementById("a2angle").innerHTML = Math.round((this.attitudeAngle + Number.EPSILON) * 100) / 100;
  }

  this.draw = function() {
    this.clear();

    //draw shuttle as rotated
    this.ctx.translate(this.position.getX(), this.position.getY());
    this.ctx.rotate(this.attitudeRadians);
    this.ctx.translate(-this.position.getX(), -this.position.getY());

    //draw rectangle
    this.topX = this.position.getX() - this.height / 2;
    this.topY = this.position.getY() - this.width / 2;
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.topX, this.topY, this.height, this.width);
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.strokeRect(this.topX, this.topY, this.height, this.width);

    //draw nose
    /*
    this.noseLeftX = this.topX + this.height;
    this.noseLeftY = this.topY - this.noseExtension;
    this.nosePeakX = this.noseLeftX + (this.noseExtension * 2);
    this.nosePeakY = this.position.getY();
    this.noseRightX = this.noseLeftX;
    this.noseRightY = this.noseLeftY + this.width + (this.noseExtension * 2) ;
    */

    this.noseCenterX = this.topX + this.height;
    this.noseCenterY = this.topY + (this.width / 2);
    this.noseXRadius = this.height;
    this.noseYRadius = this.width / 2;
    this.noseStartAngle = this.deg2rad(-90); //in radians
    this.noseEndAngle = this.deg2rad(90); //in radians
    //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    this.ctx.ellipse(this.noseCenterX, this.noseCenterY, this.noseXRadius, this.noseYRadius, 0, this.noseStartAngle, this.noseEndAngle);
    this.ctx.fill();
    this.ctx.stroke();
    //this.ctx.beginPath();
    //this.ctx.moveTo(this.noseLeftX, this.noseLeftY);
    //this.ctx.lineTo(this.nosePeakX, this.nosePeakY);
    //this.ctx.lineTo(this.noseRightX, this.noseRightY);
    //this.ctx.closePath();
    //this.ctx.stroke();

    //draw thruster
    if (this.drawThruster) {
      var thruster = {};
      thruster.tailX = this.topX - this.thrusterLength;
      thruster.tailY = this.position.getY();

      thruster.topLeftX = this.topX - (this.thrusterLength *.75);
      thruster.topLeftY = this.topY;
      thruster.topRightX = this.topX;
      thruster.topRightY = this.topY;
      thruster.bottomRightX = thruster.topRightX;
      thruster.bottomRightY = thruster.topRightY + this.width;
      thruster.bottomLeftX = thruster.topLeftX;
      thruster.bottomLeftY = thruster.bottomRightY;

      this.ctx.beginPath();
      this.ctx.moveTo(thruster.tailX, thruster.tailY);
      this.ctx.lineTo(thruster.topLeftX, thruster.topLeftY);
      this.ctx.lineTo(thruster.topRightX, thruster.topRightY);
      this.ctx.lineTo(thruster.bottomRightX, thruster.bottomRightY);
      this.ctx.lineTo(thruster.bottomLeftX, thruster.bottomLeftY);
      this.ctx.closePath();
      this.ctx.stroke();

    }

    this.updateConsole();

    this.position.addTo(this.velocity); //update position with velocity
  }

  this.clear = function() {
    var h = this.canvas.height;
    this.canvas.height = h;
  }

}
