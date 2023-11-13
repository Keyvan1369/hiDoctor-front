import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import style from "./map.module.scss";
import { AccountCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Map = ({ doctors ,center,className,zoom}) => {
  return (
    <div>
      <MapContainer
        className={`${style.map} ${className}`}
        center={center || [52.51714, 13.389037]}
        zoom={zoom||12}
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
                <Link style={{ gridColumn: "2/3" }} to={`/patient/reserve/${item._id}`}>
                  <Button  size="small">
                    Reserve
                  </Button>
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
