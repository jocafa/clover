Clover.XSLT = Clover.Primitive.beget({
	initialize: function (options) {
		this.xmlUrl = options.xmlUrl;
		this.xsltUrl = options.xsltUrl;
		this.callback = options.callback || function () {};
	},

	transform: function () {
		if (document.recalc) { // Internet Explorer
			var cb = this.callback;
			var stateChanged = function () {
				var c = 'complete';
				if (xmlNode.readyState == 'complete'  && xsltNode.readyState == 'complete') {
					var xmlNode2 = xmlNode,
						xsltNode2 = xsltNode;
					window.setTimeout(function () {
						alert('timeout');
						cb(xmlNode2.transformNode(xsltNode2.XMLDocument));
						alert('called callback');
					}, 500);
				}
			};

			var xmlNode = document.createElement('xml');
			xmlNode.onreadystatechange = stateChanged;
			xmlNode.src = this.xmlUrl;

			var xsltNode = document.createElement('xml');
			xsltNode.onreadystatechange = stateChanged;
			xsltNode.src = this.xsltUrl;

			document.body.appendChild(xmlNode);
			document.body.appendChild(xsltNode);

		} else { // Sane Browsers
			var xmlRequest = new XMLHttpRequest(),
				xsltRequest = new XMLHttpRequest(),
				cb = this.callback;

			var stateChanged = function () {
				if (xmlRequest.responseXML && xsltRequest.responseXML) {
					var proc = new XSLTProcessor();
					var xmlDoc = xmlRequest.responseXML;
					var xsltSheet = xsltRequest.responseXML;

					proc.importStylesheet(xsltSheet.documentElement);
					var transformed = proc.transformToFragment(xmlDoc, document);
					cb(transformed.childNodes[0].nodeValue);
				}
			};

			xmlRequest.onreadystatechange = stateChanged;
			xmlRequest.open('GET', this.xmlUrl);
			xmlRequest.send(null);

			xsltRequest.onreadystatechange = stateChanged;
			xsltRequest.open('GET', this.xsltUrl);
			xsltRequest.send(null);
		}
	}
});

Clover.Requirement.met('XSLT');
