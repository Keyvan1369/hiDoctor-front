import { AccountCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Link } from "react-router-dom";
import marker from "../../../../assets/mapMarker.png";
import style from "./map.module.scss";

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [0, 0],
  iconSize: [32, 45],
  iconAnchor: [16, 45],
});

const Map = ({ doctors, center, className, zoom }) => {
  return (
    <div>
      <MapContainer
        className={`${style.map} ${className}`}
        center={center || [52.51714, 13.389037]}
        zoom={zoom || 12}
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
            icon={myIcon}
          >
            <Popup>
              <div className={style.popup}>
                <AccountCircle></AccountCircle>
                <strong>{item.fullName}</strong>
                <span>{item.setting.expertise.title}</span>
                <Link
                  style={{ gridColumn: "2/3" }}
                  to={`/patient/reserve/${item._id}`}
                >
                  <Button size="small">Reserve</Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
