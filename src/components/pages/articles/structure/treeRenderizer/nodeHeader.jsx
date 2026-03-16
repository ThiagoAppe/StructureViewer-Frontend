import { motion } from "framer-motion";

function NodeHeader({ nodo, tieneHijos, expandido, onToggle }) {

    return (
        <motion.div
            className="inline-flex items-center whitespace-nowrap fo shadow-sm p-1 rounded-lg border cursor-pointer bg-white hover:bg-gray-500 text-base"
            onClick={onToggle}
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
        >

            {tieneHijos && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 mr-2 text-blue-500 transform transition-transform duration-300 ${expandido ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            )}

            <div className="flex items-center gap-x-4 text-black">

                <span className="font-bold">
                    {nodo.codigo}
                </span>

                <div className="flex items-center gap-x-2">
                    {nodo.letra_cambio && (
                        <span className="bg-slate-400 text-white font-semibold px-2 py-0.5 rounded-md shadow-sm">
                            {nodo.letra_cambio}
                        </span>
                    )}
                    <span className="bg-blue-300 font-semibold px-2 py-0.5 rounded-md shadow-sm">
                        {nodo.cantidad}
                    </span>
                </div>

                <span className="">
                    {nodo.descripcion}
                </span>

            </div>

        </motion.div>
    );
}

export default NodeHeader;