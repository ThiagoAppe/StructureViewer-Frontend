import NodeHeader from "./nodeHeader";
import NodeChildren from "./nodeChildren";

function TreeNode({ nodo, path, expandedNodes, toggleNode }) {

    const TieneHijos = nodo.hijos && nodo.hijos.length > 0;

    const Expandido = expandedNodes.has(path);

    const HandleToggle = () => {
        if (!TieneHijos) return;
        toggleNode(path);
    };

    return (
        <div className="my-1">
            <NodeHeader
                nodo={nodo}
                tieneHijos={TieneHijos}
                expandido={Expandido}
                onToggle={HandleToggle}
            />

            <NodeChildren
                hijos={nodo.hijos}
                path={path}
                expandido={Expandido}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
            />
        </div>
    );
}

export default TreeNode;