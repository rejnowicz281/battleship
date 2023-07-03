import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NUM_OF_SHIPS } from "../helpers/config";
import Board from "./Board";

export default function CreateGame({ game, setGame }) {
    const navigate = useNavigate();
    const [currentShipLength, setCurrentShipLength] = useState(NUM_OF_SHIPS);
    const [currentShipDirection, setCurrentShipDirection] = useState("left");

    useEffect(() => {
        if (currentShipLength <= 0) {
            game.getPlayer("Computer").fillBoard();
            navigate("/battleship/showGame");
        }
    }, [currentShipLength, game, navigate]);

    function onCellClick(row, column) {
        if (game.getPlayer("Human").placeShip(currentShipLength, [row, column], currentShipDirection)) {
            setCurrentShipLength(currentShipLength - 1);
        }
        setGame({ ...game });
    }

    function handleRotate() {
        if (currentShipDirection === "left") {
            setCurrentShipDirection("up");
        } else if (currentShipDirection === "up") {
            setCurrentShipDirection("right");
        } else if (currentShipDirection === "right") {
            setCurrentShipDirection("down");
        } else if (currentShipDirection === "down") {
            setCurrentShipDirection("left");
        }
    }

    return (
        <div className="CreateGame vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
                <h1>Place your ships</h1>
                <span>Ships left: {NUM_OF_SHIPS - game.getPlayer("Human").getShips().length}</span>
            </div>
            <button onClick={handleRotate} className="btn btn-primary m-1">
                Rotate Ship (Current Direction - {currentShipDirection})
            </button>

            <Board onCellClick={onCellClick} board={game.getPlayer("Human").getBoard()} />
        </div>
    );
}

CreateGame.propTypes = {
    game: PropTypes.object.isRequired,
    setGame: PropTypes.func.isRequired,
};
