import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function HospitalDetails() {
  const location = useLocation();
  // console.log(location.state.properties)
  const { address_line1, address_line2, lat, lon, state, city } =
    location.state.properties;

  const [userLatLng, setUserLatLng] = useState({});
  const [userAddress, setUserAddress] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
        setUserLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);
  // console.log(userLatLng)

  useEffect(() => {
    if (Object.keys(userLatLng).length > 0) {
      const geoCodeAPI = `https://api.geoapify.com/v1/geocode/reverse?lat=${userLatLng.lat}&lon=${userLatLng.lng}&format=json&apiKey=9e328ca95b984d3ebb06a68cfea40fdf`;
      axios.get(geoCodeAPI).then((resp) => {
        // console.log(resp.data.results);
        setUserAddress(resp.data.results);
      });
    }
  }, [userLatLng]);
  // console.log(userAddress);


  useEffect(()=>{
    if (Object.keys(userLatLng).length > 0){
      console.log({lat})
      const routeAPI = `https://api.geoapify.com/v1/routing?waypoints=${userLatLng.lat},${userLatLng.lng}|${lat},${lon}&mode=drive&apiKey=9e328ca95b984d3ebb06a68cfea40fdf`;
axios.get(routeAPI).then((resp)=>{
  console.log(resp.data)
})
    }
  }, [userLatLng, lat, lon])

  return (
    <div
      style={{
        padding: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="left">
        <Card sx={{ maxWidth: 345, overflow: "hidden", padding: 2 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="title"
            >
              {address_line1}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="user-data"
            >
              <h4>User Latitude: {userLatLng.lat}</h4>
              <h4>User Longitude: {userLatLng.lng}</h4>
              <h4>
                User Formatted Address:{" "}
                {userAddress.map((address) => {
                  return <em>{address.address_line1}</em>;
                })}
              </h4>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              className="user-data"
            >
              <h4>Hospital Latitude: {lat}</h4>
              <h4>Hospital Longitude: {lon}</h4>
              <h4>Hospital Formatted Address: {address_line2}</h4>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <h4>Hospital website: null</h4>
              <h4>Hospital Email: null</h4>
              <h4>State: {state}</h4>
              <h4>City: {city}</h4>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="right">
        <Card
          sx={{ maxWidth: 345, overflow: "hidden", padding: 2 }}
        >
          <CardContent>
            <Timeline position="alternate">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{userAddress.map((address) => {
                  return <em>{address.address_line1}</em>;
                })}</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="success" />
                </TimelineSeparator>
                <TimelineContent>{address_line2}</TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}





































