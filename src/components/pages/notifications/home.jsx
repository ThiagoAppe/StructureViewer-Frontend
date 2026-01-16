import React, { useState } from "react";

function NotificationsHome() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nueva actualización",
      message: "El sistema fue actualizado correctamente",
      read: false,
      createdAt: "2025-12-31 21:30"
    },
    {
      id: 2,
      title: "Recordatorio",
      message: "Tenés una tarea pendiente",
      read: true,
      createdAt: "2025-12-31 18:10"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Notificaciones
        </h2>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {unreadCount} sin leer
        </span>
      </header>

      <section className="divide-y divide-gray-100">
        {notifications.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-gray-500">
            No hay notificaciones
          </div>
        )}

        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-6 py-4 transition ${
              notification.read
                ? "bg-white"
                : "bg-blue-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className={`text-sm font-medium ${
                    notification.read
                      ? "text-gray-800"
                      : "text-blue-900"
                  }`}
                >
                  {notification.title}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {notification.message}
                </div>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-400">
              {notification.createdAt}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default NotificationsHome;
