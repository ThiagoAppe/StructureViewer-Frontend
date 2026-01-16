import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { apiUrl } from "../../api/config";

const PrincipalButtons = [
  {
    label: "Inicio",
    to: "/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25Z" />
      </svg>
    )
  },
  {
    label: "Servicios",
    to: "/pages",
    icon:
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0a2.251 2.251 0 011.974-1.586H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>,
  },
  {
    label: "Soporte",
    to: "/docs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5Zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    )
  },
  {
    label: "Account",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-500">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 
              7.488 0 0 0-5.982 2.975m11.963 
              0a9 9 0 1 0-11.963 0m11.963 
              0A8.966 8.966 0 0 1 12 21a8.966 
              8.966 0 0 1-5.982-2.275M15 
              9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    submenu: [
      { label: "Perfil", to: "/perfil" },
      { label: "Notificaciones", to: "/notifications" },
      { label: "Configuración", to: "/configuracion" },
      { label: "Soporte", to: "/soporte" },
      {
        label: "Cerrar sesión",
        action: async () => {
          try {
            await fetch(apiUrl("/users/logout"), {
              method: "POST",
              credentials: "include"
            });
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
          } finally {
            // Forzar recarga en la ruta de inicio para limpiar cualquier estado residual
            window.location.href = "/";
          }
        }
      }
      ,
    ]
  }
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-slate-900 px-0 pb-2">
      <div className="w-full max-w-screen-lg px-4 py-2 mx-auto bg-white shadow-md rounded-md mt-2" >
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          <Link to="/" className="mr-4 block cursor-pointer py-1.5 text-2xl text-slate-800 font-semibold">
            DZE
          </Link>

          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {PrincipalButtons.map((btn, index) => (
                !btn.submenu ? (
                  <li key={index} className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                    {btn.icon}
                    <Link to={btn.to} className="flex items-center">{btn.label}</Link>
                  </li>
                ) : null
              ))}

              {/* Botón de Cuenta */}
              <li ref={accountRef} className="relative flex items-center p-1 text-sm gap-x-2 text-slate-600 cursor-pointer">
                <div onClick={() => setMenuOpen(!menuOpen)} className="flex items-center">
                  {PrincipalButtons.find(btn => btn.label === "Account")?.icon}
                  <span className="ml-2">Cuenta</span>
                </div>

                {/* Menú de usuario */}
                {menuOpen && (
                  <ul className="absolute left-0 top-full mt-2 w-40 bg-white shadow-md rounded-lg z-50">
                    {PrincipalButtons.find(btn => btn.label === "Account")?.submenu.map((item, i) => (
                      <li key={i} className={`px-4 py-2 hover:bg-slate-900 ${item.label === "Cerrar sesión" ? "text-red-500" : ""}`}>
                        {item.to ? (
                          <Link to={item.to} className="w-full block text-left">{item.label}</Link>
                        ) : (
                          <button className="w-full text-left" onClick={item.action}>{item.label}</button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Menú hamburguesa */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
          </button>

          {/* Menú móvil (visible solo en pantallas pequeñas) */}
          {mobileMenuOpen && (
            <div className="w-full mt-4 flex flex-col gap-2 lg:hidden">
              {PrincipalButtons.map((btn, index) => (
                !btn.submenu ? (
                  <Link key={index} to={btn.to} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-900 rounded">
                    {btn.icon}
                    {btn.label}
                  </Link>
                ) : (
                  <div key={index} className="px-4 py-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      {btn.icon}
                      {btn.label}
                    </div>
                    <ul className="ml-6 flex flex-col gap-1">
                      {btn.submenu.map((item, i) => (
                        <li key={i}>
                          {item.to ? (
                            <Link to={item.to} className="block text-sm text-slate-600 hover:underline">{item.label}</Link>
                          ) : (
                            <button onClick={item.action} className="block text-sm text-red-500 hover:underline">{item.label}</button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          )}

        </div>
      </div>

    </nav>
  );
}

export default NavBar;
