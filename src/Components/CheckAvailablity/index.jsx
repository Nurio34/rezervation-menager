import { motion } from "framer-motion";
import { useGlobalContext } from "../../GlobalApp";
import { useState } from "react";

function CheckAvailablity({ floor, id }) {
    const { rooms, currentRoomRezervations, setIsCheckAvailabilityModalOpen } =
        useGlobalContext();

    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [msg, setMsg] = useState("");
    const [availabilty, setAvailabilty] = useState(null);
    const [isSearched, setIsSearched] = useState(false);

    const checkAnyRezervationBetweenTheseDates = () => {
        if (!checkin || !checkout) {
            return null;
        }

        return (
            currentRoomRezervations.some((obj) => {
                return checkin >= obj.checkin && checkin < obj.checkout;
            }) ||
            currentRoomRezervations.some((obj) => {
                return checkin < obj.checkin && checkout > obj.checkin;
            })
        );
    };

    const checkAvailabilty = (e) => {
        e.preventDefault();
        setIsSearched(true);

        if (checkAnyRezervationBetweenTheseDates() === null) {
            setMsg("Choose dates");
            setAvailabilty(null);
        } else if (checkAnyRezervationBetweenTheseDates() === true) {
            setMsg("Not Available");
            setAvailabilty(false);
        } else {
            setMsg("Available");
            setAvailabilty(true);
        }
    };

    return (
        <div
            className=" absolute bg-gradient-to-br from-orange-500 to-white py-2 px-4 top-1/2 left-1/2 z-10
             rounded-tr-lg rounded-bl-lg rounded-br-lg space-y-2 
        "
        >
            <button
                className=" absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white w-6 rounded-full"
                onClick={(e) => setIsCheckAvailabilityModalOpen(false)}
            >
                X
            </button>
            <form
                className=" grid justify-center gap-2"
                onSubmit={checkAvailabilty}
            >
                <label htmlFor="checkin">
                    <span className=" font-semibold font-serif">Check-in</span>
                    <input
                        type="date"
                        name="checkin"
                        id="checkin"
                        className=" px-2 rounded-md"
                        value={checkin}
                        onChange={(e) => setCheckin(e.target.value)}
                        onClick={(e) => setIsSearched(false)}
                    />
                </label>
                <label htmlFor="checkout">
                    <span className=" font-semibold font-serif">Check-out</span>
                    <input
                        type="date"
                        name="checkout"
                        id="checkout"
                        className=" px-2 rounded-md"
                        value={checkout}
                        onChange={(e) => setCheckout(e.target.value)}
                        onClick={(e) => setIsSearched(false)}
                    />
                </label>
                <motion.button
                    type="submit"
                    className=" py-1 px-3 bg-blue-500 text-white capitalize rounded-md"
                    style={{ fontVariant: "small-caps" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Search
                </motion.button>
            </form>
            {isSearched && (
                <p
                    className={` py-1 px-2
            ${
                availabilty === null
                    ? "bg-[blue] text-white"
                    : availabilty === false
                    ? " bg-[red]"
                    : "bg-green-500"
            }

            `}
                >
                    {msg}
                </p>
            )}
        </div>
    );
}

export default CheckAvailablity;
