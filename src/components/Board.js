export default function Board() {
    let arr = Array(10)
        .fill(0)
        .map(() => Array(10).fill(0));

    return {
        show: () => arr,
        isPopulated: (x, y) => Boolean(arr[x][y]),
        populate: (x, y) => (arr[x][y] = 1),
    };
}
