function Grid( width, height, color ) {
  this.canvas = document.getElementById('gridCanvas');
  this.ctx = this.canvas.getContext('2d');

  this.maxX = this.canvas.width;
  this.maxY = this.canvas.height;
  this.centerX = this.maxX/2;
  this.centerY = this.maxY/2;
  this.boxWidth = width;
  this.boxHeight = height;
  this.lineColor = color;
  this.lineWidth = 1;

  this.draw = function() {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.beginPath();

    var x = 0;
    var y = 0;

    //draw horizontal lines
    while(x <= this.maxX) {
      this.ctx.moveTo(x,y);
      this.ctx.lineTo(x,this.maxY);
      x += this.boxWidth;
    }

    x = 0;

    //draw vertical lines
    while(y <= this.maxY) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(this.maxX, y);
      y += this.boxHeight;
    }
    this.ctx.stroke();

    //draw small circle at the center
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, 5, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.lineColor;
    this.ctx.fill();
  }

  this.clear = function() {
    var h = this.canvas.height;
    this.canvas.height = h;
  }

}
