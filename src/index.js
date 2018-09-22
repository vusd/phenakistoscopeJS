import PScope from './PScope.js'
import globals from './PGlobals.js'
import {setup_window_constants} from "./PWindowConstants.js"

// const sketch = (p) => {

let p = new p5();

window.setup = function() {
  angleMode(DEGREES);
  imageMode(CENTER);
  frameRate(24);
  pixelDensity(1);

  globals.ccapturer = new CCapture( { format: 'gif', workersPath:'./libraries/', framerate:24, verbose:true } );
  globals.phenakistoscope = new PScope(1000);
  setup_window_constants(globals.phenakistoscope);
  setup_new_canvas(globals.phenakistoscope.resolution, globals.phenakistoscope.resolution);
  setup_pScope(globals.phenakistoscope);
}

window.draw = function() {
  background(255);
  globals.phenakistoscope.draw();
}

window.setup_new_canvas = function(width, height){
    globals.p5 = p;
    globals.gfx = createCanvas(width, height).drawingContext;
    globals.canvas = globals.gfx.canvas;

    let new_size = Math.min(width, height);
    globals.phenakistoscope.set_default_values(new_size*0.9);
    setup_layers(globals.phenakistoscope);
}
