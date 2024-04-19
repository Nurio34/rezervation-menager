import { useGlobalContext } from "../../GlobalApp";

function ContextMenu({ floor, id, anyRezervation }) {
    const {
        setIsNewRezervationMenuOpen,
        setRightClickedRoom,
        setCurrentRoom,
        setIsRezervationsModalOpen,
    } = useGlobalContext();

    const openNewRezervationModal = () => {
        setIsNewRezervationMenuOpen(true);
        setRightClickedRoom(null);
        setCurrentRoom({ floor, id });
    };

    const openRezervationsModal = () => {
        setIsRezervationsModalOpen(true);
        setCurrentRoom({ floor, id });
    };
    return (
        <ul
            open
            className="ContextMenu absolute min-w-[173px] top-1/2 left-1/2 z-10 bg-gradient-to-br from-orange-500 to-white p-2 rounded-tr-md rounded-br-md rounded-bl-md
                grid gap-1 
            "
        >
            <button
                type="button"
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md"
                onClick={openNewRezervationModal}
            >
                New Rezervation
            </button>
            <button
                type="button"
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md"
            >
                Check Availablity
            </button>
            <button
                type="button"
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md 
                disabled:bg-gradient-to-r disabled:from-[rgba(125,125,125,1)] disabled:to-[rgba(125,125,125,0.5)]
                "
                disabled={!anyRezervation}
                onClick={() => openRezervationsModal(id)}
            >
                Show Rezervations
            </button>

            <button
                type="button"
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md"
            >
                Setting
            </button>
        </ul>
    );
}

export default ContextMenu;
