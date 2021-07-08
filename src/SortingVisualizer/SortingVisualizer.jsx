import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, 
  getBubbleSortAnimations, getHeapSortAnimations} from './sortAlgos.js';
import './SortingVisualizer.css';

//DELAY = 10 is slow for bubble sort.
//maybe add a increaseDelay button??
const DELAY = 10;
//LENGTH is the size of the array
const LENGTH = 100;
const BAR_COLOR = 'yellowgreen';
const COMPARISON_COLOR = 'red';

/*
For each type of sort, the idea is that we push comparison values twice, once to change color
to red and then back to yellowgreen.
The third push actually swaps the values.
*/

/*
For merge sort, we overwrite into the main array instead of swapping(i.e the third push into the animationList)
*/
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < LENGTH; i++) {
      /*
      Why are the values from 5 to 600?
      If we use smaller values than 5, the bar is too small to be visible.
      Values are generated using the generateRandom(min, max) function defined at the end.
      */
      array.push(generateRandom(5, 600));
    }
    this.setState({array});
  }

  mergeSort() {
    const animationList = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animationList.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      /*
      Every third entry in the animationList is that of a swap and the first two are that of comparing, which
      we use to change colors back and forth.
      */
      const compareValues = i % 3 !== 2;
      if (compareValues) {
        const [b1_id, b2_id] = animationList[i];
        const b1_style = arrayBars[b1_id].style;
        const b2_style = arrayBars[b2_id].style;
        const color = i % 3 === 0 ? COMPARISON_COLOR : BAR_COLOR;
        setTimeout(() => {
          b1_style.backgroundColor = color;
          b2_style.backgroundColor = color;
        }, i * DELAY);
      } else {
        setTimeout(() => {
          const [b1_id, newHeight] = animationList[i];
          const b1_style = arrayBars[b1_id].style;
          //swapping means change the height of the bars.
          b1_style.height = `${newHeight}px`;
        }, i * DELAY);
      }
    }
  }

  quickSort() {
    const animationList = getQuickSortAnimations(this.state.array) ;
    const newAnimations = [] ;
    /*
      Every third entry in the animationList is that of a swap and the first two are that of comparing, which
      we use to change colors back and forth.
      */
    for(const animation of animationList){
      newAnimations.push(animation.comparison) ;
      newAnimations.push(animation.comparison) ;
      newAnimations.push(animation.swap) ;
    }
    for(let i = 0 ; i < newAnimations.length ; i++){
      const arrayBars = document.getElementsByClassName('array-bar') ;
      const compareValues = i % 3 !== 2 ;
      if(compareValues) {
        const [b1_id, b2_id] = newAnimations[i] ;
        const b1_style = arrayBars[b1_id].style ;
        const b2_style = arrayBars[b2_id].style ;
        const color = i % 3 === 0 ? COMPARISON_COLOR : BAR_COLOR ;
        setTimeout(() => {
          b1_style.backgroundColor = color ;
          b2_style.backgroundColor = color ;
        }, i * DELAY) ;
      } else {
        setTimeout(() => {
          //swap happens here
          const [b1_id, b2_id, b1_height, b2_height] = newAnimations[i] ;
          const b1_style = arrayBars[b1_id].style ;
          const b2_style = arrayBars[b2_id].style ;
          //swapping means change the height of the bars.
          b1_style.height = `${b2_height}px` ;
          b2_style.height = `${b1_height}px` ;
        }, i * DELAY) ;
      }
    }
  }

  heapSort() {
    const animationList = getHeapSortAnimations(this.state.array) ;
    const newAnimations = [] ;
    /*
      Every third entry in the animationList is that of a swap and the first two are that of comparing, which
      we use to change colors back and forth.
      */
    for(const animation of animationList){
      newAnimations.push(animation.comparison) ;
      newAnimations.push(animation.comparison) ;
      newAnimations.push(animation.swap) ;
    }
    for(let i = 0 ; i < newAnimations.length ; i++){
      const arrayBars = document.getElementsByClassName('array-bar') ;
      const compareValues = i % 3 !== 2 ;
      if(compareValues){
        const [barOneId, barTwoId] = newAnimations[i] ;
        const b1_style = arrayBars[barOneId].style ;
        const b2_style = arrayBars[barTwoId].style ;
        const color = i % 3 === 0 ? COMPARISON_COLOR : BAR_COLOR ;
        setTimeout(() => {
          b1_style.backgroundColor = color ;
          b2_style.backgroundColor = color ;
        }, i * DELAY) ;
      }
      else {
        setTimeout(() => {
          const [b1_id, b2_id, b1_height, b2_height] = newAnimations[i] ;
          const b1_style = arrayBars[b1_id].style ;
          const b2_style = arrayBars[b2_id].style ;
          //swapping means change the height of the bars.
          b1_style.height = `${b2_height}px` ;
          b2_style.height = `${b1_height}px` ;
        }, i * DELAY) ;
      }
    }
  }

  bubbleSort() {
    const animationList = getBubbleSortAnimations(this.state.array) ;
    for(let i = 0 ; i < animationList.length ; i++){
      const arrayBars = document.getElementsByClassName('array-bar') ;
      /*
      Every third entry in the animationList is that of a swap and the first two are that of comparing, which
      we use to change colors back and forth.
      */
      const compareValues = i % 3 !== 2 ;
      if(compareValues){
        const [b1_id, b2_id] = animationList[i] ;
        const b1_style = arrayBars[b1_id].style ;
        const b2_style = arrayBars[b2_id].style ;
        const color = i % 3 === 0 ? COMPARISON_COLOR : BAR_COLOR ;
        setTimeout(() => {
          b1_style.backgroundColor = color ;
          b2_style.backgroundColor = color ;
        }, i * DELAY);
      } else {
        setTimeout(() => {
          const [b1_id, b2_id, b1_height, b2_height] = animationList[i] ;
          const b1_style = arrayBars[b1_id].style ;
          const b2_style = arrayBars[b2_id].style ;
          //swapping means change the height of the bars.
          b1_style.height = `${b2_height}px` ;
          b2_style.height = `${b1_height}px` ;
        }, i * DELAY) ;
      }
    }
  }


  render() {
    const {array} = this.state;

    return (
      <div>
        <div className ="project_Name">
          <p>SORTING VISUALIZER</p>
        </div>
        <button 
        type = "button"
        className = "button_1"
        onClick={() => this.resetArray()}>Reset
        </button>
        <button 
        type = "button"
        className = "button_2"
        onClick={() => this.mergeSort()}>Merge Sort</button>
        <button 
        type = "button"
        className = "button_2"
        onClick={() => this.quickSort()}>Quick Sort</button>
        <button 
        type = "button"
        className = "button_2"
        onClick={() => this.heapSort()}>Heap Sort</button>
        <button 
        type = "button"
        className = "button_2"
        onClick={() => this.bubbleSort()}>Bubble Sort</button>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: BAR_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <br></br>
        
      </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function generateRandom(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
