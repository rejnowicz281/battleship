import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Game from "../Game";
import CreateGame from "./CreateGame";
import ShowGame from "./ShowGame";

export default function App() {
    const [game, setGame] = useState(Game());

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Navigate to="/battleship/createGame" />} />
                <Route path="/battleship/createGame" element={<CreateGame setGame={setGame} game={game} />} />
                <Route path="/battleship/showGame" element={<ShowGame setGame={setGame} game={game} />} />
            </Routes>
        </BrowserRouter>
    );
}
