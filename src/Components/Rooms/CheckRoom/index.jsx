import React, { useState } from "react";
import CheckModal from "./Components/CheckModal";

function CheckRoom() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openCheckModal() {
        setIsModalOpen(true);
    }

    return (
        <div>
            <button
                className="py-1 px-4 bg-orange-500 text-white capitalize font-bold rounded-lg"
                style={{ fontVariant: "small-caps" }}
                onClick={openCheckModal}
            >
                CheckRoom
            </button>
            <CheckModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
}

export default CheckRoom;
