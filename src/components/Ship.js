export default function Ship(cords) {
    const length = cords.length;
    let hits = [];

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
        hit,
        isDestroyed,
        getHead: () => cords[0],
        getHits: () => hits,
        getCords: () => cords,
        getLength: () => length,
    };
}
