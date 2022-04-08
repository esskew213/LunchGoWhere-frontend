import React, { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({ loaded: false, lat: "", lng: "" });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinate: {
        lat: location.coordinate.latitude,
        lng: location.coordinate.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      }),
        [];
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};
