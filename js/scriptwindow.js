(function(window) {
  'use strict';
  
  var OpenLayers = window.OpenLayers;
  
  var projection4326 = new OpenLayers.Projection('EPSG:4326');
  var projection900913 = new OpenLayers.Projection('EPSG:900913');
  
  var map = new OpenLayers.Map({
    div : 'map_canvas',
    displayProjection : projection4326, 
    projection : projection900913,
  });
  
  var osmLayer = new OpenLayers.Layer.XYZ('OSM',
  	[
      '//a.tile.openstreetmap.org/${z}/${x}/${y}.png',
      '//b.tile.openstreetmap.org/${z}/${x}/${y}.png',
      '//c.tile.openstreetmap.org/${z}/${x}/${y}.png'
    ]
  );
  var markerLayer = new OpenLayers.Layer.Vector();
  map.addLayers([osmLayer, markerLayer]);
  
  var centerPoint = new OpenLayers.LonLat(131.0853348, 32.883541)
    .transform(projection4326, projection900913);
  map.setCenter(centerPoint, 7);


  var vectorPoint = new OpenLayers.Geometry.Point(131.0853348, 32.883541);
  vectorPoint.transform(projection4326, projection900913);
  var vector = new OpenLayers.Feature.Vector(vectorPoint);
  
  markerLayer.addFeatures([vector]);
  
  // アイコンサイズの調整
  var setIconSize = function() {
    var zoom = map.getZoom();
    window.console.log(zoom);
    var styleMap = markerLayer.styleMap;
    window.console.log(styleMap);
    if (zoom < 8) {
      styleMap.styles.default.defaultStyle.pointRadius = '3px';
    }
    else if (zoom < 12) {
      styleMap.styles.default.defaultStyle.pointRadius = '24px';
    }
    else {
      styleMap.styles.default.defaultStyle.pointRadius = '128px';
    }
    markerLayer.redraw();
  };
  map.events.register('zoomend', null, setIconSize);
  setIconSize();

})(window);