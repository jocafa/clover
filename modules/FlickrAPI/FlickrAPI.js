Clover.FlickrAPI = Clover.Primitive.beget({
	initialize: function (options) {
		this.apiKey = options.apiKey;
		this.userId = options.userId;
		this.url = 'http://www.flickr.com/services/rest?';
	},

	request: function (options) {
		options.params = options.params || {};
		options.params.method = options.method || 'flickr.test.echo';
		var callbackKey = 'cb' + (new Date()).getTime();
		var params = [];
		var callback = options.callback;
		
		Clover.FlickrAPI.callbacks[callbackKey] = function (result) {
			callback(result);
			Clover.FlickrAPI.removeCallback(callbackKey);
		};
		
		options.params.jsoncallback = 'Clover.FlickrAPI.callbacks.' + callbackKey;
		options.params.user_id = this.userId;
		options.params.api_key = this.apiKey;
		options.params.format = 'json';
		for (var key in options.params) if (options.params.hasOwnProperty(key)) {
			params.push(key + '=' + encodeURIComponent(options.params[key]));
		}
		
		Clover.addJS(this.url + params.join('&'));
	},
	
	getSets: function (callback) {
		var originalCallback = callback;
		var newCallback = function (result) {
			if (result.stat == 'ok') {
				var cleanResult = [];
				var sets = result.photosets.photoset;

				for (var i = 0; i < sets.length; i++) {
					var s = sets[i];
					cleanResult.push({
						id: s.id,
						name: s.title._content,
						description: s.description._content,
						numPhotos: s.photos,
						numVideos: s.videos,
						farm: s.farm,
						server: s.server,
						secret: s.secret,
						primary: s.primary
					});
				}
				
				originalCallback(cleanResult);
			} else {
				originalCallback(null);
			}
		};
		
		this.request({
			method: 'flickr.photosets.getList',
			callback: newCallback
		});
	},
	
	getPhotosInSet: function (setId, callback) {
	},
	
	getRecentPhotos: function (callback) {
	},
	
	getPhotoDetails: function (photoId, callback) {
	}
});

Clover.FlickrAPI.callbacks = {};
Clover.FlickrAPI.removeCallback = function (callbackKey) {
	var callbackKey = callbackKey;
	window.setTimeout(function () {
		delete Clover.FlickrAPI.callbacks[callbackKey]
	}, 0);
};

Clover.Requirement.met('FlickrAPI');