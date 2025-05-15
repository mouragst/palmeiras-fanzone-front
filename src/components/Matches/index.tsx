import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Adicionado
import { getAllMatches } from "../../api/match";
import type { Match } from "../../types/match";
import Loading from "../Loading";
import { formatDate } from "../../helpers/formatDate";

const statusLabels: Record<string, string> = {
  FINISHED: "Encerrado",
  IN_PLAY: "Em andamento",
  SCHEDULED: "Agendado",
  TIMED: "A confirmar",
  POSTPONED: "Adiado",
};

const enemies = [
    { shortName: "São Paulo" },
    { shortName: "Corinthians" },
    { shortName: "Santos" },
    { shortName: "Flamengo" },
    { shortName: "Internacional" },
    { shortName: "Cruzeiro" },
  ];

export const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Adicionado

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getAllMatches();
        setMatches(data);
      } catch (err) {
        setError("Erro ao carregar as partidas.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const groupedByCompetition = matches.reduce<Record<string, Match[]>>((acc, match) => {
    const compName = match.competition.name;
    if (!acc[compName]) acc[compName] = [];
    acc[compName].push(match);
    return acc;
  }, {});

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="text-center text-2xl font-bold text-gray-800 mb-8">
        Partidas do Palmeiras
      </div>
      {Object.entries(groupedByCompetition).map(([competition, matches]) => (
        <div key={competition} className="mb-10">
          <div className="flex items-center mb-4">
            {matches[0].competition.emblem && (
              <img
                src={matches[0].competition.emblem}
                alt={competition}
                className="w-8 h-8 mr-2"
              />
            )}
            <h2 className="text-xl font-semibold text-green-700">{competition}</h2>
          </div>
          <div className="flex flex-col gap-4">
            {matches
              .slice()
              .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime())
              .map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between bg-green-50 rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/partidas/${match.id}`)} // Adicionado
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.shortName}
                        className={`w-12 h-12 ${
                            enemies.some(enemy => enemy.shortName === match.homeTeam.shortName) ? "rotate-180" : ""
                        }`}
                    />
                    <span className="font-bold text-green-900">{match.homeTeam.shortName}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <span className="text-lg font-bold text-gray-800">
                      {match.homeScore} - {match.awayScore}
                    </span>
                    <span className="text-xs text-gray-500">
                      {statusLabels[match.status] || match.status}
                    </span>
                    <span className="text-xs text-gray-600">
                      {formatDate(match.matchDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-1 justify-end">
                    <span className="font-bold text-green-900">{match.awayTeam.shortName}</span>
                    <img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.shortName}
                        className={`w-12 h-12 ${
                            enemies.some(enemy => enemy.shortName === match.awayTeam.shortName) ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matches;