import React from "react";
import ArticleCard from "./articleCard";

function SearchResults({ articles }) {

    if (!articles || articles.length === 0) {
        return (
            <div className="w-full max-w-[900px] text-center text-gray-500 mx-auto">
                No se encontraron artículos.
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap justify-center gap-4">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.codigo} // key única y estable
                        Codigo={article.codigo}
                        Descripcion={article.descripcion}
                        Cambio={article.cambio}
                        Stock={article.stock}
                    />
                ))}
            </div>
        </div>
    );
}

export default SearchResults;