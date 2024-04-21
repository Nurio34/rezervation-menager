import { useEffect, useState } from "react";
import { useGlobalContext } from "../../GlobalApp";
import ContextMenu from "../ContextMenu";
import "./index.scss";
import { PiShieldWarningFill } from "react-icons/pi";
import CheckAvailablity from "../CheckAvailablity";

function Room({ floor, room }) {
    const { id } = room;
    const {
        rooms,
        rightClickedRoom,
        setRightClickedRoom,
        inspectingDate,
        setCurrentRoomRezervations,
        isCheckAvailabilityModalOpen,
        currentRoom,
        setIsCheckAvailabilityModalOpen,
    } = useGlobalContext();

    const [isBusy, setIsBusy] = useState();

    const rezervations = rooms
        .filter((floorObj) => {
            return floorObj.floor === floor;
        })[0]
        .rooms.filter((roomObj) => roomObj.id === id)[0]
        .rezervations?.map((obj) => {
            return obj;
        });

    const checkBusyDates = () => {
        setIsBusy(
            rezervations?.some(
                (obj) =>
                    inspectingDate >= obj.checkin &&
                    inspectingDate < obj.checkout,
            ),
        );
    };

    const checkIfAnyRezervationInThisRoom = rezervations?.length;

    useEffect(() => {
        checkBusyDates();
    }, [inspectingDate, rooms]);

    return (
        <li
            className={`Room relative ${
                isBusy ? "bg-[red]" : "bg-transparent"
            }`}
            onContextMenu={(e) => {
                e.preventDefault();

                if (rightClickedRoom === id) {
                    setRightClickedRoom(null);
                    return;
                }
                setRightClickedRoom(id);
                setCurrentRoomRezervations(rezervations);
                setIsCheckAvailabilityModalOpen(false);
            }}
        >
            {id}
            {rezervations?.length > 0 && (
                <PiShieldWarningFill
                    className=" absolute bottom-1 right-2"
                    color="red"
                    title="There are rezervations in this room !"
                />
            )}
            {rightClickedRoom === id && (
                <ContextMenu
                    floor={floor}
                    id={id}
                    anyRezervation={checkIfAnyRezervationInThisRoom}
                />
            )}
            {currentRoom.id === id && isCheckAvailabilityModalOpen && (
                <CheckAvailablity floor={floor} id={id} />
            )}
        </li>
    );
}

export default Room;
