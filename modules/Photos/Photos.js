new Clover.Requirement({
	require: 'FlickrAPI',
	thenDo: function () {
		Clover.Photos = Clover.Primitive.beget({
			initialize: function (options) {
			}
		});
		
		Clover.Requirement.met('Photos');
	}
});