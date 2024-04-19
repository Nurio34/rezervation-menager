import { useEffect } from "react";
import { useGlobalContext } from "../../GlobalApp";

function Calender() {
    const { inspectingDate, setInspectingDate } = useGlobalContext();

    const handleChange = (e) => {
        setInspectingDate(e.target.value);
    };

    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth() + 1;
    const thisDay = new Date().getDate();

    const today = `${thisYear}-${thisMonth < 10 ? 0 : ""}${thisMonth}-${
        thisDay < 10 ? 0 : ""
    }${thisDay}`;

    useEffect(() => {
        setInspectingDate(today);
    }, []);

    return (
        <label
            htmlFor="calender"
            className=" bg-orange-500 text-orange-500 text-center font-serif font-extrabold text-3xl  top-0 absolute right-0 -translate-x-1/2 translate-y-1/2 grid p-4 rounded-xl skew-y-12"
            style={{
                fontVariant: "small-caps",
                WebkitTextStroke: "1px white",
            }}
        >
            Calender
            <input
                type="date"
                name="calender"
                id="calender"
                onChange={handleChange}
                value={inspectingDate}
            />
        </label>
    );
}

export default Calender;
