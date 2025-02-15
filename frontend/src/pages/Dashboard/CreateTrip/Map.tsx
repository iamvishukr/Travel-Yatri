import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import icon from "../Images/icon.png";
import icon from "../../../assets/icon.png"
import L from "leaflet";

interface ICords {
    latitude: string,
    longitude: string   
}
export default function Map({ coords , display_name }: {coords: ICords, display_name: string}) {
  const { latitude, longitude } = coords;
console.log(coords, display_name, ">>>>> props of Map")
  const customIcon = new L.Icon({//creating a custom icon to use in Marker
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView([+latitude, +longitude], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <MapContainer
      className="map"
      center={[+latitude, +longitude]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customIcon} position={[+latitude, +longitude]}>
        <Popup>{display_name ?? "jhjhhj"}</Popup>
      </Marker>
      <MapView />
    </MapContainer>
  );
}