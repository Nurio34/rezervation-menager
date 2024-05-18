import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../GlobalApp";

function CheckModal({ isModalOpen, setIsModalOpen }) {
    const { rooms } = useGlobalContext();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [roomType, setRoomType] = useState("");
    const [unavailableRooms, setUnvailableRooms] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const TwinRoomIDArr = [
        2, 101, 104, 105, 107, 110, 201, 204, 205, 207, 210, 301, 304, 305, 307,
        310, 401, 403,
    ];
    const DoubleRoomIDArr = [
        1, 102, 103, 106, 108, 109, 202, 203, 206, 208, 209, 302, 303, 306, 308,
        309, 402,
    ];
    const [isAvailibilityModalOpen, setIsAvailibilityModalOpen] =
        useState(false);

    useEffect(() => {
        if (roomType === "twin") {
            const shadowAvailableRooms = TwinRoomIDArr.filter(
                (id) => !unavailableRooms.includes(id),
            );
            setAvailableRooms(shadowAvailableRooms);
        } else if (roomType === "double") {
            const shadowAvailableRooms = DoubleRoomIDArr.filter(
                (id) => !unavailableRooms.includes(id),
            );
            setAvailableRooms(shadowAvailableRooms);
        }
    }, [unavailableRooms]);

    function checkAvailableRooms(e) {
        setUnvailableRooms([]);
        e.preventDefault();

        rooms.forEach((floorObj) => {
            return floorObj.rooms.forEach((roomObj) => {
                if ("rezervations" in roomObj) {
                    roomObj.rezervations.forEach((rezervation) => {
                        if (
                            (checkIn >= rezervation.checkin &&
                                checkIn < rezervation.checkout) ||
                            (checkIn < rezervation.checkin &&
                                checkOut > rezervation.checkin)
                        ) {
                            if (roomObj.type === roomType) {
                                setUnvailableRooms((unavailableRooms) => {
                                    return [...unavailableRooms, roomObj.id];
                                });
                            }
                        }
                    });
                }
            });
        });

        if (checkIn && checkOut && roomType) {
            setIsAvailibilityModalOpen(true);
        }
    }

    function closeModal() {
        setIsAvailibilityModalOpen(false);
    }

    return (
        <div>
            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        ${!isModalOpen && "hidden"}
        `}
            >
                <div
                    className=" absolute bg-gradient-to-br from-orange-500 to-white py-2 px-4 top-1/2 left-1/2 z-10
             rounded-tr-lg rounded-bl-lg rounded-br-lg space-y-2 
        "
                >
                    <button
                        className=" absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white w-6 rounded-full"
                        onClick={() => {
                            setIsModalOpen(false);
                            setCheckIn("");
                            setRoomType("");
                            setCheckOut("");
                        }}
                    >
                        X
                    </button>
                    <form
                        className=" grid justify-center gap-2"
                        onSubmit={checkAvailableRooms}
                    >
                        <label htmlFor="checkin">
                            <span className=" font-semibold font-serif">
                                Check-in
                            </span>
                            <input
                                type="date"
                                name="checkin"
                                id="checkin"
                                className=" px-2 rounded-md"
                                onChange={(e) => {
                                    setCheckIn(e.target.value);
                                }}
                                value={checkIn}
                            />
                        </label>
                        <label htmlFor="checkout">
                            <span className=" font-semibold font-serif">
                                Check-out
                            </span>
                            <input
                                type="date"
                                name="checkout"
                                id="checkout"
                                className=" px-2 rounded-md"
                                onChange={(e) => {
                                    setCheckOut(e.target.value);
                                }}
                                value={checkOut}
                            />
                        </label>
                        <select
                            name=""
                            id=""
                            onChange={(e) => setRoomType(e.target.value)}
                            value={roomType}
                        >
                            <option value="" disabled>
                                Type
                            </option>
                            <option value="twin">Twin</option>
                            <option value="double">Double</option>
                        </select>
                        <button
                            type="submit"
                            className=" py-1 px-3 bg-blue-500 text-white capitalize rounded-md"
                            style={{ fontVariant: "small-caps" }}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
            <div
                className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-full p-4
                bg-orange-500
                       flex max-w-[750px] flex-wrap gap-4
                       ${!isAvailibilityModalOpen && "hidden"}`}
            >
                <h2
                    className="w-full text-center capitalize font-bold text-2xl"
                    style={{ fontVariant: "small-caps" }}
                >
                    Available Rooms
                </h2>
                {availableRooms.map((room) => {
                    return (
                        <div className=" bg-[green] text-white py-1 px-4">
                            {room}
                        </div>
                    );
                })}
                <button
                    className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 
                    w-6 rounded-full text-center`}
                    onClick={closeModal}
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default CheckModal;
