import React, { useEffect, useState } from "react";
import { getLastMatch } from "../../api/match";
import { formatDate } from "../../helpers/formatDate"
import type { Match } from "../../types/match";

export const LastMatchDetails: React.FC = () => {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const data = await getLastMatch();
        setMatch(data);
      } catch (err) {
        setError("Erro ao carregar os dados da partida.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, []);

  const enemies = [
    { shortName: "São Paulo" },
    { shortName: "Corinthians" },
    { shortName: "Santos" },
    { shortName: "Flamengo" },
    { shortName: "Internacional" },
    { shortName: "Cruzeiro" },
  ]

  if (loading) return <div className="text-center mt-10">Carregando...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  if (!match) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Status */}
      <div className="text-center text-lg font-bold text-gray-700 mb-4">
        Status: {match.status}
      </div>

      {/* Times */}
      <div className="text-center text-xl font-semibold text-gray-800 mb-4">
        {match.homeTeam.shortName} vs {match.awayTeam.shortName}
      </div>

      {/* Data e Campeonato */}
      <div className="text-center text-gray-600 mb-6">
        {formatDate(match.matchDate)} - {match.competition.name}
      </div>

      {/* Cards dos Times */}
      <div className="flex justify-between items-center">
        {/* Time da Casa */}
        <div className="flex flex-col items-center">
          <img
            src={match.homeTeam.crest}
            alt={match.homeTeam.shortName}
            className={`w-32 h-32 mb-2 ${
              enemies.some(enemy => enemy.shortName === match.homeTeam.shortName) ? 'rotate-180' : ''
            }`}
          />
          <div className="text-lg font-bold">{match.homeScore}</div>
        </div>

        {/* Time Visitante */}
        <div className="flex flex-col items-center">
          <img
            src={match.awayTeam.crest}
            alt={match.awayTeam.shortName}
            className={`w-32 h-32 mb-2 ${
              enemies.some(enemy => enemy.shortName === match.awayTeam.shortName) ? 'rotate-180' : ''
            }`}
          />
          <div className="text-lg font-bold">{match.awayScore}</div>
        </div>
      </div>
    </div>
  );
};