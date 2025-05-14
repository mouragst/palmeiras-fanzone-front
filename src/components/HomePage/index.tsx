import React from "react";

export const HomePage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-[95vh] p-4">
      <div className="mb-6">
        <img
          src="https://crests.football-data.org/176319.png"
          alt="Escudo do Palmeiras"
          className="w-40 h-40"
        />
      </div>

      <h1 className="text-center text-3xl font-bold mb-4">
        Central do{" "}
        {/* <span className="text-green-600">Palmeiras</span>, o MAIOR CAMPEÃO DO{" "}
        <span className="text-green-500 bg-yellow-400 px-1 rounded">
          BRASIL!
        </span> */}
      </h1>

      <p className="text-center text-gray-700 mb-6">
        Acompanhe as informações de partidas, elenco e competições do verdão,
        tudo em um único site só.
      </p>

      <button className="bg-gray-100 border border-green-600 text-green-700 px-6 py-2 rounded shadow hover:bg-green-100 transition mb-8">
        Resultado da última partida
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="card bg-white p-4 rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition">
          Card 1
        </div>
        <div className="card bg-white p-4 rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition">
          Card 2
        </div>
        <div className="card bg-white p-4 rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition">
          Card 3
        </div>
      </div>

      {/* Patrocinadores */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <img
          src="https://via.placeholder.com/100x50"
          alt="Patrocinador 1"
          className="w-24 h-auto"
        />
        <img
          src="https://via.placeholder.com/100x50"
          alt="Patrocinador 2"
          className="w-24 h-auto"
        />
        <img
          src="https://via.placeholder.com/100x50"
          alt="Patrocinador 3"
          className="w-24 h-auto"
        />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 mt-auto">
        Palmeiras © {currentYear}
      </footer>
    </div>
  );
};