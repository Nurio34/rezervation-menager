import { useEffect, useRef } from "react";
import { useGlobalContext } from "../../GlobalApp";
import { motion, AnimatePresence } from "framer-motion";

function BooleanModal() {
    const {
        isBooleanModalOpen,
        setIsBooleanModalOpen,
        currentRoom,
        currentRezervationNo,
        setRooms,
        rooms,
        currentRoomRezervations,
        setCurrentRoomRezervations,
    } = useGlobalContext();

    const NoBtn = useRef();

    useEffect(() => {
        if (NoBtn.current) {
            NoBtn.current.focus();
        }
    }, [isBooleanModalOpen]);

    const deleteRezervation = () => {
        setRooms((rooms) =>
            rooms.map((floorObj) => {
                if (floorObj.floor !== currentRoom.floor) {
                    return floorObj;
                } else {
                    return {
                        ...floorObj,
                        rooms: floorObj.rooms.map((roomObj) => {
                            if (roomObj.id !== currentRoom.id) {
                                return roomObj;
                            } else {
                                return {
                                    ...roomObj,
                                    rezervations: roomObj.rezervations.filter(
                                        (rezervation) =>
                                            rezervation.no !==
                                            currentRezervationNo,
                                    ),
                                };
                            }
                        }),
                    };
                }
            }),
        );

        setCurrentRoomRezervations((pre) => {
            return pre.filter((obj) => obj.no !== currentRezervationNo);
        });
    };

    return (
        <>
            <AnimatePresence>
                {isBooleanModalOpen && (
                    <motion.div
                        className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(125,125,125,0.9)]"
                        initial={{ x: -1920, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 1920, opacity: 0 }}
                    >
                        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full bg-[blue] text-white py-8 px-16 space-y-4 rounded-md">
                            <p
                                className=" text-center font-semibold text-lg capitalize tracking-widest "
                                style={{ fontVariant: "small-caps" }}
                            >
                                {" "}
                                Are you sure ?
                            </p>
                            <div className=" flex gap-4 justify-center">
                                <motion.button
                                    ref={NoBtn}
                                    className="py-2 px-4 bg-[red] rounded-md "
                                    onClick={(e) => {
                                        setIsBooleanModalOpen(false);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileFocus={{ scale: 1.1 }}
                                >
                                    No
                                </motion.button>
                                <motion.button
                                    className="py-2 px-4 bg-[green] rounded-md"
                                    onClick={(e) => {
                                        deleteRezervation();
                                        setIsBooleanModalOpen(false);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileFocus={{ scale: 1.1 }}
                                >
                                    Yes
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default BooleanModal;
