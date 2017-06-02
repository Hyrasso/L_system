'use strict';
var functions, args, string, trans, sc, input, cnv, start, rules, iterations;

function setup() {
	createCanvas(innerWidth, innerHeight);

	start = "AAAA";
	rules = {"X" : "[F+F+F+F[---X-Y]+++++F++++++++F-F-F-F]",
				 "A" : "X+X+X+X+X+X+",
				 "Y" : "[F+F+F+F[---Y]+++++F++++++++F-F-F-F]"};
	iterations = 5;

	functions = {'F' : function(args) {
					var pos = args["pos"];
					var nextPos = p5.Vector.add(pos, p5.Vector.mult(args["dir"], args["distance"]));
					line(pos.x, pos.y, nextPos.x, nextPos.y);
					args["pos"] = nextPos;
				},
				 '+' : function(args) {
				 	args["dir"] = args["dir"].rotate(args.angle);
				},
				 '-' : function(args) {
				 	args["dir"] = args["dir"].rotate(-args.angle);
				}};

	string = LSystem(rules, start, iterations);
	console.log(string)
	trans = createVector(width/2, height/2);
	sc = 1;
	fill(255);
	stroke(255);
}

function draw() {
	background(51);
	translate(trans.x, trans.y);
	scale(sc);
	args = {"pos" : createVector(0, 0),
			"dir" : createVector(0, -1),
			"distance" : 20,
			"angle" : 15*PI/180,
			"copy" : function() {
				return {"pos" : this.pos.copy(),
						"dir" : this.dir.copy(),
						"distance" : this.distance,
						"angle" : this.angle,
						"copy" : this.copy}
			}
			};
	interpret(string, functions, args);
}

function mouseDragged(event) {
	if (event.srcElement.id === cnv.canvas.id) {
		trans.add(createVector(mouseX - pmouseX, mouseY - pmouseY));
	}
}

function mouseWheel(event) {
	if (event.srcElement.id === cnv.canvas.id) {
		sc += event.delta/100*sc;
		if(sc < 0)
			sc=0.0001
	}
}

function keyPressed(key) {
	if (key.key == '+' || key.char == '+') {
		sc += .1;
	} else if (key.key == '-' || key.char == '-') {
		sc -= .1;
	} else if (key.key == ' ') {
		trans = createVector(width/2, height/2);
		sc = 1;
	}
}