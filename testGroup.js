let array = [
  {country: 'Russia', city: 'Msc'},
  {country: 'Japan', city: 'Tokyo'},
  {country: 'Russia', city: 'Spb'},
  {country: 'Japan', city: 'Osaka'},
];

function addOne (el, arr) {
  let resultArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].country === el.country) {
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

const forin = (arr, someEl) => {
  let keys = arr.map(el => el.country) ;
  if (keys.includes(someEl)) {
    return true
  } else {
    return false
  }
}
const getRepeated = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (!forin(result, arr[i].country)) {
      result.push(arr[i])
    }
  }
  return result
}

function group (arr) {
  let result = [];
  let uniqueArr = getRepeated(arr)
  for (let i = 0; i < uniqueArr.length; i += 1) {
    result.push(addOne(arr[i], arr))
  }
  return result
}

console.log(group(array))
