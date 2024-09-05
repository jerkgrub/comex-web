import ccLogo from "../images/ccLogo.png"

const ComexConnectHeader = () => {
  return (
    <>
      <div className="pointer-events-none select-none ml-3 flex flex-row justify-center items-center gap-1 ">
        <img className="w-16 drop-shadow-md" src={ccLogo} />
        <h1 className="text-2xl invisible sm:visible font-semibold font-roboto-slab drop-shadow-lg">
          COMEX CONNECT
        </h1>
      </div>
    </>
  );
};

export default ComexConnectHeader;
