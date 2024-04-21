import { motion } from "framer-motion";
import { useGlobalContext } from "../../GlobalApp";

function ContextMenu({ floor, id, anyRezervation }) {
    const {
        setIsNewRezervationMenuOpen,
        setRightClickedRoom,
        setCurrentRoom,
        setIsRezervationsModalOpen,
        setIsCheckAvailabilityModalOpen,
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

    const openAvailabiltyModal = () => {
        setIsCheckAvailabilityModalOpen(true);
        setCurrentRoom({ floor, id });
    };

    return (
        <ul
            open
            className="ContextMenu absolute min-w-[173px] top-1/2 left-1/2 z-10 bg-gradient-to-br from-orange-500 to-white p-2 rounded-tr-md rounded-br-md rounded-bl-md
                grid gap-1 
            "
        >
            <motion.button
                type="button"
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md 
                hover:bg-gradient-to-r hover:to-[rgba(255,255,255,0.1)] hover:from-[rgba(255,255,255,1)]
                "
                onClick={openNewRezervationModal}
                whileHover={{ x: 1, y: -1 }}
            >
                New Rezervation
            </motion.button>
            <motion.button
                type="button"
                disabled={!anyRezervation}
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md
                hover:bg-gradient-to-r hover:to-[rgba(255,255,255,0.1)] hover:from-[rgba(255,255,255,1)] 
                disabled:bg-gradient-to-r disabled:from-[rgba(125,125,125,1)] disabled:to-[rgba(125,125,125,0.5)]
                "
                whileHover={{ x: anyRezervation && 1, y: anyRezervation && -1 }}
                onClick={() => openRezervationsModal(id)}
            >
                Show Rezervations
            </motion.button>
            <motion.button
                type="button"
                disabled={!anyRezervation}
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md
                hover:bg-gradient-to-r hover:to-[rgba(255,255,255,0.1)] hover:from-[rgba(255,255,255,1)]
                disabled:bg-gradient-to-r disabled:from-[rgba(125,125,125,1)] disabled:to-[rgba(125,125,125,0.5)]
                "
                whileHover={{ x: anyRezervation && 1, y: anyRezervation && -1 }}
                onClick={openAvailabiltyModal}
            >
                Check Availablity
            </motion.button>

            {/* <motion.button
                type="button"
                className="  border border-white py-1 px-2 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,1)] rounded-md"
                whileHover={{ x: 1, y: -1 }}
            >
                Setting
            </motion.button> */}
        </ul>
    );
}

export default ContextMenu;
