import React, { useState } from "react";
import Pin from "../assets/pin";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoiaXZhbi1rcmlzdGlhd2FuIiwiYSI6ImNsMWN4dHljZzA3Z2ozcHFjcnpxbDhnaTIifQ.Z7KSBghh93LRW-7aCNQzEg"; // Set your mapbox token here

export const About = (props) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [penduduk, setPenduduk] = useState({});

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xs-12 col-md-12"
            style={{
              height: "400px",
              marginTop: "50px",
            }}
          >
            <h2>LOCATION</h2>
            <Map
              initialViewState={{
                latitude: -7.864825,
                longitude: 110.320174,
                zoom: 15,
                bearing: 0,
                pitch: 0,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={TOKEN}
            >
              <GeolocateControl position="top-left" />
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />

              {props.data
                ? props.data.Location.map((d, i) => (
                    <>
                      <Marker
                        key={`marker`}
                        latitude={d.latitude}
                        longitude={d.longitude}
                        anchor="bottom"
                        onClick={(e) => {
                          // If we let the click event propagates to the map, it will immediately close the popup
                          // with `closeOnClick: true`
                          e.originalEvent.stopPropagation();
                          setPopupInfo(penduduk);
                        }}
                      >
                        <Pin />
                      </Marker>

                      {popupInfo && (
                        <Popup
                          anchor="top"
                          latitude={d.latitude}
                          longitude={d.longitude}
                          onClose={() => setPopupInfo(null)}
                        >
                          <div>{d.title}</div>
                          <a href={d.linkGoogleMaps}>Lihat</a>
                        </Popup>
                      )}
                    </>
                  ))
                : "Loading..."}
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};
