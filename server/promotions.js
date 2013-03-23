var promotions = new Meteor.Collection('Promotions');

// #Permissions
promotions.allow({
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
  

console.log(this.userId);
// Publish lockouts
Meteor.publish('Promotions', function () {
  console.log('user id: 2' + this.userId);
  return promotions.find({owner: this.userId}, {sort: {submissionDate: -1, promotionDate: -1}});
});

Meteor.methods({
  'removePromotion': function (data) {
    promotions.remove({_id: data.id, owner: this.userId});  
  },
  'securePromotion': function(data) {
    console.log("Securing promotion " + data);
    promotions.update({code: data.code}, {$set: {promotionDate: new Date()}});
    var promotion = promotions.findOne({code: data.code});
    var user = Meteor.users.findOne({_id: promotion.owner});
    var email = user.emails[0].address;
    console.log(user);
    console.log(email);
    Email.send({
      from: 'noreply@leros.meteor.com',
      to: email,
      subject: data.code + ' promotion is now secured',
      text: 'Contugratelations! Your promotion ' + data.code + ' is now secured and is on way to delivery!'
    });
    
  },
  'rejectPromotion': function (data) {
    promotions.update({code: data.code}, {$set: {rejectedDate: new Date()}}); 
    var promotion = promotions.findOne({code: data.code});
    var user = Meteor.users.findOne({_id: promotion.owner});
    var email = user.emails[0].address;
    console.log(email);
    Email.send({
      from: 'noreply@leros.meteor.com',
      to: email,
      subject: 'We\'re sorry that promotion ' + data.code + 'has been rejected.',
      text: 'We are sad to say that your promotion proposal ' + data.code + ' could not be secured.'
    });
    
  },
  'submitPromotion': function (data) {
    console.log(data);
    console.log('user id: ' + this.userId);
    promotions.insert({
      name: data.name,
      description: data.description,
      price: data.price,
      submissionDate: data.submissionDate,
      promotionDate: data.promotionDate,
      rejectedDate: null,
      owner: this.userId,
      code: data.code
    });
  }
});
