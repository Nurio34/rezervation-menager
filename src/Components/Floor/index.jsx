import Room from "../Room";

function Floor({ floor }) {
    return (
        <ul className="Floor flex w-[clamp(320px,100vw,1100px)]">
            {floor.rooms.map((room) => (
                <Room key={room.id} {...floor} room={room} />
            ))}
        </ul>
    );
}

export default Floor;
