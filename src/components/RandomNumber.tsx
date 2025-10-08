import { useState } from "react";

export default function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomNumber = async () => {
    setIsGenerating(true);
    
    // Animación de generación
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newNumber);
    setIsGenerating(false);
  };

  const getNumberColor = (num: number) => {
    if (num <= 25) return "from-red-400 to-red-600";
    if (num <= 50) return "from-yellow-400 to-orange-500";
    if (num <= 75) return "from-blue-400 to-blue-600";
    return "from-green-400 to-green-600";
  };

  const getNumberEmoji = (num: number) => {
    if (num <= 25) return "🔥";
    if (num <= 50) return "⚡";
    if (num <= 75) return "💫";
    return "🌟";
  };

  return (
    <div className="min-h-[500px] w-full p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-6 animate-pulse">
            <span className="text-white text-3xl">🎲</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Generador Aleatorio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Descubre tu número de la suerte del 1 al 100
          </p>
        </div>

        {/* Botón Generador */}
        <div className="mb-12">
          <button
            onClick={generateRandomNumber}
            disabled={isGenerating}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isGenerating
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generando...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                🎰 Generar Número Aleatorio
              </span>
            )}
          </button>
        </div>

        {/* Resultado */}
        {randomNumber !== null && !isGenerating && (
          <div className="animate-fadeIn">
            <div className={`inline-block bg-gradient-to-br ${getNumberColor(randomNumber)} p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300`}>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-6xl mb-4">
                  {getNumberEmoji(randomNumber)}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Tu número es:
                </h2>
                <div className="text-8xl font-black text-white mb-4 drop-shadow-lg">
                  {randomNumber}
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2 inline-block">
                  <p className="text-white font-medium">
                    {randomNumber <= 25 && "¡Número bajo! 🔥"}
                    {randomNumber > 25 && randomNumber <= 50 && "¡En el medio! ⚡"}
                    {randomNumber > 50 && randomNumber <= 75 && "¡Número alto! 💫"}
                    {randomNumber > 75 && "¡Súper alto! 🌟"}
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Rango</div>
                <div className="font-bold text-gray-800 dark:text-gray-100">1-100</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Actual</div>
                <div className="font-bold text-gray-800 dark:text-gray-100">{randomNumber}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-2xl mb-1">🎲</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Tipo</div>
                <div className="font-bold text-gray-800 dark:text-gray-100">Aleatorio</div>
              </div>
            </div>
          </div>
        )}

        {/* Instrucciones iniciales */}
        {randomNumber === null && !isGenerating && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              ¡Presiona el botón!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Haz clic en el botón de arriba para generar tu primer número aleatorio entre 1 y 100.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}