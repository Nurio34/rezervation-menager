import { createContext, useContext, useEffect, useState } from "react";
import { Rooms_Data } from "./rooms";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

function GlobalApp({ children }) {
    const [rooms, setRooms] = useState(Rooms_Data);

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
    const [currentRezervationNo, setCurrentRezervationNo] = useState(null);
    console.log(currentRezervationNo);

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
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalApp;
