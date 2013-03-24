profiles.allow({
	insert: function (userId, doc) {
	    console.log("FG");
	    return (userId && doc.owner = userId);
  	},
	 update: function (userId, docs, fields, modifier) {
		return userId;
	},
	remove: function (userId, docs) {
		return userId;
	}
});

Meteor.publish('Profiles', function(params) {
	console.log('subscribing to Profiles');
	console.log(params.owner);
	var profile = profiles.find({owner: params.owner});
	var _promotions = promotions.find({owner: params.owner, promotionDate: {$ne: null}});
	console.log(_promotions.count());
	var result = [
		profile,
		_promotions
	];
	console.log(result);
	return result;
});


Meteor.methods({
	'getProfile': function (username) {
		return profiles.find({owner: username});
	}
});