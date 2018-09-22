import * as outputs   from "./POutputFunctions.js"
import * as animation from "./PAnimationFunctions.js"
import PLayer from "./PLayer.js"

export const setup_window_constants = function(pScope){

  window.PLayer             = PLayer;

  window.SYMBOL_ONLY        = outputs.output_symbol_only(pScope);
  window.STATIC_FRAME       = outputs.output_still_frame(pScope);
  window.ANIMATED_FRAME     = outputs.output_animated_frame(pScope);
  window.STATIC_DISK        = outputs.output_still_disk(pScope);
  window.ANIMATED_DISK      = outputs.output_animated_disk(pScope);
  window.OUTPUT_GIF         = outputs.output_save_gif(pScope);
  window.OUTPUT_PRINT       = outputs.output_save_print(pScope);

  window.SWIRL              = animation.animate_swirl(pScope);
  window.RING               = animation.animate_ring(pScope);

  window.CW                 = 1;
  window.CCW                = -1;

  window.A4                 = {x:2480, y:3508};
  window.A3                 = {x:3508, y:2480*2}

}
