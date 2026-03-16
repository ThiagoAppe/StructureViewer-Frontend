import { motion, AnimatePresence } from "framer-motion";
import TreeNode from "./treeNode";

function NodeChildren({
    hijos,
    path,
    expandido,
    expandedNodes,
    toggleNode
}) {

    const TieneHijos = hijos && hijos.length > 0;

    return (
        <AnimatePresence initial={false}>
            {TieneHijos && expandido && (
                <motion.div
                    className="ml-4 pl-2 border-l border-gray-300 mt-2 max-w-max text-white "
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                >

                    {hijos.map((hijo, index) => {

                        const ChildPath = `${path}-${index}`;

                        return (
                            <TreeNode
                                key={ChildPath}
                                nodo={hijo}
                                path={ChildPath}
                                expandedNodes={expandedNodes}
                                toggleNode={toggleNode}
                            />
                        );
                    })}

                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default NodeChildren;