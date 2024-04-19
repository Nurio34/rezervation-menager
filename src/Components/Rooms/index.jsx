import { useGlobalContext } from "../../GlobalApp";
import Floor from "../Floor";

function Rooms() {
    const { rooms } = useGlobalContext();
    console.log(rooms);

    return (
        <main className="Rooms grid gap-8 place-content-start pt-[100px] min-h-screen justify-center">
            {rooms.map((floor) => (
                <Floor key={floor.floor} floor={floor} />
            ))}
        </main>
    );
}

export default Rooms;
