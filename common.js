/**
 * Common Utilities
 * Author: Ethan Wolz <ethan@creadiv.io>
 */

/**
 * Deep Find
 * @param {object} obj => Object to find from. 
 * @param {prop} prop => Property to find.
 */

const deepFind = (obj, val) => {
    for (let p in obj) {
        if (p === val && obj[p]) return obj[p];

        if (typeof obj[p] === 'object') {
            let current = deepFind(obj[p], val);
            if (current) return current;
        }
    }

    return false;
}

/**
 * 
 * @param {object} obj - Object to change
 * @param {string} val - Key on object to set
 * @param {*} set - Value to set val to 
 * Returns new object with val set
 */

const deepSet = (obj, val, set) => {
    for (let p in obj) {
        if (p === val) {
            obj[p] = set
            return obj;
        }

        if (typeof obj[p] === 'object') {
            let current = deepSet(obj[p], val, set);
            if (current) return current;
        }
    }

    return obj;
}

/**
 * arrayFind => Search an array of objects for a non-null value specified by value
 * @param {Array} arr => Array you will be searching
 * @param {string} value => the key you want to search by
 */

const arrayFind = (arr) => (value) => {
    if (typeof value !== 'string') throw new Error('Invalid datatype');

    for (let i = 0; i < arr.length; i++) {
        let current = deepFind(arr[i], value);
        if (current) return current;
    }
}

const sortBy = arr => (value, push) => {
    return arr.reduce((sum, val) => {
        let v = deepFind(val, value);
        if (sum[v]) {
            sum[v][push].push(val);
        } else {
            sum[v] = {};
            sum[v][push] = [val];
        }
        return sum;
    }, {});
}

const arraySet = (arr) => (prop, value) => {
    for (let i = 0; i < arr.length; i++) {
        deepSet(arr[i], prop, value);
    }

    return arr;
}

exports.deepFind = deepFind;
exports.deepSet  = deepSet;
exports.arrayFind = arrayFind;
exports.sortBy    = sortBy;
exports.arraySet  = arraySet;
