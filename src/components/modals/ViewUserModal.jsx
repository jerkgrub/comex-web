import ProfileInfoCard from "../ProfileInfoCard";

export default function ViewUserModal() {
    return (
        <dialog id="ViewUserModal" className="modal">
            <div className="modal-box p-10 w-max h-max bg-transparent shadow-none">
                <ProfileInfoCard />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
