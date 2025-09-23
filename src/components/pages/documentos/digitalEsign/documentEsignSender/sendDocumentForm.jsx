import React, { useState } from "react";

export default function SendDocumentsForm() {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [signers, setSigners] = useState([{ name: "", email: "", order: 1 }]);
    const [ccEmails, setCcEmails] = useState([]);
    const [iAmOnlySigner, setIAmOnlySigner] = useState(false);
    const [assignOrder, setAssignOrder] = useState(false);
    const [sendToCc, setSendToCc] = useState(false);

    const handleFileChange = (e) => setFiles([...e.target.files]);

    return (
        <main className="h-full w-fit mx-auto bg-white p-4 rounded-xl flex flex-col overflow-auto">
            <div className="w-full px-6 mx-auto flex flex-col items-center">
                {/* Paso 2 */}
                <div className="mb-6 w-[90%] flex flex-col items-center">
                    <p className="text-lg font-semibold mb-2">Paso 2: Agregar un título y mensaje</p>
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <label className="block font-medium mb-1">Título:</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Mensaje:</label>
                            <textarea
                                className="w-full border rounded-lg px-3 py-2"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Paso 3 */}
                <div className="mb-6 w-[90%] flex flex-col items-center">
                    <p className="text-lg font-semibold mb-2">Paso 3: Lista de firmantes</p>
                    <div className="self-start">
                        <div className="flex items-center gap-4 mb-2">
                            <input
                                type="checkbox"
                                checked={iAmOnlySigner}
                                onChange={(e) => setIAmOnlySigner(e.target.checked)}
                            />
                            <label>Soy el único firmante</label>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <input
                                type="checkbox"
                                checked={assignOrder}
                                onChange={(e) => setAssignOrder(e.target.checked)}
                            />
                            <label>Asignar un orden de firma</label>
                        </div>
                    </div>
                    {/* Lista de firmantes */}
                    <div className="flex flex-col gap-4">
                        {signers.map((s, i) => (
                            <div key={i} className="flex gap-4 items-end">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="border rounded-lg px-2 py-1"
                                    value={s.name}
                                    onChange={(e) => {
                                        const copy = [...signers];
                                        copy[i].name = e.target.value;
                                        setSigners(copy);
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="border rounded-lg px-2 py-1"
                                    value={s.email}
                                    onChange={(e) => {
                                        const copy = [...signers];
                                        copy[i].email = e.target.value;
                                        setSigners(copy);
                                    }}
                                />
                                {assignOrder && (
                                    <input
                                        type="number"
                                        min={1}
                                        className="border rounded-lg px-2 py-1 w-20"
                                        value={s.order}
                                        onChange={(e) => {
                                            const copy = [...signers];
                                            copy[i].order = e.target.value;
                                            setSigners(copy);
                                        }}
                                    />
                                )}
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                                    onClick={() => setSigners(signers.filter((_, idx) => idx !== i))}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <div className="flex gap-2 mt-2">
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded-lg"
                                onClick={() => setSigners([...signers, { name: "", email: "", order: 1 }])}
                            >
                                Añadir otro firmante
                            </button>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                                onClick={() => setSigners([...signers, { name: "Yo", email: "", order: 1 }])}
                            >
                                Incluirme como firmante
                            </button>
                        </div>
                    </div>
                </div>

                {/* CC */}
                <div className="mb-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={sendToCc}
                            onChange={(e) => setSendToCc(e.target.checked)}
                        />
                        <label>Enviar documentos terminados a personas adicionales</label>
                    </div>
                    {sendToCc && (
                        <div className="flex flex-col gap-2 mt-2">
                            {ccEmails.map((email, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <input
                                        type="email"
                                        placeholder="Correo CC"
                                        className="border rounded-lg px-2 py-1"
                                        value={email}
                                        onChange={(e) => {
                                            const copy = [...ccEmails];
                                            copy[idx] = e.target.value;
                                            setCcEmails(copy);
                                        }}
                                    />
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                                        onClick={() =>
                                            setCcEmails(ccEmails.filter((_, i) => i !== idx))
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded-lg mt-2"
                                onClick={() => setCcEmails([...ccEmails, ""])}
                            >
                                Añadir otro destinatario
                            </button>
                        </div>
                    )}
                </div>

                <button className="bg-green-600 w-1/2 text-white text-xl px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    Siguiente
                </button>
            </div>
        </main>
    );
}
