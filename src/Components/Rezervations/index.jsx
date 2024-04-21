import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../../GlobalApp";
import { IoClose } from "react-icons/io5";

import Rezervation from "./Rezervation";

function Rezervations() {
    const {
        currentRoom,
        currentRoomRezervations,
        isRezervationsModalOpen,
        setIsRezervationsModalOpen,
        setIsNewRezervationMenuOpen,
    } = useGlobalContext();

    const { id, floor } = currentRoom;

    //! --- SORT REZERVATIONS ---
    const rezervations = currentRoomRezervations
        ?.sort((a, b) => {
            const [aYear, aMonth, aDay] = a.checkin.split("-");
            const [bYear, bMonth, bDay] = b.checkin.split("-");

            return +aMonth - +bMonth;
        })
        ?.sort((a, b) => {
            const [aYear, aMonth, aDay] = a.checkin.split("-");
            const [bYear, bMonth, bDay] = b.checkin.split("-");

            if (aMonth === bMonth) {
                return +aDay - +bDay;
            }
        });

    return (
        <>
            <AnimatePresence>
                {isRezervationsModalOpen && (
                    <motion.div
                        className=" Rezervations absolute top-0 left-0 w-screen h-screen bg-[rgba(255,69,0,0.9)] py-8 px-4
                    grid place-content-start justify-center"
                        initial={{ x: -1920, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 1920, opacity: 0 }}
                    >
                        <h2
                            className=" font-extrabold text-2xl text-center capitalize font-serif py-8 relative"
                            style={{ fontVariant: "small-caps" }}
                        >
                            Rezervations - {id}
                            <motion.button
                                type="button "
                                className=" absolute top-4 right-4 border border-white rounded-full p-1"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    setIsRezervationsModalOpen(false);
                                    setIsNewRezervationMenuOpen(false);
                                }}
                            >
                                <IoClose />
                            </motion.button>
                        </h2>
                        <motion.ul
                            className="w-[clamp(320px,90vw,768px)] grid gap-4"
                            layout
                        >
                            {rezervations.map((obj) => {
                                return <Rezervation key={obj.no} obj={obj} />;
                            })}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Rezervations;
