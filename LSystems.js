'use strict';
function LSystem(rules, start, iterations) {
	for(var j=0;j<iterations;j++) {
		var step = "";
		var l = start.length;
		for(var i=0;i<start.length;i++) {
			var c = start.charAt(i);
			if(c in rules) {
				step = step + rules[c];
			} else {
				step += c;
			}
		}
		start = step;
	}
	return start;
}

function interpret(string, functions, args) {
	var stack = [];
	args.level = 0;
	for (var i = 0; i < string.length; i++) {
		var c = string.charAt(i)
		if(c in functions) {
			functions[c](args);
		} else if (c == "[") {
			args.level += 1
			stack.push(args.copy());
		} else if (c == "]") {
			args = stack.pop();
		}
	}
}