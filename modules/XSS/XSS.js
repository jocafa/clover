Clover.XSS = Clover.Primitive.beget({
	initialize: function (o) {
		this.gateway = o.gateway;
	},

	send: function (o) {
		var count = ++Clover.XSS.cb.count;
		var cb = o.callback || function () {};
		var cbk = 'XSSCB' + count;
		var query = ['XSSCallback=Clover.XSS.cb.' + cbk];
		var loc = this.gateway + '?';

		if (o.data) {
			for (var k in o.data) if (o.data.hasOwnProperty(k)) {
				query.push(k + '=' + o.data[k]);
			}
		}

		Clover.addJS(loc + query.join('&'), cbk);

		Clover.XSS.cb[cbk] = function (response) {
			cb(response);

			//cleanup
			window.setTimeout(function () {
				var s = document.getElementById(cbk);
				s.parentNode.removeChild(s);
			}, 0);
		}
	}
});

Clover.XSS.cb = {};
Clover.XSS.cb.count = 0;

Clover.Requirement.met('XSS');
