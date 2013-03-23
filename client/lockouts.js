Template.lockouts.lockouts = function () {
    return lockouts.find({}, { sort: {startDate: 1}});
};
Template.lockouts.events({
  'click .delete' : function (e, t) {
    var id = e.target.id;
    Meteor.call('removeLockout', {
      id: id
    });      
  },
  'click #submit' : function (e, t) {
    Meteor.call('addLockout', { 
      startDate: t.find('#startDate').value,
      endDate: t.find('#endDate').value
    });      
  }
});

Meteor.startup(function () {
  Meteor.subscribe('Lockouts');
});
