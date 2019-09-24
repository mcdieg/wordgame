import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previousLetter: [],
      currentLetter: [],
      message: '',
      grid: [['a','b', 'c', 'x'],['d','e', 'f', 'y'], ['g', 'h', 'l', 'z'],['g', 'h', 'l', 'z']],
      word: '',
      dict: ['defy'],
      isWord: false
    };
  } 

  addLetter(x,y) {
    if (this.state.currentLetter.length < 1) {
      this.setState({currentLetter: [x, y]})
    } else  {
      this.checkDirection([x,y])
    }
  }

  checkDirection(arr) {
    let a = arr
    let b = this.state.currentLetter
    let direction 

    if (a[0] === b[0]) {
      direction = 'col'
    } else if (a[1] === b[1]) {
      direction = 'row'
    } else if ((a[0] - b[0] + a[1] - b[1]) % 2 === 0) {
      direction = 'diag'
    }

    if (a.join('') === b.join('')) {
      return this.setState({message: 'Please provide two different letters'})
    } else if (!direction === 'col' && !direction === 'row' && !direction === 'diag') {
      return this.setState({message: 'Please provide two letters that can create a word, either a diagonal a row or a column'})
    }
    
    this.createWord(a, b, direction)
  }

  createWord(a, b, direction) {
    let max
    let min 
    let isReversed = false
    let currentWord = ''

    if (direction) {
      let marker
      let yDir = 0
      direction === ('row' || 'diag') ? marker = 0 : marker = 1

      if (a[marker] > b[marker]) {
        max = a
        min = b
      } else {
        max = b
        min = a
        isReversed = true
      } 

      if (direction === 'diag') {
        max[1] > min[1] ? yDir = -1 : yDir = 1
      }

      while (max[marker] !== min[marker]) {
        currentWord += this.state.grid[max[1]][max[0]]
        direction === 'diag' ? max[0] -= 1 : max[marker] -= 1
        max[1] += yDir
      }
      currentWord += this.state.grid[min[1]][min[0]]
    } 
    if (!isReversed) {
      currentWord = currentWord.split('').reverse().join('')
    }
    this.setState({word: currentWord})
    this.state.dict.includes(currentWord) ? this.setState({ message: 'is a correct word 🎉' }) : this.setState({ message : 'isnt a correct word 🤔' })
    this.setState({currentLetter: []})
  }

  render() {
    return (
      <div className="App">
        <tbody className='Grid'>
          <p> {this.state.word} {this.state.message} </p>
          {this.state.grid.map((line, y) => {
            return (<div className='Row'>
              {line.map((char, x) => {
                return (
                  <a className='Button' value={[x, y]}onClick={() => this.addLetter(x,y)}> {char}</a>
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
