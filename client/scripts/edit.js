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
  'click .js-delete-item': function(){
    if(window.confirm('Delete? Are you sure?')){
      Items.remove(this._id);
    }
  }
})
