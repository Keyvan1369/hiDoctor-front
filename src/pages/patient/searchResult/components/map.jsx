import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import style from "./map.module.scss";
import { AccountCircle } from "@mui/icons-material";

const Map = ({ doctors }) => {
  return (
    <div>
      <MapContainer
        className={style.map}
        center={[52.517140,13.389037]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {doctors?.map((item) => (
          <Marker
            key={item._id}
            position={[
              item.setting?.location?.lat,
              item.setting?.location?.lng,
            ]}
          >
            <Popup>
              <div className={style.popup}>
                <AccountCircle></AccountCircle>
                <strong>{item.fullName}</strong>
                <span>{item.setting.expertise.title}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
