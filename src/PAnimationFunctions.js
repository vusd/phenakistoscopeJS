/*------------------------------------------------------------------------------
/
/   PAnimationFunctions.js
/   Ben Jack 2018
/
/   animation functions that get bound to PLayer objects - kept seperate from
/   the PLayer class for modularity. The initial layer of the function curries
/   in the relevant pScope. This initial call is done in the setup_window_constants
/   function in PWindowConstants.js
/
/*----------------------------------------------------------------------------*/

import globals from './PGlobals.js'

//double curried function
//used as follows in my_phenakistoscope.js > pScope_setup()
//layer.animation_function( SWIRL(3) )
export const animate_swirl = function(pScope){
    return function(SWIRL_DENSITY){
      //this returned anonymous function gets bound to an instance of PLayer
      //therefore 'this' refers to an instance of the PLayer class.
      return function(frame, lower_y, upper_y){
        //console.log(lower_y);
        let step = (upper_y-lower_y)/(SWIRL_DENSITY+0.0);

        this.set_animation_variables(frame/pScope.slice_count);
        this.background_function(this.animation_variables, pScope);

        for(let i = 0; i < SWIRL_DENSITY; ++i){

          let offset = i*step;
          let y_position = -(lower_y +(offset + lerp(0, step, frame/pScope.slice_count)));

          this.set_animation_variables((abs(y_position)-lower_y)/abs(upper_y-lower_y));

          push();
            translate(0, y_position);
            this.draw_function(0, 0, this.animation_variables, pScope);
          pop();
        }
      }
    }

}

export const animate_ring = function(pScope){

    //this returned anonymous function gets bound to an instance of PLayer
    //therefore 'this' refers to an instance of the PLayer class.
    return function(frame){
      push();
        this.set_animation_variables(frame/(pScope.slice_count+0.0));
        this.background_function(this.animation_variables, pScope);
        this.draw_function(0, 0, this.animation_variables, pScope);
      pop();
    }

}
