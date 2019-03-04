/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

class RangeCollection {
  /**
   * Initiate with empty array to store ranges.
   */
  constructor() {
    this.ranges = [];
  }

  /**
   * Validate a range array.
   * @param {Array<number>} validate range length and ordering.
   */
  static validateRange(range) {
    if (range.length === 2 && range[0] <= range[1]) {
      return true;
    }

    throw new Error('Length of range should be two and in increasing order.');
  }

  /**
   * Checks whether two range overlaps or not.
   * @param {Array<number>} rangeX
   * @param {Array<number>} rangeY
   */
  static intersects(rangeX, rangeY) {
    return Math.max(rangeX[0], rangeY[0]) <= Math.min(rangeX[1], rangeY[1]);
  }

  /**
   * Add a range from ranges array.
   * For eg add [1, 5] from [3, 8] gives [1,8]
   * @param {Array<number>} range [int, int].
   */
  addRange(newRange) {
    const newRanges = [];
    let intersection = false;

    this.ranges.forEach((range) => {
      if (this.constructor.intersects(range, newRange)) {
        newRanges.push([Math.min(range[0], newRange[0]), Math.max(range[1], newRange[1])]);
        intersection = true;
      } else {
        newRanges.push(range);
      }
    });
    if (!intersection) { newRanges.push(newRange); }
    return newRanges;
  }

  /**
   * Remove a range from ranges array.
   * For eg remove [3, 19] from [1, 8] gives [1,3]
   * @param {Array<number>} range [1, 2].
   */
  removeRange(newRange) {
    const newRanges = [];
    this.ranges.forEach((range) => {
      if (newRange[1] < range[1]) {
        newRanges.push([Math.max(newRange[1], range[0]), range[1]]);
      }
      if (newRange[0] > range[0]) {
        newRanges.push([range[0], Math.min(newRange[0], range[1])]);
      }
    });
    return newRanges;
  }

  /**
   * Adds a range to the collection also confirm if its duplicate interval.
   * @param {Array<number>} range like [1, 2].
   */
  add(range) {
    if (this.constructor.validateRange(range)) {
      if (this.ranges.length) {
        this.ranges = this.addRange(range);
      } else {
        this.ranges.push(range);
      }
    }
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    if (this.constructor.validateRange(range)) {
      this.ranges = this.removeRange(range);
    }
  }

  /**
   * Prints out the list of ranges in the range collection
   * Takes the result and modify the values to print it well.
   * Convert the array to string and modify as per specs.
   * [1, 10] should look like [1, 10)
   */
  print() {
    this.result = this.ranges.sort();
    this.fancyPrint = `[${this.result.join(') [').replace(/,/g, ', ')})`;
    return this.fancyPrint;
  }
}

export default RangeCollection;
