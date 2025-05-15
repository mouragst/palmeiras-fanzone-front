import React, { useEffect, useState } from "react";
import { getCompetitions } from "../../api/competition";
import type { Competition } from "../../types/competition";
import Loading from "../Loading";

export const CompetitionPage: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await getCompetitions();
        setCompetitions(data);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  if (loading) { return <Loading />; }

    return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 py-10">
        <ul className="w-full max-w-xl space-y-6">
        {competitions.map((competition) => (
            <li
            key={competition.id}
            className="flex items-center bg-white rounded-xl shadow-md px-8 py-6"
            >
            <img
                src={competition.emblem}
                alt={competition.name}
                className="w-16 h-16 mr-6 rounded-md bg-gray-100 object-contain"
            />
            <div>
                <span className="font-bold text-2xl text-gray-900">{competition.name}</span>
                <span className="ml-4 text-lg text-gray-500">({competition.type})</span>
            </div>
            </li>
        ))}
        </ul>
    </div>
    );
};
