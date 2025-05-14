import React from "react";

export const HomePage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const cardData = [
  {
    title: "Acompanhe os últimos jogos do Verdão e seus resultados",
    description: "Fique por dentro dos resultados das partidas mais recentes do Palmeiras, com detalhes e estatísticas.",
  },
    {
      title: "Acompanhe o resultado das competições",
      description: "Veja como o Palmeiras está se saindo nas competições atuais, com tabelas e classificações atualizadas.",
    },
    {
      title: "Veja o elenco atualizado",
      description: "Conheça os jogadores que fazem parte do elenco do Palmeiras, com informações detalhadas sobre cada atleta.",
    },
    {
      title: "História do Palmeiras",
      description: "Descubra a rica história do Palmeiras, desde sua fundação até os títulos mais importantes conquistados.",
    },
    {
      title: "Próximos jogos",
      description: "Confira a agenda dos próximos jogos do Palmeiras e prepare-se para torcer pelo Verdão.",
    },
  ];

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

      <div className="grid grid-cols-1 gap-4 w-full max-w-6xl my-16 px-4 sm:grid-cols-2 lg:grid-cols-5">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-green-700 p-6 rounded-lg shadow-lg hover:transform hover:-translate-y-1 
            hover:border-green-500 transition relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-8 bg-green-700"></div>
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              {card.title}
            </h3>
            <p className="text-sm text-gray-700">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <span className="text-green-700 font-bold">SportingBet</span>
          <span className="w-2 h-2 bg-green-700 rounded-full"></span>
        <span className="text-green-700 font-bold">Puma</span>
          <span className="w-2 h-2 bg-green-700 rounded-full"></span>
        <span className="text-green-700 font-bold">UNIASSELVI </span>
      </div>

      <footer className="text-center text-gray-600 mt-auto">
        Palmeiras © {currentYear}
      </footer>
    </div>
  );
};