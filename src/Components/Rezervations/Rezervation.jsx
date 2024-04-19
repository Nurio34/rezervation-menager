import { FaEdit } from "react-icons/fa";
import { useGlobalContext } from "../../GlobalApp";

function Rezervation({ obj }) {
    const {
        setIsNewRezervationMenuOpen,
        setIsEditing,
        setCurrentRezervationNo,
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
        <li className=" bg-white py-2 px-4 rounded-md ">
            <p className=" flex items-center  ">
                <span className=" text-sm italic font-serif">Rez No</span>

                <span className=" text-sm font-bold text-orange-500 capitalize pl-2">
                    {obj.no}
                </span>

                <button
                    className=" border border-black p-1  ml-auto rounded-md"
                    onClick={(e) => {
                        setIsNewRezervationMenuOpen(true);
                        setIsEditing(true);
                        setCurrentRezervationNo(obj.no);
                    }}
                >
                    <FaEdit color="orangered" size={24} />
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
        </li>
    );
}

export default Rezervation;
