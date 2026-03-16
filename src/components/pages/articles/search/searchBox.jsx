import React from "react";
import Loading from "../../../utils/loading.jsx";

function SearchBox({
    Codigo,
    SetCodigo,
    Descripcion,
    SetDescripcion,
    onSearch,
    loading
}) {
    return (
        <form
            className="w-full max-w-[500px] bg-white rounded-lg shadow-md pt-2 pb-4 px-4 mt-2 flex flex-col gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                onSearch();
            }}
        >

            <h2 className="text-gray-800 font-semibold text-2xl">
                Buscar artículos
            </h2>

            {/* Código + botón */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    Código
                </label>

                <div className="flex gap-2">

                    <input
                        type="text"
                        placeholder="Ej: 02429-01"
                        value={Codigo}
                        onChange={(e) => SetCodigo(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-5 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <Loading inline className="w-6 h-6" /> : "Buscar"}
                    </button>

                </div>
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    Descripción
                </label>

                <input
                    type="text"
                    placeholder="Ej: CIRC. IMPRESO"
                    value={Descripcion}
                    onChange={(e) => SetDescripcion(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
            </div>

        </form>
    );
}

export default SearchBox;