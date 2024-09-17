import "./App.css";
import "../node_modules/ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Draw, Modify, Snap } from "ol/interaction.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { get, fromLonLat } from "ol/proj.js";
import { React, useEffect } from "react";

function App() {
  const raster = new TileLayer({
    source: new OSM(),
  });

  const source = new VectorSource();
  const vector = new VectorLayer({
    source: source,
    style: {
      "fill-color": "rgba(255, 255, 255, 0.2)",
      "stroke-color": "#ffcc33",
      "stroke-width": 2,
      "circle-radius": 7,
      "circle-fill-color": "#ffcc33",
    },
  });

  const extent = get("EPSG:3857").getExtent().slice();
  extent[0] += extent[0];
  extent[2] += extent[2];

  let draw, snap;

  function addInteractions(map) {
    draw = new Draw({
      source: source,
      type: "Polygon",
    });

    map.addInteraction(draw);
  
    // Çizim bittiğinde tetiklenen olay
    draw.on('drawend', function (event) {
      const polygon = event.feature.getGeometry();
      const coordinates = polygon.getCoordinates();
  
      console.log('Polygon Koordinatları:', coordinates);
    });
  
    snap = new Snap({ source: source });
    map.addInteraction(snap);
  }
  useEffect(() => {
    const map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: fromLonLat([32.8597, 39.9334]),
        zoom: 6,
        extent,
      }),
    });
    const modify = new Modify({ source: source });
    map.addInteraction(modify);

    addInteractions(map);
  });
  return (
    <>
      <div id="map" className="map"></div>
    </>
  );
}

export default App;
