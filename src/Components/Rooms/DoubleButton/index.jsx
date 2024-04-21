import { useGlobalContext } from "../../../GlobalApp";

function DoubleButton() {
    const { isDoubleLight, setIsDoubleLight, setIsTwinLight } =
        useGlobalContext();

    const lightDoubleRooms = () => {
        setIsTwinLight(false);
        setIsDoubleLight(!isDoubleLight);
    };

    return (
        <button
            type="button"
            className=" bg-[blue] text-white font-semibold text-lg capitalize py-1 px-4 rounded-md"
            style={{ fontVariant: "small-caps" }}
            onClick={lightDoubleRooms}
        >
            Double
        </button>
    );
}

export default DoubleButton;
