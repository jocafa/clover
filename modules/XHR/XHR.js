Clover.XHR = Clover.Primitive.beget({
	initialize: function (options) {
		this.xhr = XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('MSXML2.XMLHTTP');
		this.location = options.location || '';
		this.method = options.method || 'get';
		this.update = options.update || null;
		this.onSuccess = options.onSuccess || null;
		this.onFailure = options.onFailure || null;
		
		this.xhr.open(this.method.toUpperCase(), this.location, true);
		this.xhr.onreadystatechange = Clover.bindFunction(this.onStateChange, this);
		this.xhr.send('');
	},
	
	onStateChange: function () {
		if (this.xhr.readyState == 4) {
			if (this.xhr.status >= 200 && this.xhr.status < 300) {
				if (this.update) {
					var scripts = '';
					var text = this.xhr.responseText.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
						scripts += arguments[1] + '\n';
						return '';
					});

					var s = document.createElement('script');
					s.setAttribute('type', 'text/javascript');
					s.text = scripts;
					document.getElementsByTagName('head')[0].appendChild(s);
					document.getElementsByTagName('head')[0].removeChild(s);
					
					this.update.innerHTML = text;
				}
				
				this.onSuccess && this.onSuccess(this.xhr.responseText);
			} else {
				this.onFailure && this.onFailure(this.xhr.status);
			}
		}
	}
});

Clover.Requirement.met("XHR");