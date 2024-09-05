import { Avatar } from "flowbite-react";
import FetchUserData from "./hooks/FetchUserData";

const AvatarWithName = () => {
  const user = FetchUserData();

  return (
    <>
      <Avatar rounded size="lg" />
      <h1 className="text-xl">
        {user.firstName} {user.lastName}
      </h1>
      <h2 className="text-slate-500">{localStorage.getItem("userUsertype")}</h2>
    </>
  );
};

export default AvatarWithName;
