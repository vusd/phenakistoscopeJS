function setup_pScope(pScope){
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.draw_slits(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(20);
}

function setup_layers(pScope){
  var layer1 = new PLayer(animate1, background1);
  layer1.mode( SWIRL(5) );
  layer1.set_boundary( 400, 1000 );

  var layer2 = new PLayer(animate2, background2);
  layer2.mode( RING );
  layer2.set_boundary( 0, 400 );
}



function background1(animation, pScope){
}

function animate1(x, y, animation, pScope){
  translate(0, 0);
  scale(animation.frame*2);
  for (var i = 0; i < 12; i++) {
    ellipse(cos(i*(360/12.0))*20, sin(i*(360/12.0))*20, 10, 10);
  }
  ellipse(0,0,5,5);
}


function background2(animation, pScope){
}

function animate2(x, y, animation, pScope){
  translate(0, 0);
  rect(-10,-300-animation.wave()*50,20,20);
}
