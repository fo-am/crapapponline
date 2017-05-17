/**
 * Provides requestAnimationFrame in a cross browser way.
 */
 var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
    window.setTimeout(callback, 1000/60);    };
    })();

function do_confirm() {
    return confirm("Are you sure?");
}

function get_url_parameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

// rubbish rand, but seedable
var randseed = 1;
function seeded_random() {
    var x = Math.sin(randseed++) * 10000;
    return x - Math.floor(x);
}

function connect_slider(id,fn) { 
    var _=function() {
	fn($(id).val());
    }
    // connect up stuff
    $(id).on('input', _);
    $(id).on('change', _); // IE10
}

function connect_select(id,fn) { 
    var _=function() {
	fn($(id).val());
    }
    // connect up stuff
    $(id).on('change', _); 
}

function connect_checkbox(id,fn) { 
    var _=function() {
	fn($(id).prop("checked"));
    }
    // connect up stuff
    $(id).on('change', _); // IE10
}

function update_dom(id,text) {
    $(id).html(text);
}

function update_image(id,url) {
    console.log(url);
    $(id).attr("src",url);
}

function update_options(id,arr) {
    var o = $(id)[0];
    o.options.length=0;
    for (var i=0; i<arr.length; i++) {
	o.options[i]=new Option(arr[i][0], arr[i][1], true, false);
    }
}
