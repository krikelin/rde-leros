var promotions = new Meteor.Collection('Promotions');
Template.promotions.submissions = function () {
    return promotions.find({promotionDate: null, rejectedDate: null}, { sort: {submissionDate: -1}});
};
Template.promotions.promotions = function () {
    return promotions.find({promotionDate: {$ne: null}, rejectedDate: null}, { sort: {promotionDate: -1}});
};
Template.promotions.rejected = function () {
    return promotions.find({rejectedDate: {$ne: null}}, { sort: {promotionDate: -1}});
};
Template.secure.code = function () {
    return Session.get('code');
};
Template.secure.events({
    'click .secure': function (e, t) {
      console.log('a');
      Meteor.call('securePromotion', {
        code: e.target.id
      }); 
      
    },
    'click .reject': function (e, t) {
      console.log('a');
      Meteor.call('rejectPromotion', {
        code: e.target.id
      }); 
    }
});
Template.promotions.events({
  'click .delete' : function (e, t) {
    var id = e.target.id;
    Meteor.call('removePromotion', {
      id: id
    });      
  },
  'click .delete-p' : function (e, t) {
    var id = e.target.id;
    Meteor.call('removePromotion', {
      id: id
    });      
  },
  'click .secure' : function (e, t) {
    var id = e.target.id;
    Meteor.call('securePromotion', {
      id: id
    });      
  },
  'click #submit' : function (e, t) {
    var submissionDate = t.find('#submissionDate').value.length > 0 ? new Date(t.find('#submissionDate').value) : new Date();
    var promotionDate = t.find('#promotionDate').value.length > 0 ? new Date(t.find('#promotionDate').value) : null;
    console.log(submissionDate, promotionDate);
    var data = { 
      submissionDate: submissionDate,
      promotionDate: promotionDate,
      name: t.find('#name').value,
      description: t.find('#description').value,
      price: parseFloat(t.find('#price').value),
      code: t.find('#code').value
    };
    console.log(data);
    Meteor.call('submitPromotion', data);      
  }
});

Meteor.startup(function () {
  Meteor.subscribe('Promotions');
});
