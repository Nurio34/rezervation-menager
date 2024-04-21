import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import { useGlobalContext } from "../../GlobalApp";
import { motion } from "framer-motion";

function Rezervation({ obj }) {
    const {
        setIsNewRezervationMenuOpen,
        setIsEditing,
        setCurrentRezervationNo,
        setIsBooleanModalOpen,
    } = useGlobalContext();

    function formatDate(date) {
        date = date?.split("-");

        const [year, month, day] = date;

        return (
            <span className=" tracking-tight">
                {day} <span className="text-xs">/</span> {month}{" "}
                <span className="text-xs">/</span> {year}
            </span>
        );
    }

    return (
        <motion.li className=" bg-white py-2 px-4 rounded-md " layout>
            <p className=" flex items-center gap-2  ">
                <span className=" text-sm italic font-serif">Rez No</span>

                <span className=" text-sm font-bold text-orange-500 capitalize">
                    {obj.no}
                </span>

                <button
                    className=" border border-black p-1  ml-auto rounded-md"
                    onClick={(e) => {
                        setIsBooleanModalOpen(true);
                        setCurrentRezervationNo(obj.no);
                    }}
                >
                    <MdDeleteOutline color="red" size={24} />
                </button>
                <button
                    className=" border border-black p-1   rounded-md"
                    onClick={(e) => {
                        setIsNewRezervationMenuOpen(true);
                        setIsEditing(true);
                        setCurrentRezervationNo(obj.no);
                    }}
                >
                    <FaEdit color="blue" size={24} />
                </button>
            </p>
            <p className=" grid grid-cols-[0.2fr,1fr] items-center">
                <span className=" font-semibold italic text-lg font-serif">
                    Name
                </span>
                <span>
                    <span className="pr-2">:</span>
                    <span className=" capitalize">{obj.name}</span>
                </span>
            </p>
            <p className=" grid grid-cols-[0.2fr,1fr] items-center">
                <span className=" font-semibold italic text-lg font-serif">
                    Check In
                </span>
                <span>
                    <span className="pr-2">:</span>
                    {formatDate(obj.checkin)}
                </span>
            </p>
            <p className=" grid grid-cols-[0.2fr,1fr] items-center">
                <span className=" font-semibold italic text-lg font-serif">
                    Check Out
                </span>
                <span>
                    <span className="pr-2">:</span>
                    {formatDate(obj.checkout)}
                </span>
            </p>
            <p className=" grid grid-cols-[0.2fr,1fr]">
                <span className=" font-semibold italic text-lg font-serif">
                    Not
                </span>
                <span>
                    <span className="pr-2">:</span>
                    {obj.detail}
                </span>
            </p>
        </motion.li>
    );
}

export default Rezervation;
