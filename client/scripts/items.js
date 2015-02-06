Template.add.rendered = function (){
  Tracker.autorun(function(computation){
    var status = Meteor.status();
    if(status.connected){
      $('.js-site-preloader').remove();
    }
  });
}

Template.add.helpers({
  items: function(){
    var items = Items.find().fetch();
    _.each(items, function(item){
      var category = Categories.findOne(item.category)
      item.category_name = category.name
    });
    return items;
  },
  categories: Categories.find()
});

Template.add.events({
  'submit form': function(e){
    e.preventDefault();
    if($('.js-category').val() === null){
      return;
    }
    navigator.geolocation.getCurrentPosition(function (position){
      data = {
        category: $('.js-category').val(),
        quantity: $('.js-quantity').val(),
        long: position.coords.longitude,
        lat: position.coords.latitude
      };
      console.log(data);
      Items.insert(data, function(error, _id){
        console.log(arguments);
        alert('saved!');
      });
    });
  },
  'change .js-category': function(e){
    var $el = $(e.target);
    if($el.val() === 'new'){
      var category = window.prompt('what is it?');
      if(category){
        Categories.insert({
          name: category
        }, function(error, _id){
          $('.js-category').val(_id);
          $('.js-quantity').focus();
        });
      }
    }else{
      $('.js-quantity').focus();
    }
  }
});
