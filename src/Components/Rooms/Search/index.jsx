import { useState } from "react";
import { useGlobalContext } from "../../../GlobalApp";

function Search() {
    const { setIsSearchBoxOpen, searchNode, setSearchNode } =
        useGlobalContext();

    const handleClick = () => {
        setIsSearchBoxOpen(true);
    };

    return (
        <div className="flex border-2 border-black justify-self-center rounded-[50vw] overflow-hidden min-w-80 ">
            <input
                type="search"
                name=""
                id=""
                className="py-1 px-4 outline-none grow"
                placeholder="Search by Name or Note..."
                onChange={(e) => setSearchNode(e.target.value)}
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
