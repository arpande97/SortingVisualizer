/*
The code for the animation of mergeSort was taken from 
https://www.youtube.com/watch?v=pFXYym4Wbkc&t=282s&ab_channel=Cl%C3%A9mentMihailescu 
*/
export function getMergeSortAnimations(array) {
    const animationList = [];
    if (array.length <= 1) return array;
    const temp = array.slice();
    mergeSortHelper(array, 0, array.length - 1, temp, animationList);
    return animationList;
  }
  
  function mergeSortHelper(
    mainArray,
    startId,
    endId,
    temp,
    animationList,
  ) {
    if (startId === endId) return;
    const middleId = Math.floor((startId + endId) / 2);
    mergeSortHelper(temp, startId, middleId, mainArray, animationList);
    mergeSortHelper(temp, middleId + 1, endId, mainArray, animationList);
    doMerge(mainArray, startId, middleId, endId, temp, animationList);
  }
  
  function doMerge(mainArray, startId, middleId, endId, temp, animationList){
    let k = startId;
    let i = startId;
    let j = middleId + 1;
    while (i <= middleId && j <= endId) {
      animationList.push([i, j]);
      animationList.push([i, j]);
      if (temp[i] <= temp[j]) {
        animationList.push([k, temp[i]]);
        mainArray[k++] = temp[i++];
      } else {
        animationList.push([k, temp[j]]);
        mainArray[k++] = temp[j++];
      }
    }
    while (i <= middleId) {
      animationList.push([i, i]);
      animationList.push([i, i]);
      animationList.push([k, temp[i]]);
      mainArray[k++] = temp[i++];
    }
    while (j <= endId) {
      animationList.push([j, j]);
      animationList.push([j, j]);
      animationList.push([k, temp[j]]);
      mainArray[k++] = temp[j++];
    }
  }
/*
The quicksort here is done using the Lomuto partition.
In Lomuto partition, you compare each element with the last element and 
divide the array such that elements smaller than the pivot reside in 
one half of the array and the bigger ones at the other end.
*/
/*
Quicksort can be optimized if instead of chosing last element as
the pivot, we randomly select an element from the array as the pivot.
*/
  export function getQuickSortAnimations(array){
      const animationList = [] ;
      // const temp = array.slice() ;
      if(array.length <= 1) return array ;
      quickSortHelper(array, 0, array.length - 1, animationList) ;
      return animationList ;
  }

  function quickSortHelper(array, low, high, animationList, temp){
      if(low >= high) return ;
      const p = partition(array, low, high, animationList) ;
      quickSortHelper(array, low, p - 1, animationList) ;
      quickSortHelper(array, p + 1, high, animationList) ;
  }

  function partition(array, low, high, animationList){
      let pivot = array[high] ;
      let i = low - 1 ;
      for(let j = low ; j < high ; j++){
          const animation = {} ;
          animation.comparison = [j, high] ;
          if(array[j] < pivot){
              i++ ;
              animation.swap = [i, j, array[i], array[j]] ;
              let t = array[i] ;
              array[i] = array[j] ;
              array[j] = t ;

          }
          //we will be sending both the index and height of both the bars being compared into the animation list.
          //which is an object containing the comparison and swap property.
          else animation.swap = [j, j, array[j], array[j]] ;
          animationList.push(animation) ;
      }
      //we will be sending both the index and height of both the bars being compared into the animation list.
          //which is an object containing the comparison and swap property.
      animationList.push({
        comparison : [i + 1, i + 1], 
        swap : [i + 1, high, array[i + 1], array[high]], 
      }) ;
      let t = array[i + 1] ;
      array[i + 1] = array[high] ;
      array[high] = t ;
      return i + 1 ;
  }

  export function getBubbleSortAnimations(array){
    const animationList = [] ;
    if(array.length <= 1) return array ;
    for(let i = 0 ; i < array.length - 1 ; i++){
      for(let j = 0 ; j < array.length - i - 1 ; j++){
        animationList.push([j, j + 1]) ;
        animationList.push([j, j + 1]) ;
        if(array[j] > array[j + 1]){
          //we will be sending both the index and height of both the bars being compared into the animation list.
          //which is an object containing the comparison and swap property.
          animationList.push([j, j + 1, array[j], array[j + 1]]) ;
          let t = array[j] ;
          array[j] = array[j + 1] ;
          array[j + 1] = t ;
        }
        else{
          animationList.push([j, j, array[j], array[j]]) ;
        }
      }
    }
    return animationList ;
  }

  export function getHeapSortAnimations(array){
    const animationList = [] ;
    for(let i = Math.floor(array.length / 2) - 1 ; i >= 0 ; i--){
      heapify(array, animationList, array.length, i) ;
    }
    for(let i = array.length - 1 ; i > 0 ; i--){
      animationList.push({
        comparison : [i, i], 
        swap: [0, i, array[0], array[i]],
      }) ;
      let t = array[0] ;
      array[0] = array[i] ;
      array[i] = t ;
      heapify(array, animationList, i, 0) ;
    }
    return animationList ;
  }

  function heapify(array, animationList, n, id){
    let largest = id ;
    let l = (2 * id) + 1 ;
    let r = (2 * id) + 2 ;
    if(l < n && array[l] > array[largest]){
      animationList.push({
        comparison: [largest, l], 
        //we will be sending both the index and height of both the bars being compared into the animation list.
          //which is an object containing the comparison and swap property.
        swap: [largest, largest, array[largest], array[largest]],
      }) ;
      largest = l ;
    }
    if(r < n && array[r] > array[largest]){
      animationList.push({
        comparison: [largest, r],
        swap: [largest, largest, array[largest], array[largest]],
      }) ;
      largest = r ;
    }
    if(largest !== id){
      animationList.push({
        comparison: [id, id],
        //we will be sending both the index and height of both the bars being compared into the animation list.
          //which is an object containing the comparison and swap property.
        swap: [id, largest, array[id], array[largest]],
      }) ;
      let t = array[id] ;
      array[id] = array[largest] ;
      array[largest] = t ;
      heapify(array, animationList, n, largest) ;
    }
  }