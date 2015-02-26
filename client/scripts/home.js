Meteor.startup(function(){
    Mapbox.load();
});

Template.Home.helpers({
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

Template.Home.rendered = function () {
  this.autorun(function () {
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = 'pk.eyJ1IjoiamFycmVkIiwiYSI6ImhGcFIwRXMifQ.Gnlr8HDrlR7NlDhUY081lA';
      var map = L.mapbox.map('map', 'jarred.l57oo794');
      $('.js-site-preloader').remove();
      var items = Items.find().fetch();
      console.log('items', items);
      if(items.length === 0){
        return;
      }
      var lastItem = items[items.length - 1]
      map.setView([lastItem.lat, lastItem.long], 13);
      _.each(items, function(item){
        var category = Categories.findOne(item.category);
        console.log(item);
        var icon = L.divIcon({
          className: 'map-item',
          html: "<div class=\"map-emoji twa-" + category.name + "\"></div>"
        });
        if(item.lat !== undefined){
          L.marker([item.lat, item.long], {icon: icon}).addTo(map)
        }else{
          L.marker([item.position.lat, item.position.long], {icon: icon}).addTo(map)
        }
      });
    }
  });
};
