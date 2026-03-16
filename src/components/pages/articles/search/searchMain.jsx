import React, { useState } from "react";
import SearchBox from "./searchBox";
import SearchResults from "./searchResults";
import { fetchData } from "../../../api/request";

function SearchMain() {
    const [Codigo, SetCodigo] = useState("");
    const [Descripcion, SetDescripcion] = useState("");
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            if (!Codigo.trim() && !Descripcion.trim()) return;

            setLoading(true);
            const params = new URLSearchParams();

            if (Codigo.trim()) {
                params.append("field", "art_articu");
                params.append("value", Codigo.trim());
            } else if (Descripcion.trim()) {
                params.append("field", "art_descr1");
                params.append("value", Descripcion.trim());
                params.append("similar", "true");
            }

            params.append("limit", "50");
            params.append("offset", "0");

            const endpoint = `/articulos/search-articulo?${params.toString()}`;
            const data = await fetchData(endpoint);

            setArticles(data.results);
        } catch (error) {
            console.error("Error buscando artículos:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <SearchBox
                Codigo={Codigo}
                SetCodigo={SetCodigo}
                Descripcion={Descripcion}
                SetDescripcion={SetDescripcion}
                onSearch={handleSearch}
                loading={loading}
            />

            <SearchResults articles={articles} />
        </div>
    );
}

export default SearchMain;