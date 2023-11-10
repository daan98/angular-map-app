import { LngLat, Marker } from "mapbox-gl";

export default interface MarkerInterface {
    color       : string;
    marker      : Marker;
    coordinates : LngLat
}