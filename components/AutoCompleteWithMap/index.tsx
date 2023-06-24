import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import React, { memo, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaMapPin } from "react-icons/fa";
import { AddressProps } from "../../interfaces";
import MapWithAutoComplete from "../../modals/MapWithAutoComplete";
import { Libraries } from "../../types";
import { getAddress } from "../../utils/map";
const libraries: Libraries = ["places", "geometry"];

type Props = {
  onChange?: (address: AddressProps) => void;
  value?: AddressProps;
  placeholder?: string;
};
const Index: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const [showMap, setShowMap] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState("");
  const [autocomplete, setAutocomplete] = React.useState<any>(undefined);

  const onChangeHandler = async () => {
    if (autocomplete) {
      const place = await autocomplete.getPlace();

      onChange?.(getAddress(place));
    }
  };
  useEffect(() => {
    if (value?.address) {
      setInitialValue(value.address);
      return;
    }
  }, [value]);
  const onLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete);
  };

  const onHideHandler = () => {
    setShowMap(!showMap);
  };

  return (
    <>
      <LoadScriptNext
        libraries={libraries}
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}
      >
        <div>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onChangeHandler}
            restrictions={{ country: "GB" }}
          >
            <div className="password-input">
              <Form.Control
                placeholder={placeholder}
                value={initialValue}
                onChange={(e) => {
                  setInitialValue(e.target.value);
                }}
              />
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setShowMap(!showMap);
                }}
                className="btn bg-transparent"
              >
                <FaMapPin />
              </a>
            </div>
          </Autocomplete>
          {showMap && (
            <MapWithAutoComplete
              value={value}
              onChange={onChange}
              showMap={showMap}
              onClose={onHideHandler}
            />
          )}
        </div>
      </LoadScriptNext>
    </>
  );
};

export default memo(Index);
