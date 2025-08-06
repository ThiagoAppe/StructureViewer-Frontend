import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FunctionCard from '../../utils/Functions/FunctionCard.jsx';
import { fetchData } from '../../api/request.jsx';
import Loading from "../../utils/loading.jsx";

const DocumentControlMain = () => {
    const [documentCategories, setDocumentCategories] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData("/Documents")
            .then(data => setDocumentCategories(data))
            .catch(err => setError(err.message));
    }, []);

    if (error) {
        return (
            <main className="flex-1 w-full px-4 py-6">
                <p className="text-red-500 text-center">Error: {error}</p>
            </main>
        );
    }

    if (!documentCategories) {
        return (
            <main className="flex-1 w-full px-4 py-6 flex justify-center items-center">
                <Loading className="h-40 w-40" />
            </main>
        );
    }

    return (
        <main className="flex-1 w-full px-6 py-6 bg-slate-900">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentCategories.map((category, index) => (
                    <Link to={category.path} key={index} className="block">
                        <FunctionCard
                            title={category.title}
                            description={category.description}
                            functions={category.functions}
                        />
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default DocumentControlMain;
