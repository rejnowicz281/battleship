export default function Ship(length, head, direction = "left") {
    let alive = true;
    let hits = [];
    let cords = getCords();

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
        cords = getCords();
    }

    function moveTo(row, column) {
        head = [row, column];
        cords = getCords();
    }

    function hit(hitRow, hitColumn) {
        if (legalHit(hitRow, hitColumn)) {
            hits.push([hitRow, hitColumn]);
            return true;
        } else {
            return false;
        }
    }

    function isDestroyed() {
        if (hits.length) {
            hits.forEach((hitCord) => {
                if (!cords.some((cord) => cord[0] == hitCord[0] && cord[1] == hitCord[1])) {
                    return false;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    function isHitAt(hitRow, hitColumn) {
        return hits.some((cord) => cord[0] == hitRow && cord[1] == hitColumn);
    }

    function legalHit(hitRow, hitColumn) {
        return cords.some((cord) => cord[0] == hitRow && cord[1] == hitColumn) && !isHitAt(hitRow, hitColumn);
    }

    return {
        rotate,
        hit,
        isDestroyed,
        moveTo,
        isAlive: () => alive,
        destroy: () => (alive = false),
        getDirection: () => direction,
        getCords: () => cords,
        getHead: () => head,
        getHits: () => hits,
        getLength: () => length,
    };
}
