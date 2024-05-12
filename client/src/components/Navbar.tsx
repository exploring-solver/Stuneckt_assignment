import { useAuth } from "@/utils/auth";
import Link from 'next/link';
const Navbar: React.FC = () => {
    const { isAuthenticated, user ,logout} = useAuth();
    return (
        <nav className="p-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-white font-bold">
                            Stuneckt-Online Blogging Platform
                        </a>
                    </div>
                    <div className="flex">
                        <Link href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
                            Search
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link href="/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
                                    Profile
                                </Link>
                                <a target= "_blank"href="https://github.com/exploring-solver/Stuneckt_assignment" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
                                    Github
                                </a>
                                <button onClick={logout} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
