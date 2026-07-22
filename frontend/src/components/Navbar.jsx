import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold text-blue-600">
                URL Shortener
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>

        </nav>
    );
}

export default Navbar;