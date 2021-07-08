import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer' ;
import './App.css';
/*
The inspiration and the CSS style elements of this project were taken from
https://www.youtube.com/watch?v=pFXYym4Wbkc&t=282s&ab_channel=Cl%C3%A9mentMihailescu
*/
function App() {
  return (
    <div className="App">
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
