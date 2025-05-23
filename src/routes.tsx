import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar.tsx"
import { HomePage } from "./components/HomePage/HomePage.tsx";
import { Footer } from "./components/Footer/Footer.tsx"
import { SobreNos } from "./components/SobreNos/SobreNos.tsx";
import { LoginPage } from "./components/LoginPage/LoginPage.tsx";
import { UserPerfil } from "./components/UserPerfil/UserPerfil.tsx";
import SettingsPage from "./components/SettingsPage/SettingsPage.tsx"
import { Feed } from "./components/Feed/Feed.tsx";
import Trending from "./components/TrendingPosts/Trending.tsx"
import { Conexoes } from "./components/TelaConexoes/Conexoes.tsx";
import { PostPage } from "./components/Post/PostPage.tsx";
import { Support } from "./components/Support/Support.tsx";
import { ContactList } from "./components/ContactList/ContactList.tsx"
import { NotificationList } from "./components/NotificationList/NotificationList.tsx";
import { ChatPage } from "./components/Chat/ChatPage.tsx";


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
            <Route path="/sobrenos" element={<><Navbar /><SobreNos /><Footer /></>} />
            <Route path="/login" element={<><Navbar /><LoginPage /><Footer /></>} />
            <Route path="/perfil" element={<><Navbar /><UserPerfil /></>} />
            <Route path="/settings" element={<><Navbar /><SettingsPage /><Footer /></>} />
            <Route path="/feed" element={
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <Navbar />
                    <div style={{ display: 'flex', justifyContent: 'center', flex: 1, gap: '50px' }}>
                        <Feed />
                        <Trending />
                    </div>
                </div>
            }
            />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/conexoes" element={<><Navbar /><Conexoes /></>} />
            <Route path="/support" element={<><Navbar /><Support /><Footer /></>} />
            <Route path="/contatos" element={<><Navbar /><ContactList /></>} />
            <Route path="/notificacoes" element={<><Navbar /><NotificationList /></>} />
            <Route path="/chat" element={<><Navbar /><ChatPage /></>} />
            <Route path="/chat/:userId" element={<><Navbar /><ChatPage /></>} />
        </Routes>
    );
}