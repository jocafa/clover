new Clover.Requirement({
	require: 'Color',
	thenDo: function () {
		Clover.Paper = Clover.Primitive.beget({
			initialize: function (options) {
				options = options || {};
				this.element = options.element;
			},

			mode: (/IE/.test(Clover.browser)) ? 'vml' : 'svg',

			colors: {
				/*
				colorName: {
					r: 0 - 255,
					g: 0 - 255,
					b: 0 - 255
				}
				*/
			},

			gradients: {
				/*
				gradientName: {
					type: 'linear' | 'radial',
					from: {x: n, y: n},
					to: {x: n, y: n},
					circle: {x: n, y: n, r: n},
					focus: {x: n, y: n},
					stops: [
						0:   {r: n, g: n, b: n},
						0.5: {r: n, g: n, b: n},
						1:   {r: n, g: n, b: n}
					]
				}
				*/
			},

			createBaseElement: function () {
				// creates the svg or vml element within the container

				if (this.mode == 'vml') {
				} else {
				}
			},

			calcBezier: function (o) {
			},

			clear: function () {
				// deletes all children of the base element
			},

			addListenersToShape: function (o) {
			},

			drawLine: function (o) {
			},

			drawPolyLine: function (o) {
			},

			drawBezier: function (o) {
				// draws a bezier spline
			},

			drawOval: function (o) {
			},

			drawCircle: function (o) {
			},

			drawRectangle: function (o) {
			},

			drawSquare: function (o) {
			},

			drawPolygon: function (o) {
			},

			drawArc: function (o) {
				// draws a pie slice
			},

			drawShape: function (o) {
				// draws a shape with curves
				// svg: built-in
				// vml: lots of points
			},

			drawImage: function (o) {
			}
		});

		Clover.Requirement.met("Paper");
	}
});
