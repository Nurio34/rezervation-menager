import { useGlobalContext } from "../../../GlobalApp";

function TwinButton() {
    const { isTwinLight, setIsTwinLight, setIsDoubleLight } =
        useGlobalContext();

    const lightTwinRooms = () => {
        setIsDoubleLight(false);
        setIsTwinLight(!isTwinLight);
    };

    return (
        <button
            type="button"
            className=" bg-[blue] text-white font-semibold text-lg capitalize py-1 px-4 rounded-md"
            style={{ fontVariant: "small-caps" }}
            onClick={lightTwinRooms}
        >
            Twin
        </button>
    );
}

export default TwinButton;
