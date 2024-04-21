import { useGlobalContext } from "../../GlobalApp";
import { IoMdWarning } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

function Message() {
    const { isMessageShow, setIsMessageShow, msg, setMsg } = useGlobalContext();

    return (
        <>
            <AnimatePresence>
                {isMessageShow && (
                    <motion.div
                        className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(125,125,125,0.9)] z-20 "
                        initial={{ x: -1920, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: { staggerChildren: 1 },
                        }}
                        exit={{ x: 1920, opacity: 0 }}
                    >
                        <motion.div className=" grid gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[blue] text-white w-[clamp(320px,90vw,56ch)] px-4 py-12 text-center rounded-lg">
                            <IoMdWarning
                                size={32}
                                color="white"
                                className=" absolute  top-0 right-0 -translate-x-1/2 translate-y-1/2"
                            />
                            {msg}
                            <button
                                type="button "
                                className="flex items-center gap-2 bg-white text-[blue] font-semibold text-lg capitalize font-serif justify-self-center py-1 px-8 rounded-md"
                                style={{ fontVariant: "small-caps" }}
                                onClick={(e) => {
                                    setIsMessageShow(false);
                                    setMsg("");
                                }}
                            >
                                Close
                                <GrNext />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Message;
