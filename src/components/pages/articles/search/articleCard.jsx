import React from "react";

function ArticleCard({ Codigo, Descripcion, Cambio, Stock }) {
    const codigo = Codigo?.trim();
    const descripcion = Descripcion?.trim();
    const cambio = Cambio?.trim();
    const stock = Stock ?? "-";

    return (
        <div className="w-[500px] bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
            {/* Fila Código + Cambio + Stock */}
            <div className="flex justify-between items-center gap-4 mb-2">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Código</span>
                    <span className="font-mono text-lg font-semibold text-gray-900">{codigo}</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Cambio</span>
                    <span className="font-semibold text-blue-600">{cambio || "-"}</span>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500">Stock</span>
                    <span className="font-semibold text-gray-900">{stock}</span>
                </div>
            </div>

            {/* Descripción */}
            <div>
                <span className="text-gray-700">{descripcion}</span>
            </div>
        </div>
    );
}

export default ArticleCard;