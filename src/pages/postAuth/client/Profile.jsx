import TextInput from "../../../components/inputs/TextInput";
import AvatarWithName from "../../../components/AvatarWithName";
import SelectInput from "../../../components/inputs/SelectInput";
import MobileNumberInput from "../../../components/inputs/MobileNumberInput";
import FetchUserData from "../../../components/hooks/FetchUserData";
import ProfileInfoCard from "../../../components/ProfileInfoCard";
import ButtonGeneric from "../../../components/inputs/ButtonGeneric";
import { FileBadge, Handshake, RectangleEllipsis, Settings, Trophy, UserRoundPen } from "lucide-react";

const Profile = () => {
  const user = FetchUserData();

  console.log(user.firstName);

  return (
    <div className="min-h-[91.3vh] bg-gradient-bg3 bg-cover bg-no-repeat flex flex-col justify-start items-center py-16 gap-6">
      <ProfileInfoCard />

      <div className="flex flex-col sm:flex-row">
        {/* Settings */}
        <div className=" backdrop-blur-sm p-4 rounded-lg w-max justify-center items-center flex flex-col gap-2 drop-shadow-lg">
          <div className="text-xl flex flex-row justify-center items-center gap-1 self-start">
            <Settings className="w-[1.21rem]" />
            Settings
          </div>
          <ButtonGeneric
            label="Edit Profile"
            icon={UserRoundPen}
            className="bg-white2 w-full"
          />
          <ButtonGeneric
            label="Change Password"
            icon={RectangleEllipsis}
            className="bg-white2 w-full "
          />
        </div>
        {/* Achievements */}
        <div className=" backdrop-blur-sm p-4 rounded-lg w-max justify-center items-center flex flex-col gap-2 drop-shadow-lg">
          <div className="text-xl flex flex-row justify-center items-center gap-1 self-start">
            <Trophy className="w-[1.19rem]" />
            Achievements
          </div>
          <ButtonGeneric
            label="View Participated Activities"
            icon={Handshake}
            className="bg-white2 w-full"
          />
          <ButtonGeneric
            label="Download Certificates"
            icon={FileBadge}
            className="bg-white2 w-full "
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
