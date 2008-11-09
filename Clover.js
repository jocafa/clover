/* Clover */
var Clover = {
	version: 1,
	path: (function () {
		var scripts = document.getElementsByTagName('script');
		var i = scripts.length;
		while (i--) {
			var script = scripts[i];
			if (/Clover/.test(script.src)) {
				return script.src.replace(/Clover.js/, '');
			}
		}
	})(),

	browser: (function () {
		if (window.opera) {
			return "Opera";
		} else if (window.ActiveXObject) {
			return "IE" + (!!(window.XMLHttpRequest) ? "7" : "6");
		} else if (!navigator.taintEnabled) {
			return "Safari";
		} else if (document.getBoxObjectFor !== null) {
			return "Firefox";
		}
	})()
};

Clover.enrich = function Clover_enrich (thing, extras) {
	for (var k in extras) thing[k] = extras[k];
	return thing;
};

Clover.bindFunction = function Clover_bindFunction (method, object) {
	return function () {
		return method.apply(object,arguments);
	};
};

/* Loadtime initialization */
Clover.addLoadCallback = function Clover_addLoadCallback (func) {
	document.addEventListener ? 
		document.addEventListener('DOMContentLoaded', func, false) :
		window.attachEvent('onload', func);
};

/* Event listener wrapper */
Clover.listen = function (element, eventType, func) {
	document.addEventListener ?
		element.addEventListener(eventType, func, false) :
		element.attachEvent('on' + eventType, func);
};

/* Class Primitive */
Clover.Primitive = function Clover_Primitive (options) { };
Clover.Primitive.prototype.initialize = 
	function Clover_Primitive_prototype_initialize () {};

Clover.Primitive.beget = function Clover_Primitive_beget (dna) {
	var classDef = function () {
		if (arguments[0] !== Clover.Primitive) {
			this.initialize.apply(this, arguments);
		}
	};

	var proto = new this(Clover.Primitive);
	var superClass = this.prototype;
	Clover.enrich(proto, dna);
	classDef.prototype = proto;
	classDef.beget = this.beget;
	classDef.prototype.superClass = superClass;

	return classDef;
};

/* Dynamic module loading */
Clover.Requirement = Clover.Primitive.beget({
	initialize: function Clover_Requirement_initialize (options) {
		this.dependencies = (typeof options.require == 'string') ? [options.require] : options.require;
		this.thenDo = options.thenDo || function () {};

		for (var i = 0; i < this.dependencies.length; i++) {
			var dep = this.dependencies[i];
			var path = Clover.path + 'modules/' + dep.replace(/\./g, '/');
			path += path.substring(path.lastIndexOf('/')) + '.js';
			
			if (! (Clover.Requirement.moduleStatus[dep] && Clover.Requirement.moduleStatus[dep] == 'ready')) {
				var s = document.createElement('script');
				s.src = path;
				document.getElementsByTagName('head')[0].appendChild(s);
				Clover.Requirement.moduleStatus[dep] = 'loading';
			}
		}

		this.dependencyCheck();
	},

	dependencyCheck: function Clover_Requirement_dependencyCheck () {
		var dependenciesLeft = false;

		for (var i = 0; i < this.dependencies.length && !dependenciesLeft; i++) {
			if (Clover.Requirement.moduleStatus[this.dependencies[i]] != 'ready') {
				dependenciesLeft = true;
			}
		}

		if (dependenciesLeft) {
			window.setTimeout(Clover.bindFunction(this.dependencyCheck, this), 10);
		} else {
			this.thenDo();
		}
	}
});

Clover.Requirement.moduleStatus = {};
Clover.Requirement.met = function Clover_Requirement_met (req) {
	Clover.Requirement.moduleStatus[req] = 'ready';
};

/* Utilities */
Clover.addJS = function (file, id) {
	var s = document.createElement('script');
	s.setAttribute('src', file);
	id && s.setAttribute('id', id);
	document.getElementsByTagName('head')[0].appendChild(s);
};

Clover.addCSS = function (file) {
	var s = document.createElement('link');
	s.setAttribute('rel', 'stylesheet');
	s.setAttribute('href', file);
	document.getElementsByTagName('head')[0].appendChild(s);
};
