function setup_pScope(pScope){
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.draw_slits(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(10);
}

function setup_layers(pScope){
  //lets us draw the whole circle background, ignoring the boundaries
  new PLayer(null, 220);

  var layer1 = new PLayer(flowers);
  layer1.mode( SWIRL(5) );
  layer1.set_boundary( 200, 1000 );

  var layer2 = new PLayer(squares, radarBackground);
  layer2.mode( RING );
  layer2.set_boundary( 0, 400 );
}

function flowers(x, y, animation, pScope){
  translate(0, 0);
  scale(animation.frame*2);
  for (var i = 0; i < 12; i++) {
    ellipse(cos(i*(360/12.0))*20, sin(i*(360/12.0))*20, 10, 10);
  }
  ellipse(0,0,5,5);
}

function radarBackground(animation, pScope){
  pScope.fill_background(200, 0, 0, 50*animation.frame)
}

function squares(x, y, animation, pScope){
  translate(0, 0);
  rect(-10,-300-animation.wave()*50,20,20);
}
