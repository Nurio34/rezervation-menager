import { useState } from "react";
import { useGlobalContext } from "../../../GlobalApp";

function Search() {
    const { setIsSearchBoxOpen, searchNode, setSearchNode } =
        useGlobalContext();

    const handleClick = () => {
        setIsSearchBoxOpen(true);
    };

    return (
        <div
            className=" absolute bottom-16 flex justify-self-center rounded-[50vw] overflow-hidden min-w-80 "
            style={{ boxShadow: "0 0 5px black,0 0 10px black,0 0 15px black" }}
        >
            <input
                type="search"
                name=""
                id=""
                className="py-1 px-4 outline-none grow"
                placeholder="Search by Name or Note..."
                onChange={(e) => setSearchNode(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleClick();
                    }
                }}
                value={searchNode}
            />
            <button
                type="button"
                className="py-1 px-2 bg-[orangered] text-white font-semibold text-lg capitalize"
                style={{ fontVariant: "smal" }}
                onClick={handleClick}
            >
                Search
            </button>
        </div>
    );
}

export default Search;
