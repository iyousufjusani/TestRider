import { memo, useState } from "react";
import { Button } from "react-bootstrap";

import { theme } from "../../assets";
import { useAppDispatch } from "../../hooks";
import { signinWithProviderPopup } from "../../redux/auth/action";
import NavigoLoading from "../navigoLoading";

type Props = {
  Icon: React.FC;
  providerName: "google" | "facebook" | "apple";
  label: string;
};

const Index: React.FC<Props> = ({ Icon, providerName, label }) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const stopLoader = () => {
    setLoader(false);
  };
  const signinWithProvider = () => {
    setLoader(true);
    dispatch(signinWithProviderPopup(providerName, stopLoader));
  };
  return (
    <Button
      onClick={signinWithProvider}
      variant="outline-secondary"
      className=" w-100"
      disabled={loader}
    >
      {loader ? (
        <div className=" d-flex justify-content-center  algin-items-center ">
          <NavigoLoading
            type="bars"
            color={theme.colors.secondary}
            width={30}
            height={25}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="mx-2">
            <Icon />
          </div>
          <p>Continue with {label}</p>
        </div>
      )}
    </Button>
  );
};
export default memo(Index);
