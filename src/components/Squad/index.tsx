import React, { useEffect, useState } from "react";
import { getSquad } from "../../api/squad";
import type { SquadMember } from "../../types/squad";
import { formatDateWithoutHour } from "../../helpers/formatDateWithoutHour";
import Loading from "../Loading";

const positionTranslator: Record<string, string> = {
  "Goalkeeper": "Goleiro",
  "Defence": "Defensor",
  "Midfield": "Meio-campista",
  "Offence": "Atacante",
  "Left Winger": "Ponta Esquerda",
  "Centre-Forward": "Centroavante",
  "Coach": "Técnico",
};

export const SquadPage: React.FC = () => {
  const [squad, setSquad] = useState<SquadMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSquad = async () => {
      try {
        const response = await getSquad();
        setSquad(response);
      } catch (err) {
        setError("Erro ao carregar o elenco.");
      } finally {
        setLoading(false);
      }
    };
    fetchSquad();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="text-center text-2xl font-bold text-gray-800 mb-8">
        Elenco do Palmeiras
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(Array.isArray(squad) ? squad : []).map((member) => (
          <div
            key={member.id}
            className="bg-green-50 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-white">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="text-lg font-semibold text-green-900 mb-1">{member.name}</div>
            <div className="text-sm text-green-700 mb-2">
              {positionTranslator[member.position] || member.position}
            </div>
            <div className="text-xs text-gray-600 mb-1">Idade: {member.age}</div>
            <div className="text-xs text-gray-600 mb-1">Nacionalidade: {member.nationality}</div>
            <div className="text-xs text-gray-600">Nascimento: {formatDateWithoutHour(member.dateOfBirth)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquadPage;