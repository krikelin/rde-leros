var lockouts = new Meteor.Collection('Lockouts');

console.log(this.userId);
// Publish lockouts
Meteor.publish('Lockouts', function () {
  console.log('user id: ' + this.userId);
  return lockouts.find({owner: this.userId});
});

Meteor.methods({
  'removeLockout': function (data) {
    lockouts.remove({_id: data.id});  
  },
  'addLockout': function (data) {
    console.log(data);
    console.log('user id: ' + this.userId);
    lockouts.insert({
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      owner: this.userId
    });
  }
});

// #Permissions
lockouts.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, docs, fields, modifier) {
    return true;
  },
  remove: function (userId, docs) {
    return true;
  }
});
  
