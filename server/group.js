function group(arr) {
  let finalResult = [];
  let uniqueArr = getUnique(arr)
  for (let i = 0; i < uniqueArr.length; i += 1) {
    finalResult.push(addOne(uniqueArr[i], arr))
  }
  function addOne(el, arr) {
    let resultArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].country === el.country) {
        resultArr.push(arr[i])
      }
    }
    return resultArr
  }
  
  function forin(arr, someEl) {
    let keys = arr.map(el => el.country);
    if (keys.includes(someEl)) {
      return true
    } else {
      return false
    }
  }
  function getUnique(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (!forin(result, arr[i].country)) {
        result.push(arr[i])
      }
    }
    return result
  }
  return finalResult
}

module.exports = group
