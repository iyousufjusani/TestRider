import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo, useEffect, useState } from "react";
import { Libraries } from "../../types";

type Props = {};
const libraries: Libraries = ["places", "geometry"];

const Index: React.FC<Props> = () => {
  const [corrdinates, setCorrdinates] = useState<GeolocationCoordinates>();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    libraries: libraries,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCorrdinates(coords);
    });
  }, []);

  if (isLoaded && corrdinates) {
    return (
      <GoogleMap
        center={{ lat: corrdinates?.latitude, lng: corrdinates?.longitude }}
        zoom={16}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          zIndex: 999,
        }}
      />
    );
  }
  return <div>{loadError?.message}</div>;
};

export default memo(Index);
