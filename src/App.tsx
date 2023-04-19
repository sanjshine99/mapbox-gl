import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import AvatarImage from "./Avatar.png";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_TOKEN";

export const TrackingWebView: React.FC = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [
    messengerMarker,
    setMessengerMarker
  ] = useState<mapboxgl.Marker | null>(null);
  const [receiverMarker, setReceiverMarker] = useState<mapboxgl.Marker | null>(
    null
  );
  const [messengerLocation, setMessengerLocation] = useState<
    [number, number] | null
  >(null);
  const [receiverLocation, setReceiverLocation] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map-container", // ID of the div element
      style: "mapbox://styles/mapbox/streets-v11", // Mapbox style
      center: [80.7718, 7.8731], // Center coordinates of Sri Lanka
      zoom: 14 // Initial zoom level
    });
    setMap(map);

    // Clean up the map on unmount
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Create a new DOM element for the 'Avatar' image
  const avatarEl = document.createElement("div");
  avatarEl.className = "avatar-marker";
  avatarEl.style.backgroundImage = `url(${AvatarImage})`;
  avatarEl.style.width = "48px";
  avatarEl.style.height = "48px";
  avatarEl.style.borderRadius = "50%";
  avatarEl.style.overflow = "hidden";
  avatarEl.style.backgroundSize = "cover";
  avatarEl.style.backgroundPosition = "center center";

  useEffect(() => {
    // Update messenger location on the map
    if (map && messengerLocation) {
      if (!messengerMarker) {
        // If messenger marker doesn't exist, create a new marker and add it to the map
        const newMessengerMarker = new mapboxgl.Marker(avatarEl)
          .setLngLat(messengerLocation)
          .addTo(map);
        setMessengerMarker(newMessengerMarker);
      } else {
        // If messenger marker exists, update its location
        messengerMarker.setLngLat(messengerLocation);
      }
    }
  }, [map, messengerLocation]);

  useEffect(() => {
    // Update receiver location on the map
    if (map && receiverLocation) {
      if (!receiverMarker) {
        // If receiver marker doesn't exist, create a new marker and add it to the map
        const newReceiverMarker = new mapboxgl.Marker({ color: "red" })
          .setLngLat(receiverLocation)
          .addTo(map);
        setReceiverMarker(newReceiverMarker);
      } else {
        // If receiver marker exists, update its location
        receiverMarker.setLngLat(receiverLocation);
      }
    }
  }, [map, receiverLocation]);

  useEffect(() => {
    // Fetch and update location data every 5 seconds
    const intervalId = setInterval(() => {
      // Replace with actual API calls to fetch messenger and receiver location data from your backend
      // Update the state with fetched location data
      setMessengerLocation([80.7718, 7.8731]); // Placeholder for messenger location data
      setReceiverLocation([81.0, 6.9271]); // Placeholder for receiver location data
    }, 5000); // Fetch location data every 5 seconds

    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Fit map bounds to include all markers
    if (map && messengerLocation && receiverLocation) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(messengerLocation)
        .extend(receiverLocation);
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [map, messengerLocation, receiverLocation]);

  return (
    <Grid item xs={12} md={6}>
      <Box id="map-container" style={{ width: "100%", height: "100vh" }}>
        {/* Render the map container element */}
      </Box>
    </Grid>
  );
};
