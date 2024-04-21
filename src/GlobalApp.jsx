import { createContext, useContext, useEffect, useState } from "react";
import { Rooms_Data } from "./rooms";
// import { Rooms_Data } from "./mockRooms";

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
    //! -- SORT REZERVATIONS
    useEffect(() => {
        setCurrentRoomRezervations((currentRoomRezervations) => {
            return currentRoomRezervations
                ?.sort((a, b) => {
                    const [aYear, aMonth, aDay] = a.checkin.split("-");
                    const [bYear, bMonth, bDay] = b.checkin.split("-");

                    return +aMonth - +bMonth;
                })
                ?.sort((a, b) => {
                    const [aYear, aMonth, aDay] = a.checkin.split("-");
                    const [bYear, bMonth, bDay] = b.checkin.split("-");

                    if (aMonth === bMonth) {
                        return +aDay - +bDay;
                    }
                });
        });
    }, [currentRoomRezervations]);
    //! -- SORT REZERVATIONS

    const [isRezervationsModalOpen, setIsRezervationsModalOpen] =
        useState(false);

    //! ----
    const Local_RezNo = JSON.parse(localStorage.getItem("Rez_No")) || 1;
    const [rezervationNo, setRezervationNo] = useState(Local_RezNo);
    useEffect(() => {
        localStorage.setItem("Rez_No", JSON.stringify(rezervationNo));
    }, [rezervationNo]);
    //! ---

    const [isEditing, setIsEditing] = useState(false);

    const [currentRezervationNo, setCurrentRezervationNo] = useState(null);

    const [isBooleanModalOpen, setIsBooleanModalOpen] = useState(false);

    //! ---

    const [isCheckAvailabilityModalOpen, setIsCheckAvailabilityModalOpen] =
        useState(false);

    //! ---- TODAY'S DATE ---

    const [todaysDate, setTodaysDate] = useState("");

    const today = () => {
        const today = new Date();

        // Get year, month (0-indexed), and day
        const year = today.getFullYear();
        let month = today.getMonth() + 1; // JS months start at 0
        const day = today.getDate();

        // Pad month and day with zeroes if necessary (single digits)
        const formattedMonth = month.toString().padStart(2, "0");
        const formattedDay = day.toString().padStart(2, "0");

        // Combine year, month, and day with separators
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

        setTodaysDate(formattedDate);
    };

    useEffect(() => {
        today();
    }, [rooms]);
    //! ---- TODAY'S DATE ---

    //! --- LIGHT & DARK ROOMS ---
    const [isTwinLight, setIsTwinLight] = useState(false);
    const [isDoubleLight, setIsDoubleLight] = useState(false);
    //! --- LIGHT & DARK ROOMS ---

    //! --- SEARH-BOX ---
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const [searchNode, setSearchNode] = useState("");
    //! --- SEARH-BOX ---

    useEffect(() => {
        const preventRightClickDefault = (e) => {
            e.preventDefault();
            setIsCheckAvailabilityModalOpen(false);
            setIsTwinLight(false);
            setIsDoubleLight(false);
        };

        const closeModals = () => {
            setRightClickedRoom(null);
        };

        window.addEventListener("click", closeModals);
        window.addEventListener("contextmenu", preventRightClickDefault);

        return () => {
            window.removeEventListener("click", closeModals);
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
                isCheckAvailabilityModalOpen,
                setIsCheckAvailabilityModalOpen,
                todaysDate,
                setTodaysDate,
                isTwinLight,
                setIsTwinLight,
                isDoubleLight,
                setIsDoubleLight,
                isSearchBoxOpen,
                setIsSearchBoxOpen,
                searchNode,
                setSearchNode,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalApp;
