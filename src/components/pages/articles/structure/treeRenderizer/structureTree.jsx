import TreeNode from "./treeNode";

function StructureTree({ estructura, expandedNodes, toggleNode }) {

    if (!estructura) return null;

    return (
        <>
            <div>
                <TreeNode
                    nodo={estructura}
                    path="0"
                    expandedNodes={expandedNodes}
                    toggleNode={toggleNode}
                />
            </div>
        </>
    );
}

export default StructureTree;