'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

//each function must have description
/**
 * identity: Returns a value, unchanged
 * 
 * @param {value} value: The value to be returned
 *
 */
function identity(value) {
    return value;
}
module.exports.identity = identity;

/**
 * typeOf: Returns the type of value as a string.
 * 
 * @param {value} value: A value to test the type of.
 *
 */
 function typeOf(value) {
    if (Array.isArray(value)) {
        return 'array';
    } else if (value === null) {
            return 'null';
    } else if (value === undefined) {
        return 'undefined';
    } else {
        return typeof value;
    }
}
module.exports.typeOf = typeOf;
 
 /**
  * first: Returns the first item of an array, or first given number of items. 
  * 
  * @param {array} array: An array in which values are returned from.
  * @param {number} number: The number of values first encountered to return
  * from array. 
  * 
  */
  function first(array, number) {
    let result = [];
    if (!Array.isArray(array)) {
        //
        return [];
    } else if (!number) {
        return array[0];
    } else if (number > array.length) {
        for (let i = 0; i < array.length; i++)
        result.push(array[i]);
     } else {
        for (let i = 0; i < number; i++) {
            result.push(array[i]);
        }
    }
    return result;
}
module.exports.first = first;

/**
 * last: Returns the last item of an array, or given number of last items.
 * 
 * @param {array} array: The array given to return values from.
 * @param {number} number: The number of values to return from the end 
 * of the array.
 */
 function last(array, number) {
    if (!Array.isArray(array) || number < 0) {
        return [];
    } else if (!number) {
        return array[array.length -1];
    } else if (number > array.length) {
        return array;
     } else {
            return array.slice(-number);
       } 
}
module.exports.last = last;

/**
 * indexOf: Returns the index of the first occurance of a value within the
 * given array. 
 * 
 * @param {array} array: The array in which to search for the value.
 * @param {value} value: The value to look for within the array.
 */
 function indexOf(array, value) {
    //return index of array that is first === to value
    //return -1 if value is not in array
    //loop through array, 
    //return when/if value is found
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * contains: Returns a boolean based on whether the given array contains the 
 * given value.
 * 
 * @param {array} array: The array to search for the given value.
 * @param {value} value: The value to search for within the given array.
 */
function contains(array, value) {
    return array.includes(value) ? true:false;
}
module.exports.contains = contains;

/**
 * unique: Returns a new array of elements from given array, without any 
 * dupplicates.
 * 
 * @param {array} array: The given array to loop through.
 */
 function unique(array) {
   let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (indexOf(newArray, array[i]) === -1) { 
            newArray.push(array[i]);
        }
    }
    return newArray;
}
module.exports.unique = unique;
 
/**
 * filter: Returns a new array of elements from the given array that return 
 * true from the given function.
 * 
 * @param {array} array: The array given to pass each element through the
 * function.
 * @param {function} func: The function used to test each element of the array,
 * resulting in a boolean value;
 */
 function filter(array, func) {
    let newArray = [];
    each(array, (element, index, array) => {
       if (func(element, index, array)) {
        newArray.push(element);
        }
    });
    return newArray;
}
module.exports.filter = filter;

/**
 * reject: Returns a new array of elements from the given array that return
 * false from the given function.
 * 
 * @param {array} array: The array given to pass each element through the
 * function.
 * @param {function} func: The function used to test each element of the array,
 * resulting in a boolean value.
 */
 function reject(array, func) {
 return filter(array, (element, index, array) => {
        return !func(element, index, array);
    });
}
module.exports.reject = reject;

/**
 * partition: Returns an array containing two sub arrays, with elements from
 * the given array separated into both. The first array contains elements that
 * returned true from the given function, and the second array contains 
 * elements that returned false from the given function. 
 * 
 * @param {array} array: The array to be partitioned into two arrays of 
 * truthy and falsy values based on function outcome.
 * @param {function} func: The function in which tests each element of the 
 * array and returns a boolean value. 
 */
 function partition(array, func) {
    let newArray = [];
    let truthy = [];
    let falsy = [];
        each(array, (element, index, collection)=> {
            if(func(element, index, array)) {
                truthy.push(element); 
            } else {
                falsy.push(element);
            }
        });
    newArray[0] = truthy;
    newArray[1] = falsy;
    return newArray;
}
module.exports.partition = partition;

/**
 * map: Determines if collection is an array or object, then passes each
 * element through the given function, saves the return values of the function
 * to an array, then returns the new array. 
 * 
 * @param {array or object} collection: The array or object to take the 
 * elements from and pass through the function.
 * @param {function} func: The function used to test or modify the elements to
 * be returned in the new array. 
 */
 function map(collection, func) {
     let newArray = [];
    each(collection, function(element, index, coll){
        newArray.push(func(element, index, coll));
    });
    return newArray;
}
module.exports.map = map;

/**
 * pluck: Loops through an array of objects, looking for properties that match
 * the given property, and returns an array containing the values matching
 * the given property.
 * 
 * @param {array of objects} array: This is an array of objects to search 
 * through and compare properties to the given property.
 * @param {property} prop: The property to search the array for and retrieve
 * the values of. 
 */
 function pluck(array, prop){
  let newArray =  map(array, (element, index, collection) => {
          return element[prop];
          }
      );
   
   return newArray;
}
module.exports.pluck = pluck;

/**
 * every: Passes a function on every element of the given collection. If every
 * element returns true from the given function, true is returned. If any
 * element returns false from the given function, false is returned. 
 * If no function is given, the elements will just be tested if they return
 * a boolean of true or false.
 * 
 * @param {array or object} collection: An array or object of which the 
 * elements are tested.
 * @param {function} action: The function that will test the elements and
 * return a boolean.
 */
 function every(collection, action) {
 if(Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
        if (typeof action !== 'function') {
            if (!collection[i]) {
             return false;
        }
         } else if (!action(collection[i], i, collection)) {
            return false;
        }
    } 
    return true;
} else { 
        for (let key in collection) {
            if (typeof action !== 'function') {
                if (!collection[key]) {
                 return false;
            }
            } else if (!action(collection[key], key, collection)) {
                return false;
            }
        }
    }
    return true;
    
}
module.exports.every = every;

/**
 * some: Similar to every, every element of the given object or array is tested
 * but if at least one element returns true, true is returned. If none of the 
 * elements return true, false is returned. 
 * 
 * @param {array or object} collection: An array or object of which the 
 * elements are tested.
 * @param {function} action: The function that will test the elements and 
 * return a boolean value. This function takes the current value/element, 
 * key/index, and the collection.
 */
 
 function some(collection, action) {
    let truthCheck = false;
if (typeof action !== 'function') {
    each(collection, (e, i, c) => {
        if (e) {
            truthCheck = true;
        }
    });
} else {
    each(collection, (e, i, c) => {
        if (action(e, i, c)) {
            truthCheck = true;
        }
    });
} 
return truthCheck;
}
module.exports.some = some;

/**
 * reduce: Calls a function on every element of the array, the result of
 * the last function is returned.
 * 
 * @param {array} array: The array to iterate through and pass each element
 * to the function.
 * @param {function} action: The function to be executed on each element of 
 * the array.This function takes the previous result, element, and index.
 * @param {seed} seed: To be used as the previous result when initially 
 * passing your function through the first element. This seed gets reassigned
 * within the function as the previous result, then returned for the final 
 * result.
 */

function reduce(array, action, seed) {
      each(array, (e, i, a) => {
 if (seed === undefined) {
     seed = array[0]; //assign seed to first value if undefined
 } else {
        seed = action(seed, e, i);
    }});
 
    return seed;
}
module.exports.reduce = reduce;

/**
 * extend: Takes an object and an indefinite amount of objects, then copies 
 * properties from all other objects into the first object. 
 * 
 * @param{object} object1: This object will collect all of the properties from
 * the other given objects.
 * @param{object or multiple objects} ...args: The objects put in as
 * arguments here will have their properties pushed
 * 
 */

function extend (object1, ...args) {
    for (let i = 0; i < args.length; i++) { //loop through args?
        let objects = args[i];
            for (let key in objects) {
                object1[key] = objects[key]; //assign properties t object from args
            } //loop through object at index
        }
    return object1;
}
 
 module.exports.extend = extend;