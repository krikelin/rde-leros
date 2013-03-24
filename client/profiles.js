Template.profile.profile = function () {
	return _profile = profiles.findOne({owner: Session.get('viewUser')});
};
Template.profile.promotions = function () {
	var promos =  promotions.find({owner: Session.get('viewUser'), promotionDate: {$ne: null}});
	console.log(promos);
	return promos;
};
