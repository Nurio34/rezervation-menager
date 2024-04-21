import { useGlobalContext } from "../../GlobalApp";

function SearchBox() {
    const { rooms, isSearchBoxOpen, searchNode } = useGlobalContext();
    console.log(rooms);

    const searchedRooms = rooms.map((floorObj) => {
        return {
            ...floorObj,
            rooms: floorObj.rooms.map((roomObj) => {
                return { ...roomObj };
            }),
        };
    });

    console.log(searchedRooms);

    return (
        isSearchBoxOpen && (
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500">
                SearchBox
            </div>
        )
    );
}

export default SearchBox;
