import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ListOfHospitals(){

    const [latLng, setLatLng] = useState({});
    const [nameaddresses, setNameAddresses] = useState([])
    const navigate = useNavigate();
    

    useEffect(()=> {
        if ("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position.coords.latitude, position.coords.longitude);
                setLatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
              });   
        }
    },[])

    useEffect(()=> {
        if(Object.keys(latLng).length > 0){
            const geoAPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latLng.lng},${latLng.lat},5000&bias=proximity:78.44202,17.3707564&limit=20&apiKey=9e328ca95b984d3ebb06a68cfea40fdf`;
            axios.get(geoAPI).then((resp)=> {
                console.log(resp.data.features);
                setNameAddresses(resp.data.features);
                
            }
            )
        }
    },[latLng])

    const handleClick= (nameaddress) => {
        navigate(`/hospital/:${nameaddress.properties.lat}`, {state: nameaddress})
    }
 
    console.log(latLng)
    console.log(nameaddresses)
    return (
      <div style={{display: "flex", flexWrap: "wrap", padding: 50}}>
        {
            nameaddresses.map((nameaddress)=> {
                return (
                  <div key={nameaddress.properties.lat} style={{margin: 20}}>
                    <Card 
                    onClick = {()=>{handleClick(nameaddress)}}
                    sx={{ maxWidth: 345, height: 150, overflow: 'hidden', padding: 2}}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className="title"
                        >
                            {nameaddress.properties.address_line1}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {nameaddress.properties.address_line2}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
            })
        }
        
       
      </div>
    );
}