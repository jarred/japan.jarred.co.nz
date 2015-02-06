Template.home.rendered = function (){
  Map.init();
  $('.js-site-preloader').remove();
}

var Map = {
  init: function(){
    var items = Items.find().fetch();
    var toner = new L.StamenTileLayer("toner");
    var map = L.map('map').setView([items[0].lat, items[0].long], 17);
    map.addLayer(toner)
    _.each(items, function(item){
      var category = Categories.findOne(item.category);
      console.log(category);
      var icon = L.divIcon({
        className: 'map-item',
        html: "<div class=\"map-emoji twa-" + category.name + "\"></div>"
      });
      L.marker([item.lat, item.long], {icon: icon}).addTo(map)
    });
  }
};
