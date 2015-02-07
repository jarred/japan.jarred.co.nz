Items         = new Meteor.Collection('items');
Categories    = new Meteor.Collection('categories');

Router.map( function () {
  this.route('add');
  this.route('edit');
  this.route('home', {
    path: '/'
  });
});

Tracker.autorun(function(computation){
  var status = Meteor.status();
  if(status.connected){
    // $('.js-site-preloader').remove();
  }
});
