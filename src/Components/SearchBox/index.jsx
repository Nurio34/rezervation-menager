import { useGlobalContext } from "../../GlobalApp";
import { IoClose } from "react-icons/io5";
import { FaRegWindowMinimize } from "react-icons/fa";
import { useRef, useState } from "react";

function SearchBox() {
    const { rooms, isSearchBoxOpen, setIsSearchBoxOpen, searchNode } =
        useGlobalContext();

    const searchedRooms = rooms
        .map((floorObj) => {
            return {
                ...floorObj,
                rooms: floorObj.rooms.map((roomObj) => {
                    return {
                        ...roomObj,
                        rezervations: roomObj.rezervations?.filter(
                            (rezervation) => {
                                return (
                                    rezervation.name
                                        .toLowerCase()
                                        .includes(searchNode) ||
                                    rezervation.detail
                                        .toLowerCase()
                                        .includes(searchNode)
                                );
                            },
                        ),
                    };
                }),
            };
        })
        .map((floorObj) => {
            return floorObj.rooms.filter(
                (roomObj) => roomObj?.rezervations?.length > 0,
            );
        })
        .flat()
        .map((roomObj) => {
            return (
                <div key={roomObj.id} className="  rounded-lg grid gap-4">
                    {roomObj.rezervations.map((rezervation) => {
                        return (
                            <div key={rezervation.no} className="p-4 bg-white">
                                <p>
                                    <span className=" font-semibold font-serif text-lg capitilize pr-1">
                                        Room :
                                    </span>
                                    {roomObj.id}
                                </p>
                                <p>
                                    <span className=" font-semibold font-serif text-lg capitilize pr-1">
                                        Name :
                                    </span>
                                    {rezervation.name}{" "}
                                </p>
                                <p>
                                    <span
                                        className=" font-semibold font-serif
                                        text-lg capitilize pr-1"
                                    >
                                        Checkin :
                                    </span>
                                    {rezervation.checkin}{" "}
                                </p>
                                <p>
                                    <span
                                        className=" font-semibold font-serif
                                        text-lg capitilize pr-1"
                                    >
                                        Checkout :
                                    </span>
                                    {rezervation.checkout}{" "}
                                </p>
                                <p>
                                    <span
                                        className=" font-semibold font-serif
                                        text-lg capitilize pr-1"
                                    >
                                        Details :
                                    </span>
                                    {rezervation.detail}{" "}
                                </p>
                            </div>
                        );
                    })}
                </div>
            );
        });

    const SearchboxEl = useRef();
    const [isSearchBoxMinimized, setIsSearchBoxMinimized] = useState(false);

    const minimizeSearchbox = () => {
        if (SearchboxEl.current) {
            const searchbox = SearchboxEl.current;
            setIsSearchBoxMinimized(!isSearchBoxMinimized);
        }
    };

    const closeSearchbox = () => {
        setIsSearchBoxOpen(false);
        setIsSearchBoxMinimized(false);
    };

    return (
        isSearchBoxOpen && (
            <div
                className="SearchBox max-h-[800px] min-w-[400px] rounded-xl overflow-auto grid gap-4
            absolute top-8 left-1/2 -translate-x-1/2  bg-orange-500"
                style={{
                    maxHeight: isSearchBoxMinimized ? "44px" : "",
                    overflow: isSearchBoxMinimized ? "hidden" : "",
                    boxShadow:
                        "0 0 10px black, 0 0 20px black, 0 0 30px black, 0 0 40px black",
                }}
                ref={SearchboxEl}
            >
                <h2
                    className=" text-center font-bold text-2xl capitalize italic sticky top-0 bg-white py-1 "
                    style={{ fontVariant: "small-caps" }}
                >
                    Search Results
                    <div
                        className={`grid grid-cols-[1fr,1fr] gap-2 justify-end items-center buttons absolute top-0 right-0 translate-y-1/2 z-10
                        ${isSearchBoxMinimized ? "px-4" : "px-1"}
                    `}
                    >
                        <button
                            type="button"
                            className=" relative h-[24px] "
                            onClick={minimizeSearchbox}
                        >
                            <FaRegWindowMinimize className=" absolute left-0 -top-2" />
                        </button>
                        <button type="button" onClick={closeSearchbox}>
                            <IoClose />
                        </button>
                    </div>
                </h2>
                <div className="m-4 grid gap-4">{searchedRooms}</div>
            </div>
        )
    );
}
export default SearchBox;
