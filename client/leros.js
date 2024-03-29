var promotions = new Meteor.Collection('promotions');
var profiles = new Meteor.Collection("profiles");
var lockouts = new Meteor.Collection('lockouts');

function setSection(id) {
  var d = document.querySelectorAll('.section');
  // alert(id);
  console.log(d.length);
  for(var i = 0; i < d.length; i++) {
    console.log(d[i]);
    if(d[i].getAttribute('id') == id) {
      d[i].style.display = 'block';
    } else {
      d[i].style.display = 'none';
    }
  }
  var items = document.querySelectorAll('.nav li');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if(item.dataset['item'] == id) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }  
  }
}
var LerosRoutes = Backbone.Router.extend({
  routes: {
    '' : 'home',
    '!/lockouts' : 'lockouts',
    '!/promotions' : 'promotions',
    '!/promotions/:code/secure': 'securePromotion',
    '!/profiles/:user': 'viewProfile'
  },
  home: function () {
    setSection('home');
  },
  lockouts: function () {
    setSection('lockouts');
  },
  promotions: function () {
    setSection('promotions');
  },
  securePromotion: function (code) {
    Session.set('code', code);
    setSection('secure');
    
  },
  viewProfile: function (user) {
    setSection('profile');
    console.log('user', user);
    Session.set('viewUser', user);
    console.log(Session.get('viewUser'));
  }
});
var routers = new LerosRoutes();
Deps.autorun(function () {
  console.log('a', Session.get('viewUser'));
  console.log('Session', Session.get('viewUser'));
  Meteor.subscribe('Profiles', {owner: Session.get('viewUser')});
});
Meteor.startup(function () {
  Backbone.history.start();
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });
});

