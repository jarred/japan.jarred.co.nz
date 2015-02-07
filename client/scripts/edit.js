Template.Edit.rendered = function () {
  $('.js-site-preloader').remove();
};

Template.Edit.helpers({
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

Template.Edit.events({
  'click .js-delete-item': function(event){
    if(window.confirm('Delete? Are you sure?')){
      Items.remove(this._id);
    }
  },
  'submit .js-edit-form': function(event){
    event.preventDefault();
    var $el = $(event.target);
    console.log(this._id);
    Items.update(this._id, {
      $set: {
        // category: $el.find('.js-category').val(),
        quantity: Number($el.find('.js-quantity').val()),
        long: Number($el.find('.js-long').val()),
        lat: Number($el.find('.js-lat').val())
      }
    })
  }
});
