/* eslint-disable react/display-name */
import { Pin } from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import style from "./selectFromMap.module.scss";
import RoomIcon from "@mui/icons-material/Room";
import { forwardRef } from "react";



const SelectFromMap = forwardRef(({ center, className, zoom },ref) => {

  console.log(center);

  return (
    <div className={style.container}>
      <MapContainer
        className={`${style.map} ${className}`}
        center={center || [52.51714, 13.389037]}
        zoom={zoom || 12}
        scrollWheelZoom={true}
        ref={ref}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <RoomIcon className={style.pin} />
    </div>
  );
});

export default SelectFromMap;
