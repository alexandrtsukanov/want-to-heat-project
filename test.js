// console.log(5 > '3')
// console.log('' == false)
// console.log([] == false)


// console.log(50000000000000000000000000 < Infinity)

let array = [1,2,3,4,2,3,4,2,2,3,3,4,3];

function addOne (el, arr) {
  let resultArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === el) {
      resultArr.push(arr[i])
    }
  }
  return resultArr
}

function unique(arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

function group (arr) {
  let result = [];
  let uniqueArr = unique(arr)
  for (let i = 0; i < uniqueArr.length; i += 1) {
    result.push(addOne(uniqueArr[i], arr))
  }
  return result
}

// console.log(group(array))

console.log(null > -Infinity)
