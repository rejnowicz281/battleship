import PropTypes from "prop-types";

export default function Board({ board, onCellClick }) {
    let grid = board.getGrid();

    return (
        <div className="Board">
            {grid.map((row, i) => {
                return (
                    <div className="board-row" key={i}>
                        {row.map((cell, j) => {
                            return (
                                <div
                                    className={`board-cell${
                                        cell == "S" ? " ship" : cell == "M" ? " miss" : cell == "H" ? " hit" : ""
                                    }`}
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
};
