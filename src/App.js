import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previousLetter: [],
      currentLetter: [],
      isAValidSeq: false,
      message: '',
      grid: [['a','b', 'c', 'x'],['d','e', 'f', 'y'], ['g', 'h', 'l', 'z']],
      word: '',
      dict: ['defy'],
      isWord: false
    };
  } 

  addLetter(x,y) {
    if (this.state.currentLetter.length < 1) {
      this.setState({currentLetter: [x, y]})
    } else  {
      this.checkWord([x,y])
    }
  }

  checkWord(arr) {
    let a = arr
    let b = this.state.currentLetter


    const isCol = a[0] === b[0]
    const isRow = a[1] === b[1]
    const isDiag = (a[0] - b[0] + a[1] - b[1]) % 2 === 0

    if (a.join('') === b.join('')) {
      return this.setState({message: 'Please provide two different letters'})
    } else if (!isRow && !isCol && !isDiag) {
      return this.setState({message: 'Please provide two letters that can create a word, either a diagonal a row or a column'})
    } else if (isRow) {
      console.log('triggered')
      let max
      let min 
      let isReversed = false
      
      if (a[0] > b[0]) {
        max = a
        min = b
      } else {
        max = b
        min = a
        isReversed = true
      } 
      console.log(max)
      console.log(min)
      let currentWord = ''
      while (max[0] !== min[0]) {
        console.log(max[0])
        console.log(max[1])
        currentWord += this.state.grid[max[1]][max[0]]
        max[0] -= 1
      }
      currentWord += this.state.grid[min[1]][min[0]]
      if (!isReversed) {
        currentWord = currentWord.split('').reverse().join('')
      }
      this.setState({word: currentWord})
      this.state.dict.includes(currentWord) ? this.setState({ message: 'is a correct word' }) : this.setState({ message : 'isnt a correct word' })
    }
    console.log(this.state.word)
  }
  
  render() {
    let result = ''
    if (!this.state.word.length === 0) {
      this.state.isWord ? result = 'is a correct word' : result = 'isnt a correct word';
    }
    return (
      <div className="App">
      <p>      {this.state.word}is a word ? {this.state.message}</p>
      <p>     old {this.state.previousLetter} et current {this.state.currentLetter}</p>

        <tbody>
          {this.state.grid.map((line, y) => {
            return (<div>
              {line.map((char, x) => {
                return (
                  <button  value={[x, y]}onClick={() => this.addLetter(x,y)}> {char}</button>
                )
              })}
            </div>
            ) 
          })}
        </tbody>
      </div>
    );
  }
}

export default App;
