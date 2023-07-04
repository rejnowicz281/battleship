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

    function checkWinner() {
        if (game.getPlayer("Human").allShipsDestroyed()) {
            return "Computer";
        } else if (game.getPlayer("Computer").allShipsDestroyed()) {
            return "Human";
        } else {
            return null;
        }
    }

    return (
        <div className="ShowGame vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
                <h1>Battleships</h1>
                <div>Current Player: {game.getCurrentPlayer().getName()}</div>
                {checkWinner() && <b>Winner: {checkWinner()}</b>}
            </div>
            <div className="boards-container d-flex">
                <div className="human-board-container me-5">
                    <h3 className="text-center">Human</h3>
                    <Board board={game.getPlayer("Human").getBoard()} />
                </div>
                <div className="computer-board-container ms-5">
                    <h3 className="text-center">Computer</h3>
                    <Board
                        onCellClick={checkWinner() ? undefined : onCellClick}
                        board={game.getPlayer("Computer").getBoard()}
                        showShips={false}
                    />
                </div>
            </div>
        </div>
    );
}

ShowGame.propTypes = {
    game: PropTypes.object.isRequired,
    setGame: PropTypes.func.isRequired,
};
