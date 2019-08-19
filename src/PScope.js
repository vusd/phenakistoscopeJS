import globals      from './PGlobals.js'
import PImageLoader from './PImageLoader.js'

export default class PScope{

  constructor(resolution){
    this._resolution      = resolution;
    this._output_function = function(){};
    this._image_loader    = new PImageLoader();
    this._ccapturer       = globals.ccapturer;
    this._dynamic_scale   = false;
    this._lock_scale      = false;
    this._pre_render    = function(){};
    this._post_render   = function(){};
    this._draw_slits    = false;
  }

  set_default_values(resolution){
    this._layers        = [];
    this._resolution    = resolution;
    this._wedge_size    = 1000;
    this._print         = false;
    this._capture_frame = 0;
    this._slice_count   = 20;
    this._direction     = -1; //window.CCW;
  }

  scale_for_screen(do_scale){
      do_scale = do_scale === undefined ? true : do_scale;
      if(do_scale && !this._lock_scale){
        setup_new_canvas(min(window.innerWidth, window.innerHeight), min(window.innerWidth, window.innerHeight));

        if(!this._dynamic_scale){
          window.addEventListener('resize', this.scale_for_screen.bind(this));
          this._dynamic_scale = true;
        }
      }else{
          window.removeEventListener('resize', this.scale_for_screen.bind(this));
          this._dynamic_scale = false;
      }
  }

  draw(){
    if(this._image_loader.all_images_loaded()){
      this._pre_render();
        for (var i = 0; i < this._layers.length; i++) {
          this._current_layer = i;
          push();
           this._layers[i].draw_boundaries = this._show_boundaries;
           this._output_function(this._layers[i]);
          pop();
        }
      this._post_render();
    }
  }

  render_slits(){
    if(this._draw_slits){
      push();
        rotate(-90);
        stroke(0);
        noFill();
        scale(0.5);
        rotate((360.0/this._slice_count)/2.0);
        for (var i = 0; i < this._slice_count; i++) {
          rotate(360.0/this._slice_count);
          rect(this._wedge_size - this._wedge_size/3.0, -15, this._wedge_size/3.0+50, 30);
        }
      pop();
    }
  }

  draw_disk_mask(){
    push();
      fill(255);
      stroke(0);
      strokeWeight(this.display_scale);
      beginShape();
        // Exterior part of shape, clockwise winding
        vertex(-10, -10);
        vertex(width+10, -10);
        vertex(width+10, height+10);
        vertex(-10, height+10);
        // Interior part of shape, counter-clockwise winding
        beginContour();
          var a = 360/100.0;
          var r = this._wedge_size/2 * this.display_scale;
          for(var i = 0; i < 100; ++i){
            vertex(width/2+cos(-i*a)*r, height/2+sin(-i*a)*r);
          }
        endContour();
      endShape();
    pop();
  }

  add_layer(layer){
    this._layers.push(layer);
    layer.parent_pScope = this;
  }

  output_mode(output_function){
    this._output_function = output_function;
  }

  begin_capture_if_ready(){
     if(this._capture_frame == 0){
       this._ccapturer.start();
     }
  }

  capture(){
    if(this._capture_frame < this.slice_count){
      this._ccapturer.capture(globals.canvas);
      this._capture_frame++;
    }else if(this._capture_frame >= this.slice_count){
      this._ccapturer.stop();
      this._ccapturer.save();
    }
  }

  set_direction(dir){
    this._direction = dir;
  }

  set_slice_count(slices){
    this._slice_count = slices;
  }

  draw_layer_boundaries(do_show){
    this._show_boundaries = do_show;
  }

  draw_slits(do_draw){
    this._draw_slits = do_draw;
  }

  fill_background(...color){
    this._layers[this._current_layer].fill_background(...color);
  }

  set print(do_print){
    this._print = do_print;
  }

  set pre_render(pre_render_function){
    this._pre_render = pre_render_function;
  }

  set post_render(post_render_function){
    this._post_render = post_render_function;
  }

  set print(do_print){
    this._print = do_print;
  }

  set lock_scale(do_lock){
    this._lock_scale = do_lock;
  }

  get resolution(){
    return this._resolution;
  }

  get frame(){
    return this._frame;
  }

  get slice_count(){
    return this._slice_count;
  }

  get direction(){
    return this._direction;
  }

  get print(){
    return this._print;
  }

  get display_scale(){
    return this._print ? 1 : this._resolution/(this._wedge_size+0.0);
  }

  get slice_angle(){
    return 360.0/this._slice_count;
  }

  get wedge_size(){
    return this._wedge_size;
  }

  //-------------image loading and displaying------------------
  load_image(name, file_type){
    this._image_loader.load_image(name, file_type);
  }
  load_image_sequence(name, file_type, sequence_length){
    this._image_loader.load_image_sequence(name, file_type, sequence_length);
  }

  draw_image(name, x, y){
    this._image_loader.draw_image(name, globals.p5, x, y);
  }
  draw_image_from_sequence(name, x, y, lerp){
    this._image_loader.draw_image_from_sequence(name, lerp, globals.p5, x, y);
  }
  //-----------------------------------------------------------

}
