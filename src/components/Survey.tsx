import { useState } from "react";

export default function Survey() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (rating !== null) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setRating(null);
    setSubmitted(false);
    setHoverRating(null);
  };

  const ratingLabels = {
    1: { emoji: "😞", text: "Muy insatisfecho", color: "from-red-400 to-red-600" },
    2: { emoji: "😕", text: "Insatisfecho", color: "from-orange-400 to-red-500" },
    3: { emoji: "😐", text: "Neutral", color: "from-yellow-400 to-orange-500" },
    4: { emoji: "🙂", text: "Satisfecho", color: "from-blue-400 to-blue-600" },
    5: { emoji: "😍", text: "Muy satisfecho", color: "from-green-400 to-green-600" },
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="min-h-[600px] w-full p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">

        {!submitted ? (
          <div className="text-center">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6">
                <span className="text-white text-3xl">📝</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Encuesta de Satisfacción
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Tu opinión es muy importante para nosotros
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                ¿Qué tan satisfecho estás con nuestro servicio?
              </h2>

              {/* Rating Display */}
              {displayRating && (
                <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-br ${ratingLabels[displayRating as keyof typeof ratingLabels].color} text-white transform transition-all duration-300`}>
                  <div className="text-6xl mb-3">
                    {ratingLabels[displayRating as keyof typeof ratingLabels].emoji}
                  </div>
                  <p className="text-2xl font-bold">
                    {ratingLabels[displayRating as keyof typeof ratingLabels].text}
                  </p>
                  <div className="text-4xl mt-2">
                    {'⭐'.repeat(displayRating)}
                  </div>
                </div>
              )}

              {/* Rating Options */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label 
                    key={star} 
                    className={`relative cursor-pointer group ${
                      rating === star ? 'scale-105' : 'hover:scale-105'
                    } transition-all duration-200`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={rating === star}
                      onChange={() => setRating(star)}
                      className="absolute opacity-0 w-full h-full"
                    />
                    <div className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
                      rating === star 
                        ? `border-indigo-500 bg-gradient-to-br ${ratingLabels[star as keyof typeof ratingLabels].color} text-white shadow-lg`
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                    }`}>
                      <div className="text-3xl mb-2">
                        {rating === star ? '⭐' : '☆'}
                      </div>
                      <div className={`text-sm font-medium ${
                        rating === star ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {star} estrella{star > 1 ? 's' : ''}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={rating === null}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform ${
                  rating === null
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:scale-105 shadow-lg'
                }`}
              >
                {rating === null ? '⏳ Selecciona una calificación' : '🚀 Enviar Encuesta'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            {/* Success State */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 shadow-2xl border-2 border-green-200 dark:border-green-700">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
                <span className="text-white text-4xl">✅</span>
              </div>
              
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-4">
                ¡Gracias por tu feedback!
              </h2>
              
              <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${ratingLabels[rating! as keyof typeof ratingLabels].color} text-white mb-6`}>
                <div className="text-5xl mb-3">
                  {ratingLabels[rating! as keyof typeof ratingLabels].emoji}
                </div>
                <p className="text-xl font-bold mb-2">
                  Has calificado con {rating} estrella{rating && rating > 1 ? 's' : ''}
                </p>
                <div className="text-3xl">
                  {'⭐'.repeat(rating!)}
                </div>
              </div>
              
              <p className="text-green-700 dark:text-green-400 mb-8 text-lg">
                🎉 Tu opinión nos ayuda a mejorar nuestros servicios.<br/>
                💬 Valoramos mucho tu tiempo y comentarios.
              </p>
              
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                📝 Nueva Encuesta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}