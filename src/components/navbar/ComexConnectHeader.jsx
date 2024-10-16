import ccLogo from "../images/ccLogo.png"
import { useNavigate } from "react-router-dom";

const ComexConnectHeader = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return (
    <>
      <div onClick={handleClick} className="select-none ml-3 flex flex-row justify-center items-center gap-1 ">
        <img className="w-16 drop-shadow-md" src={ccLogo} />
        <h1 className="text-2xl invisible sm:visible font-semibold font-roboto-slab drop-shadow-lg">
          COMEX CONNECT
        </h1>
      </div>
    </>
  );
};

export default ComexConnectHeader;
