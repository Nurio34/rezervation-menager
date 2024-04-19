import { createContext, useContext, useEffect, useState } from "react";
import { Rooms_Data } from "./rooms";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

function GlobalApp({ children }) {
    const Local_Rooms = JSON.parse(localStorage.getItem("rooms"));

    const [rooms, setRooms] = useState(Local_Rooms || Rooms_Data);

    useEffect(() => {
        localStorage.setItem("rooms", JSON.stringify(rooms));
    }, [rooms]);

    const [rightClickedRoom, setRightClickedRoom] = useState(null);

    const [isNewRezervationMenuOpen, setIsNewRezervationMenuOpen] =
        useState(false);

    const [currentRoom, setCurrentRoom] = useState({});

    const [inspectingDate, setInspectingDate] = useState("");

    const [isMessageShow, setIsMessageShow] = useState(false);
    const [msg, setMsg] = useState("");

    const [currentRoomRezervations, setCurrentRoomRezervations] = useState([]);

    const [isRezervationsModalOpen, setIsRezervationsModalOpen] =
        useState(false);

    const [rezervationNo, setRezervationNo] = useState(1);

    const [isEditing, setIsEditing] = useState(false);

    const Local_RezNo = JSON.parse(localStorage.getItem("Rez_No")) || 1;
    const [currentRezervationNo, setCurrentRezervationNo] =
        useState(Local_RezNo);
    useEffect(() => {
        localStorage.setItem("Rez_No", JSON.stringify(currentRezervationNo));
    }, [currentRezervationNo]);
    console.log(currentRezervationNo);

    const [isBooleanModalOpen, setIsBooleanModalOpen] = useState(false);

    useEffect(() => {
        const closeContextMenu = () => setRightClickedRoom(null);
        const preventRightClickDefault = (e) => e.preventDefault();

        window.addEventListener("click", closeContextMenu);
        window.addEventListener("contextmenu", preventRightClickDefault);

        return () => {
            window.removeEventListener("click", closeContextMenu);
            window.removeEventListener("contextmenu", preventRightClickDefault);
        };
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                rooms,
                setRooms,
                rightClickedRoom,
                setRightClickedRoom,
                isNewRezervationMenuOpen,
                setIsNewRezervationMenuOpen,
                currentRoom,
                setCurrentRoom,
                inspectingDate,
                setInspectingDate,
                isMessageShow,
                setIsMessageShow,
                msg,
                setMsg,
                currentRoomRezervations,
                setCurrentRoomRezervations,
                isRezervationsModalOpen,
                setIsRezervationsModalOpen,
                rezervationNo,
                setRezervationNo,
                isEditing,
                setIsEditing,
                currentRezervationNo,
                setCurrentRezervationNo,
                isBooleanModalOpen,
                setIsBooleanModalOpen,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalApp;
