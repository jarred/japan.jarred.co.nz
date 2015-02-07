Template.Add.rendered = function (){
  $('.js-site-preloader').remove();
}

Meteor.startup(function (){
  if (navigator.geolocation) {
  }else{
    alert('you need to use safari');
  }
});

Template.Add.helpers({
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

Template.Add.events({
  'click .js-use-location': function(e){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function (position){
        $('.js-lat').val(position.coords.latitude);
        $('.js-long').val(position.coords.longitude);
      });
    }else{
      alert('your browser doesn\'t support geolocation. Try safari.');
    }
  },
  'submit form': function(e){
    e.preventDefault();
    if($('.js-category').val() === null){
      return;
    }
    data = {
      category: $('.js-category').val(),
      quantity: Number($('.js-quantity').val()),
      long: Number($('.js-long').val()),
      lat: Number($('.js-lat').val())
    };
    Items.insert(data, function(error, _id){
      window.location.pathname = '/';
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
