import globals from './PGlobals.js'
import { draw_x
}from "./PDrawingHelpers.js"

export const output_symbol_only = function(pScope){

    return function(layer){
      push();
        set_initial_transforms(pScope);
        layer.set_animation_variables(0);
        push();
          layer.draw_function(0, 0, pScope);
        pop();
        draw_x(0, 0, 2);
      pop();
    }

}

export const output_still_frame = function(pScope){

  return function(layer){
    push();
      set_initial_transforms(pScope);
      translate(0, pScope._wedge_size/2.0);
      layer.draw_boundry();
      layer.animation_function(0, layer.boundary.low, layer.boundary.high);
    pop();
  }

}

export const output_animated_frame = function(pScope){

  return function(layer){
    push();
      set_initial_transforms(pScope);
      translate(0, pScope._wedge_size/2.0);
      layer.draw_boundry();
      layer.animation_function(frameCount%pScope.slice_count, layer.boundary.low, layer.boundary.high);
    pop();
  }

}

export const output_still_disk = function(pScope){

    return function(layer, rotation){
      rotation = rotation === undefined ? 0 : rotation;

      push();
        set_initial_transforms(pScope);
        rotate(rotation);
        draw_disk(pScope, layer);
      pop();

      push();
        set_initial_transforms(pScope);
        pScope.render_slits();
      pop();

      push();
        pScope.draw_disk_mask();
      pop();
    }

  }


export const output_animated_disk = function(pScope){

  return function(layer){
    push();
      let frame = frameCount%pScope.slice_count;
      STATIC_DISK(layer, pScope.direction*pScope.slice_angle*frame);
    pop();
  }

}


export const output_save_gif = function(pScope){

  return function(SIZE){

    setup_new_canvas(SIZE, SIZE);
    pScope.scale_for_screen(false);
    pScope.lock_scale = true;
    pScope.pre_render  = function(){pScope.begin_capture_if_ready();}
    pScope.post_render = function(){pScope.capture();}

    return function(layer){
      ANIMATED_DISK(layer);
    }

  }

}

export const output_save_print = function(pScope){

  //double curry! this function is called like - pScope.output( PRINT(A4) );
  return function(resolution){

    let A4_300DPI = {x:2480, y:3508}
    resolution = resolution === undefined ? A4_300DPI : resolution;
    setup_new_canvas(resolution.x, resolution.y);
    pScope.scale_for_screen(false);
    pScope.lock_scale = true;

    return function(layer){
      push();
        STATIC_DISK(layer, 0);
      pop();
    }
  }

}

function set_initial_transforms(pScope){
  translate(width/2, height/2);
  scale(pScope.display_scale, pScope.display_scale);
}

function draw_wedge(pScope, layer, wedge_number){

  push();
    layer.animation_function(wedge_number, layer.boundary.low, layer.boundary.high);
  pop();
  layer.draw_boundry();

}

function draw_disk(pScope, layer){
  push();
    scale(0.5);
    let t = pScope.slice_angle;
    for (var i = 0; i < pScope.slice_count; i++) {
      push();
        rotate(i*t);
        draw_wedge(pScope, layer, i);
      pop();
    }
  pop();
}
