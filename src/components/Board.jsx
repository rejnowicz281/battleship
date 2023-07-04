import PropTypes from "prop-types";

export default function Board({ board, onCellClick, showShips = true }) {
    let grid = board.getGrid();

    function boardCellClass(cell) {
        if (cell == "S" && showShips) {
            return " ship";
        } else if (cell == "M") {
            return " miss";
        } else if (cell == "H") {
            return " hit";
        } else {
            return "";
        }
    }

    return (
        <div className="Board">
            {grid.map((row, i) => {
                return (
                    <div className="board-row" key={i}>
                        {row.map((cell, j) => {
                            return (
                                <div
                                    className={"board-cell" + boardCellClass(cell, i, j)}
                                    key={j}
                                    onClick={onCellClick ? () => onCellClick(i, j) : undefined}
                                ></div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

Board.propTypes = {
    board: PropTypes.object.isRequired,
    onCellClick: PropTypes.func,
    showShips: PropTypes.bool,
};
