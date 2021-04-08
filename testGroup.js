// const tourSeeder = [
//   {
//     country: 'Турция',
//     city: 'Анталья',
//     hotel: "Анталья Резорт",
//     price: 50000,
//     temperature: 21,
//     rating: 2,
//     stars: 3,
//   },
  
//   {
//     country: 'Греция',
//     city: 'Крит',
//     hotel: "Крит Резорт",
//     price: 70000,
//     temperature: 23,
//     rating: 4,
//     stars: 4,
//   },
//   {
//     country: 'Таиланд',
//     city: 'Самуи',
//     hotel: "Самуи Резорт",
//     price: 80000,
//     temperature: 24,
//     rating: 4,
//     stars: 4,
//   },
//   {
//     country: 'Турция',
//     city: 'Кемер',
//     hotel: "Кемер Резорт",
//     price: 60000,
//     temperature: 22,
//     rating: 3,
//     stars: 3,
//   },
//   {
//     country: 'Греция',
//     city: 'Санторини',
//     hotel: "Санторини Резорт",
//     price: 80000,
//     temperature: 25,
//     rating: 6,
//     stars: 4,
//   },
//   {
//     country: 'Таиланд',
//     city: 'Паттайя',
//     hotel: "Паттайя Резорт",
//     price: 90000,
//     temperature: 27,
//     rating: 7,
//     stars: 5,
//   },
//   {
//     country: 'Турция',
//     city: 'Бодрум',
//     hotel: "Бодрум Резорт",
//     price: 90000,
//     temperature: 28,
//     rating: 8,
//     stars: 5,
//   },
//   {
//     country: 'Греция',
//     city: 'Родос',
//     hotel: "Родос Резорт",
//     price: 100000,
//     temperature: 29,
//     rating: 9,
//     stars: 5,
//   },
//   {
//     country: 'Таиланд',
//     city: 'Пхукет',
//     hotel: "Пхукет Резорт",
//     price: 110000,
//     temperature: 30,
//     rating: 9.5,
//     stars: 5,
//   },
// ]

let array = [
  {country: 'Russia', city: 'Msc', id: 7},
  {country: 'Japan', city: 'Tokyo', id: 6},
  {country: 'Russia', city: 'Spb', id: 5},
  {country: 'Japan', city: 'Osaka', id: 4},
  {country: 'China', city: 'Beijing', id: 3},
  {country: 'Japan', city: 'Kobe', id: 2},
  {country: 'China', city: 'Shanghai', id: 1},
];


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

// console.log('all tours =>', getRepeated(array))
// console.log('all tours =>', forin(array))
// console.log('all tours =>', addOne({country: 'China', city: 'Beijing', id: 5}, array))
// 111
  // console.log('all tours =>', group(array))
  console.log('sort =>', group(array).map(el => el.sort((a, b) => a.id - b.id)).sort((a, b) => a[0].id - b[0].id))
  
 

