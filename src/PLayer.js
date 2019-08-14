import globals from "./PGlobals.js"
import {animate_ring} from "./PAnimationFunctions.js"

export default class PLayer{

  constructor(i_draw_function, background){
    this._draw_function       = i_draw_function.bind(this);

    let background_t = typeof background

    if(background_t === "function")
      this._background_function = background.bind(this);
    else if(background_t === "object"){
      this._background_function = () => this.fill_background(background)
    } else
      this._background_function = () => {}


    this._animation_function = animate_ring(globals.phenakistoscope).bind(this);
    this._do_draw_boundaries = true;
    this.set_boundary(0,1000);

    globals.phenakistoscope.add_layer(this);
  }

  set_boundary(low, high){
    this._bounds = {low: low, high: high};
  }

  set_animation_variables(frame_interp){

    let wave_func = function(wave_count){
      wave_count = wave_count === undefined ? 1 : wave_count;
      return (globals.p5.sin(frame_interp*360*wave_count)+1)/2.0;
    }

    this._animation_variables = {frame: frame_interp, wave: wave_func};
  }

  set parent_pScope(pScope){
    this._pScope = pScope;
  }

  set draw_boundaries(do_show){
    this._do_draw_boundaries = do_show;
  }

  mode(animation_function){
    this._animation_function = animation_function.bind(this);
  }

  get draw_function(){
    return this._draw_function;
  }

  get animation_function(){
    return this._animation_function;
  }

  get background_function(){
    return this._background_function;
  }

  get boundary(){
    return this._bounds;
  }

  get animation_variables(){
    return this._animation_variables;
  }

  fill_background(...args){
      fill(...args);
      stroke(...args);
      this.draw_wedge();
  }

  draw_boundry(){
    if(this._do_draw_boundaries){
      noFill();
      stroke(0);
      this.draw_wedge();
    }
  }

  draw_wedge(){
      let ARC_CW = 1;
      let ARC_CCW = -1;

      push();
        rotate(-90);
        beginShape();
          this.arc(this.boundary.high, ARC_CW);
          this.arc(this.boundary.low, ARC_CCW);
        endShape(globals.p5.CLOSE);
      pop();
  }

  arc(radius, direction){
    let ARC_RESOLUTION = 20;
    let a    = -direction * this._pScope.slice_angle/2.0;
    let step = direction * this._pScope.slice_angle/ARC_RESOLUTION;
    for(let i = 0; i <= ARC_RESOLUTION; ++i){
      vertex(cos(a)*radius, sin(a)*radius);
      a+=step;
    }
  }

}
