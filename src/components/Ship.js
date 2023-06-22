export default function Ship(length, head, direction = "left") {
    let hits = 0;

    function getCords() {
        let cords = [];
        for (let i = 0; i < length; i++) {
            let cord;
            if (direction == "right") {
                cord = [head[0], head[1] - i];
            } else if (direction == "down") {
                cord = [head[0] - i, head[1]];
            } else if (direction == "left") {
                cord = [head[0], head[1] + i];
            } else if (direction == "up") {
                cord = [head[0] + i, head[1]];
            }
            cords.push(cord);
        }
        return cords;
    }

    function hasCord(row, column) {
        return getCords().some((cord) => cord[0] == row && cord[1] == column);
    }

    function rotate() {
        if (direction == "right") {
            direction = "down";
        } else if (direction == "down") {
            direction = "left";
        } else if (direction == "left") {
            direction = "up";
        } else if (direction == "up") {
            direction = "right";
        }
    }

    function moveTo(row, column) {
        if (!isNaN(row) && !isNaN(column)) {
            head = [row, column];
        }
    }

    function hit() {
        hits++;
    }

    function isDestroyed() {
        return hits >= length;
    }

    return {
        rotate,
        hit,
        isDestroyed,
        moveTo,
        hasCord,
        getCords,
        getDirection: () => direction,
        getHead: () => head,
        getHits: () => hits,
        getLength: () => length,
    };
}
