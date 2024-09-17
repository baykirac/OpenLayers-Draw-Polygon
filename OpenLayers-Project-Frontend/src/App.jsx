import "./App.css";
import "../node_modules/ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Draw, Modify, Snap } from "ol/interaction.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { Feature } from "ol";
import { Polygon } from "ol/geom";
import { get, fromLonLat, toLonLat } from "ol/proj.js";
import { React, useEffect, useState, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
function App() {
  const [visible, setVisible] = useState(false);
  const [map, setMap] = useState(null);
  const [newPolygonId, setNewPolygonId] = useState("");
  const [newPolygonName, setNewPolygonName] = useState("");
  const [isadd, setIsAdd] = useState(false);
  const [newCoordinates, setNewCoordinates] = useState(null);
  const [newSnap, setNewSnap] = useState(null);
  const [dummyData, setDummyData] = useState([]);


  const items = [
    {
      label: "Add Drawing",
      icon: "pi pi-pencil",
      command: (event) => {
        addInteractions(event);
      },
    },
    {
      label: "Query Drawing",
      icon: "pi pi-server",
      command: (event) => {
        source.removeFeatures();
      },
    },
  ];

  const mapRef = useRef();

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

  let draw, vectorLayer, vectorSource;

  function addInteractions() {
    draw = new Draw({
      source: source,
      type: "Polygon",
    });

    map.addInteraction(draw);
    draw.on("drawend", function (event) {
      setVisible(true);
      var geometry = event.feature.getGeometry();

      var coordinates = geometry.getCoordinates();

      var wgs84Coordinates = coordinates[0].map(function (coord) {
        return ol.proj.transform(coord, "EPSG:3857", "EPSG:4326");
      });
      setNewCoordinates(wgs84Coordinates);
      //const snap = new Snap({ source: source });
      //setNewSnap(snap);
    });
  }
  useEffect(() => {
    vectorSource = new VectorSource();

    // Create features from dummy data
    dummyData.forEach((polygon) => {
      const feature = new Feature({
        geometry: new Polygon([
          polygon.coordinates.map((coord) => fromLonLat(coord)),
        ]),
      });
      feature.setProperties({ name: polygon.name, id: polygon.id });
      vectorSource.addFeature(feature);
    });

    vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map2 = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([35.866287, 38.925533]),
        zoom: 6,
      }),
    });
    setMap(map2);
    return () => map2.setTarget(undefined);
  }, [dummyData]);
 

  return (
    <>
      <div className="card">
        <Menubar model={items} />
      </div>
      <div id="map" className="map"></div>
      <Dialog
        header="Add New Polygon"
        visible={visible}
        position="top"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <label style={{ marginRight: "50px" }}>Id: </label>
        <InputText
          value={newPolygonId}
          onChange={(e) => setNewPolygonId(e.target.value)}
        />
        <br />
        <br />
        <label style={{ marginRight: "20px" }}>Name: </label>
        <InputText
          value={newPolygonName}
          onChange={(e) => setNewPolygonName(e.target.value)}
        />
        <br />
        <br />
        <Button
          label="Add"
          icon="pi pi-plus"
          style={{ marginLeft: "100px" }}
          onClick={() => {
            //map.addInteraction(newSnap);
            const newPolygon = {
              id: newPolygonId,
              name: newPolygonName,
              coordinates: newCoordinates,
            };
            setDummyData(prevPolygons => [...prevPolygons, newPolygon]);
            console.log(dummyData);
          }}
        />
      </Dialog>
    </>
  );
}

export default App;
