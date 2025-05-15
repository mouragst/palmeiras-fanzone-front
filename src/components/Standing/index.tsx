import React, { useEffect, useState } from "react";
import { getStandings } from "../../api/standing";
import type { Standing } from "../../types/standing";
import Loading from "../Loading";

interface GroupedStandings {
  [competitionName: string]: Standing[];
}

interface GroupedByGroup {
  [groupName: string]: Standing[];
}

export const StandingPage: React.FC = () => {
  const [groupedStandings, setGroupedStandings] = useState<GroupedStandings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const data: Standing[] = await getStandings();
        const grouped = data.reduce((acc: GroupedStandings, standing) => {
          const compName = standing.competition.name;
          if (!acc[compName]) acc[compName] = [];
          acc[compName].push(standing);
          return acc;
        }, {});
        Object.keys(grouped).forEach((comp) => {
          grouped[comp].sort((a, b) => a.position - b.position);
        });
        setGroupedStandings(grouped);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, []);

  if (loading) return <Loading />;

  const groupByGroupName = (standings: Standing[]) => {
    const groups: GroupedByGroup = {};
    standings.forEach((standing) => {
      const group = standing.groupName || "Tabela Geral";
      if (!groups[group]) groups[group] = [];
      groups[group].push(standing);
    });
    Object.keys(groups).forEach((g) => {
      groups[g].sort((a, b) => a.position - b.position);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  };

  return (
    <div>
      {Object.entries(groupedStandings).map(([competition, standings]) => {
        const hasGroups = standings.some((s) => s.groupName);

        return (
          <div key={competition} className="mb-6">
            <h2 className="text-green-800 mb-2 text-lg font-semibold">{competition}</h2>
            <div className="overflow-x-auto">
              {hasGroups ? (
                groupByGroupName(standings).map(([group, groupStandings]) => (
                  <div key={group} className="mb-4">
                    <div className="text-green-700 font-semibold mb-1 text-sm">{group !== "Tabela Geral" ? group : null}</div>
                    <table className="min-w-[520px] w-full rounded-xl shadow-md bg-white text-xs">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-1 px-2 w-8 rounded-tl-xl font-medium">#</th>
                          <th className="py-1 px-2 text-left min-w-[120px] font-medium">Time</th>
                          <th className="py-1 px-2 w-8 font-medium">Pts</th>
                          <th className="py-1 px-2 w-8 font-medium">V</th>
                          <th className="py-1 px-2 w-8 font-medium">E</th>
                          <th className="py-1 px-2 w-8 font-medium">D</th>
                          <th className="py-1 px-2 w-8 font-medium">GP</th>
                          <th className="py-1 px-2 w-8 font-medium">GC</th>
                          <th className="py-1 px-2 w-8 rounded-tr-xl font-medium">SG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupStandings.map((standing, idx) => (
                          <tr
                            key={standing.id}
                            className={`${
                              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } ${standing.position === 1 ? "font-bold text-green-700" : ""}`}
                          >
                            <td className="py-1 px-2 text-center">{standing.position}</td>
                            <td className="py-1 px-2">
                              <div className="flex items-center gap-2">
                                {standing.team.crest && (
                                  <img
                                    src={standing.team.crest}
                                    alt={standing.team.name}
                                    className="w-5 h-5 rounded-full"
                                  />
                                )}
                                <span className="whitespace-nowrap">{standing.team.name}</span>
                              </div>
                            </td>
                            <td className="py-1 px-2 text-center">{standing.points}</td>
                            <td className="py-1 px-2 text-center">{standing.wins}</td>
                            <td className="py-1 px-2 text-center">{standing.draws}</td>
                            <td className="py-1 px-2 text-center">{standing.losses}</td>
                            <td className="py-1 px-2 text-center">{standing.goalsFor}</td>
                            <td className="py-1 px-2 text-center">{standing.goalsAgainst}</td>
                            <td className="py-1 px-2 text-center">{standing.goalDifference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <table className="min-w-[520px] w-full rounded-xl shadow-md bg-white text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-1 px-2 w-8 rounded-tl-xl font-medium">#</th>
                      <th className="py-1 px-2 text-left min-w-[120px] font-medium">Time</th>
                      <th className="py-1 px-2 w-8 font-medium">Pts</th>
                      <th className="py-1 px-2 w-8 font-medium">V</th>
                      <th className="py-1 px-2 w-8 font-medium">E</th>
                      <th className="py-1 px-2 w-8 font-medium">D</th>
                      <th className="py-1 px-2 w-8 font-medium">GP</th>
                      <th className="py-1 px-2 w-8 font-medium">GC</th>
                      <th className="py-1 px-2 w-8 rounded-tr-xl font-medium">SG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((standing, idx) => (
                      <tr
                        key={standing.id}
                        className={`${
                          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } ${standing.position === 1 ? "font-bold text-green-700" : ""}`}
                      >
                        <td className="py-1 px-2 text-center">{standing.position}</td>
                        <td className="py-1 px-2">
                          <div className="flex items-center gap-2">
                            {standing.team.crest && (
                              <img
                                src={standing.team.crest}
                                alt={standing.team.name}
                                className="w-5 h-5 rounded-full"
                              />
                            )}
                            <span className="whitespace-nowrap">{standing.team.name}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center">{standing.points}</td>
                        <td className="py-1 px-2 text-center">{standing.wins}</td>
                        <td className="py-1 px-2 text-center">{standing.draws}</td>
                        <td className="py-1 px-2 text-center">{standing.losses}</td>
                        <td className="py-1 px-2 text-center">{standing.goalsFor}</td>
                        <td className="py-1 px-2 text-center">{standing.goalsAgainst}</td>
                        <td className="py-1 px-2 text-center">{standing.goalDifference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};