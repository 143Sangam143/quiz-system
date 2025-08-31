import NavLinkButton from "./NavLinkButton";
import UserDropDown from "./UserDropDown";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    return (
        <header className="bg-white shadow-md">
            <div className="mx-auto px-20 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">Sangam</div>
                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <NavLinkButton to="/login">Login</NavLinkButton>
                            <NavLinkButton to="/register">Register</NavLinkButton>
                        </>
                    ) : (
                        <UserDropDown user={user} logout={logout} />
                    )}
                </div>
            </div>
        </header>
    );
}
