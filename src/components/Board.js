export default function Board() {
    const SIZE = 10;

    let arr = Array(SIZE)
        .fill(0)
        .map(() => Array(SIZE).fill(0));

    function getRandomCoordinates() {
        return [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
    }

    function validCords(x, y) {
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE || isPopulated(x, y)) {
            return false;
        } else {
            return true;
        }
    }

    function isPopulated(x, y) {
        return arr[x][y] == 1;
    }

    return {
        show: () => arr,
        isPopulated,
        populate: (x, y) => (arr[x][y] = 1),
        validCords,
        getRandomCoordinates,
        getSize: () => SIZE,
    };
}
