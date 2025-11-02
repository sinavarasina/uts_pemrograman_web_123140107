import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Playlist from "./routes/Playlist";
import About from "./routes/About";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />

                    <Route path="/playlist" element={<Playlist />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
