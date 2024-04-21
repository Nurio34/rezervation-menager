import { useGlobalContext } from "../../GlobalApp";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function NewRezervationModal() {
    const {
        rooms,
        isNewRezervationMenuOpen,
        setIsNewRezervationMenuOpen,
        currentRoom,
        setRooms,
        setIsMessageShow,
        setMsg,
        rezervationNo,
        setRezervationNo,
        isEditing,
        setIsEditing,
        currentRoomRezervations,
        currentRezervationNo,
        setCurrentRoomRezervations,
        setCurrentRezervationNo,
    } = useGlobalContext();

    const formData_initial = {
        name: "",
        checkin: "",
        checkout: "",
        detail: "",
        no: null,
    };

    const [formData, setFormData] = useState(formData_initial);

    const { floor, id } = currentRoom;

    const closeNewRezervationMenu = () => {
        setIsNewRezervationMenuOpen(false);
    };

    const checkAnyRezervationBetweenTheseDates = (checkin, checkout) => {
        const rezervations = rooms
            .filter((floorObj) => {
                return floorObj.floor === floor;
            })[0]
            .rooms.filter((roomObj) => roomObj.id === id)[0]
            .rezervations?.map((obj) => {
                return obj;
            });

        return (
            rezervations?.some((obj) => {
                if (obj.no === currentRezervationNo) {
                    return;
                }
                return checkin >= obj.checkin && checkin < obj.checkout;
            }) ||
            rezervations?.some((obj) => {
                if (obj.no === currentRezervationNo) {
                    return;
                }
                return checkin < obj.checkin && checkout > obj.checkin;
            })
        );
    };

    const handleNewRezervation = (e) => {
        e.preventDefault();

        const name = formData.name;
        const checkin = formData.checkin;
        const checkout = formData.checkout;

        if (!name || !checkin || !checkout) {
            const msg = () => {
                return (
                    <p>
                        {" "}
                        <span className=" underline underline-offset-2">
                            Name
                        </span>
                        ,{" "}
                        <span className=" underline underline-offset-2">
                            Check In
                        </span>
                        , &
                        <span className=" underline underline-offset-2 pl-2">
                            CheckOut
                        </span>
                        , can not be empty{" "}
                    </p>
                );
            };
            setIsMessageShow(true);
            setMsg(msg);
            return;
        }

        if (checkAnyRezervationBetweenTheseDates(checkin, checkout)) {
            const msg =
                "Seçmiş olduğunuz tarih aralığında, odada rezervasyon gözükmektedir. Kontrol ediniz !! ";
            setIsMessageShow(true);
            setMsg(msg);
            return;
        }

        if (isEditing) {
            setRooms((floors) => {
                return floors.map((floorID) => {
                    if (floorID.floor === floor) {
                        return {
                            ...floorID,
                            rooms: floorID.rooms.map((roomID) => {
                                if (roomID.id === id) {
                                    return {
                                        ...roomID,
                                        rezervations: roomID.rezervations.map(
                                            (obj) => {
                                                if (
                                                    obj.no ===
                                                    currentRezervationNo
                                                ) {
                                                    return formData;
                                                } else {
                                                    return obj;
                                                }
                                            },
                                        ),
                                    };
                                } else {
                                    return roomID;
                                }
                            }),
                        };
                    } else {
                        return floorID;
                    }
                });
            });
        } else if (!isEditing) {
            setRooms((floors) => {
                return floors.map((floorID) => {
                    if (floorID.floor === floor) {
                        return {
                            ...floorID,
                            rooms: floorID.rooms.map((roomID) => {
                                if (roomID.id === id) {
                                    return {
                                        ...roomID,
                                        rezervations: roomID.rezervations
                                            ? [
                                                  ...roomID.rezervations,
                                                  {
                                                      ...formData,
                                                      no: rezervationNo,
                                                  },
                                              ]
                                            : [
                                                  {
                                                      ...formData,
                                                      no: rezervationNo,
                                                  },
                                              ],
                                    };
                                } else {
                                    return roomID;
                                }
                            }),
                        };
                    } else {
                        return floorID;
                    }
                });
            });
            setRezervationNo((no) => no + 1);
        }

        setIsEditing(false);
        setIsNewRezervationMenuOpen(false);
        setFormData(formData_initial);

        setCurrentRoomRezervations((pre) => {
            if (pre && pre.length > 0) {
                if (isEditing) {
                    return pre.map((obj) => {
                        if (obj.no === currentRezervationNo) {
                            return formData;
                        } else {
                            return obj;
                        }
                    });
                } else {
                    return [...pre, formData];
                }
            } else {
                return [formData];
            }
        });

        setCurrentRezervationNo((pre) => pre + 1);
    };

    //! ---

    const currentRezervation = currentRoomRezervations?.filter(
        (obj) => obj.no === currentRezervationNo,
    )[0];

    useEffect(() => {
        if (isEditing) {
            setFormData(currentRezervation);
        }
    }, [isEditing]);

    return (
        <AnimatePresence>
            {isNewRezervationMenuOpen && (
                <motion.dialog
                    open={isNewRezervationMenuOpen}
                    className=" top-1/2  bg-orange-500 p-2 rounded-lg z-10"
                    initial={{ x: -200, y: -200, opacity: 0 }}
                    animate={{ x: 0, y: -200, opacity: 1 }}
                    exit={{ x: 400, y: -200, opacity: 0 }}
                >
                    <p className=" font-serif font-semibold textxlg italic absolute top-[16px] left-16px bg-white p-1 rounded-md -skew-x-6 text-orange-500 ">
                        {id}
                    </p>
                    <motion.button
                        type="button"
                        className=" absolute top-0 right-0"
                        initial={{ x: -16, y: 16 }}
                        whileHover={{ scale: 1.5 }}
                        onClick={(e) => {
                            closeNewRezervationMenu();
                            setIsEditing(false);
                            setFormData(formData_initial);
                        }}
                    >
                        <IoClose />
                    </motion.button>
                    <h2
                        className=" text-xl font-semibold capitalize text-center py-4"
                        style={{ fontVariant: "small-caps" }}
                    >
                        New Rezervation
                    </h2>
                    <form
                        className="grid gap-4"
                        onSubmit={handleNewRezervation}
                    >
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="İsim, Soyisim..."
                            className="py-1 px-2 rounded-md"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((data) => ({
                                    ...data,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <div className=" flex gap-4">
                            <label
                                htmlFor="checkin"
                                className=" font-semibold italic"
                            >
                                Check-In
                                <input
                                    type="date"
                                    name="checkin"
                                    id="checkin"
                                    className="w-full rounded-md py-1 px-2"
                                    value={formData.checkin}
                                    onChange={(e) =>
                                        setFormData((data) => ({
                                            ...data,
                                            checkin: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                            <label
                                htmlFor="checkout"
                                className=" font-semibold italic"
                            >
                                Check-Out
                                <input
                                    type="date"
                                    name="checkout"
                                    id="checkout"
                                    className="w-full rounded-md py-1 px-2"
                                    value={formData.checkout}
                                    onChange={(e) =>
                                        setFormData((data) => ({
                                            ...data,
                                            checkout: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <textarea
                            name="detail"
                            id="detail"
                            placeholder="Not..."
                            className="py-1 px-2 rounded-md"
                            value={formData.detail}
                            onChange={(e) =>
                                setFormData((data) => ({
                                    ...data,
                                    detail: e.target.value,
                                }))
                            }
                        ></textarea>
                        <motion.button
                            type="submit "
                            className=" bg-white text-orange-500 font-semibold capitalize justify-self-center w-1/2 py-1 rounded-md"
                            style={{ fontVariant: "small-caps" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Create
                        </motion.button>
                    </form>
                </motion.dialog>
            )}
        </AnimatePresence>
    );
}

export default NewRezervationModal;
