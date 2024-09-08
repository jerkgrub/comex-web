import React from "react";
import ProfileInfoCardSigned from "../ProfileInfoCardSigned";

export default function CardModal() {
  return (
    <dialog id="CardModal" className="modal">
      <div className="modal-box p-10 w-max h-max bg-transparent shadow-none">
      <ProfileInfoCardSigned />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
