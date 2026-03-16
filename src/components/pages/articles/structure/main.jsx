import { useState } from "react";
import StructureTools from "./structureTools";
import StructureTree from "./treeRenderizer/structureTree";
import { fetchData } from "../../../api/request";

function StructureMain() {

    const [Codigo, SetCodigo] = useState("");
    const [estructura, SetEstructura] = useState(null);
    const [expandedNodes, SetExpandedNodes] = useState(new Set());
    const [loading, SetLoading] = useState(false);

    const buscarEstructura = async () => {
        if (!Codigo) return;
        SetLoading(true);

        try {

            const params = new URLSearchParams({
                codigo: Codigo
            });

            const endpoint = `/estructura?${params.toString()}`;
            const data = await fetchData(endpoint);

            SetEstructura(data?.[0] ?? null);
            SetExpandedNodes(new Set());

        } finally {
            SetLoading(false);
        }
    };

    const ToggleNode = (path) => {
        SetExpandedNodes(prev => {
            const next = new Set(prev);

            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    };

    const expandAll = () => {
        if (!estructura) return;

        const paths = new Set();
        const Traverse = (node, path = "0") => {

            paths.add(path);
            if (node.hijos && node.hijos.length > 0) {
                node.hijos.forEach((child, index) => {
                    Traverse(child, `${path}-${index}`);
                });
            }
        };

        Traverse(estructura);
        SetExpandedNodes(paths);
    };

    const collapseAll = () => {
        SetExpandedNodes(new Set());
    };

    return (
        <div>
            <StructureTools
                Codigo={Codigo}
                SetCodigo={SetCodigo}
                buscarEstructura={buscarEstructura}
                expandAll={expandAll}
                collapseAll={collapseAll}
                loading={loading}
            />

            <div className="ml-6">
                <StructureTree
                    estructura={estructura}
                    expandedNodes={expandedNodes}
                    toggleNode={ToggleNode}
                />
            </div>
        </div>
    );
}

export default StructureMain;