import { useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Trophy, BarChart, LogIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
}

export function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
    const location = useLocation();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const navItems = [
        { path: '/home', label: 'Home', icon: <Home size={22} /> },
        { path: '/partidas', label: 'Partidas', icon: <Trophy size={22} /> },
        { path: '/elenco', label: 'Elenco', icon: <Users size={22} /> },
        { path: '/competicoes', label: 'Competições', icon: <Calendar size={22} /> },
        { path: '/classificacao', label: 'Classificação', icon: <BarChart size={22} /> },
    ];

    return (
        <div
            className={`fixed inset-y-0 left-0 transform ${
                isExpanded ? 'w-64' : 'w-16'
            } bg-white text-green-700 transition-all duration-300 flex flex-col 
            justify-between border-r border-green-300`
        }
            style={{ height: '100vh' }}
        >
            <div className="h-1 w-full flex">
                <div className="flex-1 bg-green-500 border-b border-gray-200"></div>
                <div className="flex-1 bg-white border-b border-gray-200"></div>
                <div className="flex-1 bg-red-500 border-b border-gray-200"></div>
            </div>

            <div className="flex flex-col items-center justify-start p-4 space-y-2">
                <img
                    src="https://crests.football-data.org/1769.png"
                    alt="Logo"
                    className="h-10 w-10"
                />
                {isExpanded && (
                    <h1 className="text-lg font-bold text-green-700">Palmeiras Zone</h1>
                )}
            </div>

            <hr className="border-green-300" />
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2 mt-4">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className={`flex items-center px-4 py-2 cursor-pointer transition-colors duration-300 ${
                                location.pathname === item.path
                                    ? 'border-l-4 border-green-500 bg-emerald-100'
                                    : 'hover:bg-green-100'
                            }`}
                        >
                            {item.icon}
                            {isExpanded && <span className="ml-3">{item.label}</span>}
                        </li>
                    ))}
                </ul>
            </nav>
            <button
                onClick={toggleSidebar}
                className="absolute top-1/2 right-[-14px] transform -translate-y-1/2 flex items-center justify-center p-1 bg-green-500 hover:bg-green-400 text-white rounded-md"
            >
                {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </button>
            <div className="flex items-center justify-center p-4 border-t border-green-300">
                <div
                    className="flex items-center justify-center w-full p-2 border border-green-500 rounded-md hover:bg-green-100 transition-all"
                >
                    <LogIn />
                    {isExpanded && <span className="ml-2">Entrar</span>}
                </div>
            </div>
        </div>
    );
}