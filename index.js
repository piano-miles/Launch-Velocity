//Assuming z is the vertical dimension, return velocity (ft/s) based on XYZ offsets (feet)
function v(x, y, z){

  //Tweakable values:

  var a = 30; //Launch angle (from ground)

  //The following below works like the zero-finding function on your TI-84. 
  //Enter a value you know the velocity can't be less than, and a value you know the velocity can't be greater than. 
  //The more precise, the faster the evaluation.
  var bMin = 15; //minnimum velocity (ft/s)
  var bMax = 50; //maximum velocity (ft/s)

  //Easily adaptable to Java, replace vars with doubles and such
  var i=0;
  while(true){
    var g   = -16.1; //half of -32.2 feet/sec^2
    var v0  = (bMin+bMax)/2; //seed, initial approx.
    var tx  = Math.sqrt(x*x+y*y); //distance along XY plane
    var vx  = v0*Math.cos((a*Math.PI)/180); //x velocity
    var vt  = Math.tan((a*Math.PI)/180); //tangent slope
    var xvx = tx/vx; //split to optimize computation time
    var ty  = g*xvx*xvx+vt*tx; //Resulting hit height
    var dev = ty-z; //How far off we are
    if(dev/Math.abs(dev)>0){ //Too high = too strong
      bMax = v0;
    }else{
      if(Math.abs(dev)<0.0000001){
        break;
      }else{
        bMin = v0;
      }
    }
    if(i>1000){
      alert("Evaluation exceeded maximum iterations (1000). Check bMin and bMax (lines 11-12)");
      break;
    }
    i++;
  }
  console.log("Reached " + Math.abs(dev) + " feet of precision");
  return v0;
}

console.log('');
console.log(v(2.646,3,1.5) + " feet/second");