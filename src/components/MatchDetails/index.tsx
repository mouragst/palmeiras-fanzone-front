import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMatchById } from "../../api/match";
import { formatDate } from "../../helpers/formatDate";
import type { Match } from "../../types/match";
import Loading from "../Loading";
import { ArrowLeft } from "lucide-react";

const statusLabels: Record<string, string> = {
    FINISHED: "Encerrado",
    IN_PLAY: "Em andamento",
    SCHEDULED: "Agendado",
    TIMED: "A confirmar",
    POSTPONED: "Adiado",
};

export const MatchDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatch = async () => {
      if (!id) {
        setError("ID da partida não encontrado na URL.");
        setLoading(false);
        return;
      }
      try {
        const data = await getMatchById(Number(id));
        setMatch(data);
      } catch (err) {
        setError("Erro ao carregar os dados da partida.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  const enemies = [
    { shortName: "São Paulo" },
    { shortName: "Corinthians" },
    { shortName: "Santos" },
    { shortName: "Flamengo" },
    { shortName: "Internacional" },
    { shortName: "Cruzeiro" },
  ];

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!match) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <button
        className="flex cursor-pointer items-center gap-2 mb-4 text-green-700 hover:text-green-900 transition font-medium"
        onClick={() => navigate("/partidas")}
      >
        <ArrowLeft size={20} />
        Voltar para lista de partidas
      </button>
      <div className="text-center text-2xl font-bold text-gray-800 mb-6">
        Detalhes da Partida
      </div>

      <div className="text-center text-lg font-semibold text-gray-600 mb-4">
        {formatDate(match.matchDate)} - {match.competition.name}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center">
          <img
            src={match.homeTeam.crest}
            alt={match.homeTeam.shortName}
            className={`w-32 h-32 mb-2 ${
              enemies.some(enemy => enemy.shortName === match.homeTeam.shortName) ? "rotate-180" : ""
            }`}
          />
          <div className="text-xl font-bold text-gray-800">{match.homeTeam.shortName}</div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-extrabold text-gray-800">
            {match.homeScore} - {match.awayScore}
          </div>
          <div className="text-sm text-gray-500 mt-2">{statusLabels[match.status] || match.status}</div>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={match.awayTeam.crest}
            alt={match.awayTeam.shortName}
            className={`w-32 h-32 mb-2 ${
              enemies.some(enemy => enemy.shortName === match.awayTeam.shortName) ? "rotate-180" : ""
            }`}
          />
          <div className="text-xl font-bold text-gray-800">{match.awayTeam.shortName}</div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="text-center text-gray-600">
          <span className="font-semibold">Competição:</span> {match.competition.name}
        </div>
        <div className="text-center text-gray-600 mt-2">
          <span className="font-semibold">Data:</span> {formatDate(match.matchDate)}
        </div>
      </div>
    </div>
  );
};