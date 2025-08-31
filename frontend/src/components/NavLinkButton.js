import { Link } from "react-router-dom";

export default function NavLinkButton({ to, children }) {
    return (
        <Link
            to={to}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
            {children}
        </Link>
    );
}