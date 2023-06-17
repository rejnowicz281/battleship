export default function Board() {
    const SIZE = 10;

    let arr = Array(SIZE)
        .fill(0)
        .map(() => Array(SIZE).fill(0));

    function getRandomCoordinates() {
        return [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
    }

    return {
        show: () => arr,
        isPopulated: (x, y) => Boolean(arr[x][y]),
        populate: (x, y) => (arr[x][y] = 1),
        getRandomCoordinates,
    };
}
