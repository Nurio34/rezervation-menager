import { useGlobalContext } from "../../GlobalApp";

function SearchBox() {
    const { rooms, isSearchBoxOpen, searchNode } = useGlobalContext();

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
                <div key={roomObj.id} className=" bg-red-100 grid gap-4">
                    {roomObj.rezervations.map((rezervation) => {
                        return (
                            <div key={rezervation.no} className="">
                                <p>Room : {roomObj.id}</p>
                                <p>Name : {rezervation.name} </p>
                                <p>Checkin : {rezervation.checkin} </p>
                                <p>Checkout : {rezervation.checkout} </p>
                                <p>Details : {rezervation.detail} </p>
                            </div>
                        );
                    })}
                </div>
            );
        });

    return (
        isSearchBoxOpen && (
            <div
                className="SearchBox max-h-96 min-w-96 overflow-auto p-4 grid gap-4
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500"
            >
                {searchedRooms}
            </div>
        )
    );
}

export default SearchBox;
