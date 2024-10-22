/**
 * Splits an array into smaller arrays (chunks) of a specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to be split into chunks.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {T[][]} An array containing the chunks.
 */
export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		chunks.push(arr.slice(i, i + chunkSize));
	}
	return chunks;
}
