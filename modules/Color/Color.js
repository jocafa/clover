Clover.Color = Clover.Primitive.beget({
	initialize: function (options) {
		options = options || {};
		this.r = options.r || 0;
		this.g = options.g || 0;
		this.b = options.b || 0;

		this.h = options.h || 0;
		this.s = options.s || 0;
		this.l = options.l || 0;
	},

	toHex: function () {
		var R = parseInt(this.r, 16),
			G = parseInt(this.g, 16),
			B = parseInt(this.b, 16);

		R = (R.length == 1 ? '0' + R : R);
		G = (G.length == 1 ? '0' + G : G);
		B = (B.length == 1 ? '0' + B : B);
	}
});

Clover.Requirement.met("Color");
