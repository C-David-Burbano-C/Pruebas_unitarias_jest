import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isFormValid = name.trim() !== "" && email.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid) {
      setSubmitted(true);
      // Limpiar el formulario
      setName("");
      setEmail("");
    }
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <div className="min-h-[400px] w-full p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-white text-2xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Registro</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Crea tu cuenta nueva</p>
        </div>

        {!submitted ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center gap-2">
                    <span>👤</span> Nombre completo
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ingresa tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center gap-2">
                    <span>📧</span> Correo electrónico
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                  isFormValid
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isFormValid ? '🚀 Crear Cuenta' : '⏳ Completa los campos'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 shadow-lg border-2 border-green-200 dark:border-green-700">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4 animate-pulse">
                <span className="text-white text-3xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-3">
                ¡Registro Exitoso!
              </h2>
              <p className="text-green-700 dark:text-green-400 mb-6 leading-relaxed">
                🎉 Te has registrado correctamente.<br/>
                📧 Pronto recibirás un email de confirmación.
              </p>
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                ➕ Nuevo Registro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}