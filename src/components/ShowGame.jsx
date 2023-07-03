import PropTypes from "prop-types";
import { useEffect } from "react";
import Board from "./Board";

export default function ShowGame({ game, setGame }) {
    useEffect(() => {
        if (game.getCurrentPlayer().getName() == "Computer") {
            game.playRandomTurn();
            setGame({ ...game });
        }
    }, [game, setGame]);

    function onCellClick(row, column) {
        game.playTurn(row, column);
        setGame({ ...game });
    }

    return (
        <div className="ShowGame vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="boards-container d-flex">
                <div className="human-board-container me-5">
                    Human
                    <Board board={game.getPlayer("Human").getBoard()} />
                </div>
                <div className="computer-board-container ms-5">
                    Computer
                    <Board onCellClick={onCellClick} board={game.getPlayer("Computer").getBoard()} />
                </div>
            </div>
        </div>
    );
}

ShowGame.propTypes = {
    game: PropTypes.object.isRequired,
    setGame: PropTypes.func.isRequired,
};
