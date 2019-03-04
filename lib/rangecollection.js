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
   * Merge the overlapping intervals.
   * @param {Array<number>} ranges
   */
  static mergeOverlap(ranges) {
    const sortedRanges = ranges.sort((rX, rY) => rX[0] - rY[0] || rX[1] - rY[1]);
    const result = [];
    let last;
    sortedRanges.forEach((range) => {
      if (!last || range[0] > last[1]) {
        last = range;
        result.push(last);
      } else if (range[1] > last[1]) {
        [last[1]] = [range[1]];
      }
    });

    return result;
  }

  /**
   * Remove a range from ranges array.
   * For eg remove [3, 19] from [1, 8] gives [1,3]
   * @param {Array<number>} range [1, 2].
   */
  removeRange(newRange) {
    const newRanges = [];
    this.ranges.forEach((currentRange) => {
      if (newRange[1] < currentRange[1]) {
        newRanges.push([Math.max(newRange[1], currentRange[0]), currentRange[1]]);
      }
      if (newRange[0] > currentRange[0]) {
        newRanges.push([currentRange[0], Math.min(newRange[0], currentRange[1])]);
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
      this.ranges = this.ranges.filter(r => r[0] !== range[0] || r[1] !== range[1]).concat([range]);
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
    this.result = this.constructor.mergeOverlap(this.ranges);
    this.fancyPrint = `[${this.result.join(') [').replace(/,/g, ', ')})`;
    return this.fancyPrint;
  }
}

export default RangeCollection;
