import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar.tsx"
import { HomePage } from "./components/HomePage/HomePage.tsx";
import { Footer } from "./components/Footer/Footer.tsx"
import { SobreNos } from "./components/SobreNos/SobreNos.tsx";
import { LoginPage } from "./components/LoginPage/LoginPage.tsx";
import { UserPerfil } from "./components/UserPerfil/UserPerfil.tsx";
import SettingsPage from "./components/SettingsPage/SettingsPage.tsx"
import { Feed } from "./components/Feed/Feed.tsx";


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
            <Route path="/sobrenos" element={<SobreNos />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/perfil" element={<><Navbar /><UserPerfil /></>} />
            <Route path="/settings" element={<><Navbar /><SettingsPage /></>} />
            <Route path="/feed" element={<><Navbar /><Feed /></>} />
        </Routes>
    );
}