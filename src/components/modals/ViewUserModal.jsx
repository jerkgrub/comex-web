import ProfileInfoCard from "../ProfileInfoCard";

const ViewUserModal = ({ user }) => {
  return (
    <dialog id="ViewUserModal" className="modal">
      <div className="modal-box p-10 w-max h-max bg-transparent shadow-none">
        <ProfileInfoCard user={user} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ViewUserModal;