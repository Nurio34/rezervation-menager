import { useGlobalContext } from "../../GlobalApp";
import Floor from "../Floor";
import DoubleButton from "./DoubleButton";
import TwinButton from "./TwinButton";
import Search from "./Search";
import CheckRoom from "./CheckRoom";

function Rooms() {
    const { rooms } = useGlobalContext();

    return (
        <main className="Rooms grid gap-8 place-content-start pt-[100px] min-h-screen justify-center ">
            {rooms.map((floor) => (
                <Floor key={floor.floor} floor={floor} />
            ))}
            <div className="flex justify-center gap-8">
                <TwinButton />
                <DoubleButton />
                <CheckRoom />
            </div>
            <Search />
        </main>
    );
}

export default Rooms;
