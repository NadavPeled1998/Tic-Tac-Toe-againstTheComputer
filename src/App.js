import React from 'react';
import Board from './components/Board'
import Choose from './components/Choose'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      computerIsNext: false,
      gameLevel: "Noob", 
      game: false,
      Owins: "",
      Xwins: "",
    };
  }
  choosePlayer(val){
    if(!this.state.game && this.state.gameLevel !== ""){
        this.setState({
          computerIsNext: true,
          game: true
        })
        setTimeout(() => {
          let squares = this.state.squares.slice()
          if(this.state.gameLevel === "Noob" || this.gameLevel === "Intermediate"){
              let emptySquares = squares.filter(square => square == null)
              let random = Math.floor(Math.random()*emptySquares.length)
              if(squares[random] != null){
                for(let i = random; i<18; i++){
                  if(squares[i] == null){
                      random = i 
                      break 
                  }
                }
              }
              squares[random] = this.state.xIsNext ? 'X' : 'O' 
          }
          else if(this.state.gameLevel === "Impossible"){
            squares[4] = this.state.xIsNext ? 'X' : 'O'
          }
            this.setState({
              squares: squares,
              xIsNext: !this.state.xIsNext,
              computerIsNext: false
            })
          }, 1000);  
    }
  }
  handleChange(){
    let select = document.querySelector("select")
    this.setState({
      gameLevel: select.value,
      squares: Array(9).fill(null),
      xIsNext: true,
      computerIsNext: false,
      game: false
    })
  }
  handleClick(i) {
    let squares = this.state.squares.slice()
    if(this.calculateWinner(squares) || squares[i] || this.state.computerIsNext){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext,
      game: true
    })
    if(this.calculateWinner(squares)){
      return
    }
    if(this.state.gameLevel != ""){
      this.setState({
        computerIsNext: true
      })
      setTimeout(() => {
        if(this.state.gameLevel === "Noob"){
          let emptySquares = squares.filter(square => square == null)
          let random = Math.floor(Math.random()*emptySquares.length)
          if(squares[random] != null){
            for(let i = random; i<18; i++){
              if(squares[i] == null){
                  random = i 
                  break 
              }
            }
          }
          squares[random] = this.state.xIsNext ? 'X' : 'O' // right here i should write the algorithm that make it all random and change the 2
        }
        else if(this.state.gameLevel === "Intermediate"){
          if(this.goingToWin(squares) !== null){
            squares[this.goingToWin(squares)] = this.state.xIsNext ? 'X' : 'O'         
          }
          else{
            let emptySquares = squares.filter(square => square == null)
            let random = Math.floor(Math.random()*emptySquares.length)
            if(squares[random] != null){
              for(let i = random; i<18; i++){
                if(squares[i] == null){
                    random = i 
                    break 
                }
              }
            }
            squares[random] = this.state.xIsNext ? 'X' : 'O' 
          }
        }
        else if(this.state.gameLevel === "Impossible"){
          if(squares[4] === null){
            squares[4] = this.state.xIsNext ? 'X' : 'O'
          }
          else if(this.goingToWin(squares) !== null){
            squares[this.goingToWin(squares)] = this.state.xIsNext ? 'X' : 'O'         
          }
          else if(this.state.xIsNext && squares[4] === 'O'|| !this.state.xIsNext && squares[4] === 'X'){
            let emptySquares = []
            for(let i = 0; i<squares.length;i++){
              if(i === 0 || i === 2 || i === 6 || i === 8){
                if(squares[i] === null) {
                  emptySquares.push(i)
                }
              }
            }
            let random = Math.floor(Math.random()*emptySquares.length)
            squares[emptySquares[random]] = this.state.xIsNext ? 'X' : 'O' 
          }
          else if(this.state.xIsNext && squares[4] === 'X'|| !this.state.xIsNext && squares[4] === 'O'){
            if((squares[2] && squares[2] !== squares[4]) && squares[3] === null ){
              squares[3] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((squares[0] && squares[0] !== squares[4]) && squares[5] === null){
              squares[5] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((squares[6] && squares[6] !== squares[4]) && squares[5] === null){
              squares[3] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((squares[8] && squares[8] !== squares[4]) && squares[3] === null){
              squares[3] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((this.state.xIsNext && squares[1] === 'X'|| !this.state.xIsNext && squares[1] === 'O') && (squares[0] === null || squares[2] === null)){
              let emptySquares = []
              for(let i = 0; i<2; i++){
                if(i=== 0 || i === 2){
                  if(squares[i] === null){
                    emptySquares.push(i)
                  }
                }
              }
              let random = Math.floor(Math.random()*emptySquares.length)
              squares[emptySquares[random]] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((this.state.xIsNext && squares[3] === 'X'|| !this.state.xIsNext && squares[3] === 'O') && (squares[0] === null || squares[6] === null)){
              let emptySquares = []
              for(let i = 0; i<7; i++){
                if(i === 0 || i === 6){
                  if(squares[i] === null){
                    emptySquares.push(i)
                  }
                }
              }
              let random = Math.floor(Math.random()*emptySquares.length)
              squares[emptySquares[random]] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((this.state.xIsNext && squares[5] === 'X'|| !this.state.xIsNext && squares[5] === 'O') && (squares[2] === null || squares[8] === null)){
              let emptySquares = []
              for(let i = 2; i<9; i++){
                if(i=== 2 || i === 8){
                  if(squares[i] === null){
                    emptySquares.push(i)
                  }
                }
              }
              let random = Math.floor(Math.random()*emptySquares.length)
              squares[emptySquares[random]] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((this.state.xIsNext && squares[7] === 'X'|| !this.state.xIsNext && squares[7] === 'O') && (squares[6] === null || squares[8] === null)){
              let emptySquares = []
              for(let i = 6; i<9; i++){
                if(i === 6 || i === 8){
                  if(squares[i] === null){
                    emptySquares.push(i)
                  }
                }
              }
              let random = Math.floor(Math.random()*emptySquares.length)
              squares[emptySquares[random]] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((squares[1] && squares[1] === squares[3]) && (squares[1] != squares[4] && squares[0] === null)){
              squares[0] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((squares[1] && squares[1] === squares[5]) && (squares[1] != squares[4] && squares[2] === null)){
              squares[2] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((squares[3] && squares[3] === squares[7]) && (squares[3] != squares[4] && squares[6] === null)){
              squares[6] = this.state.xIsNext ? 'X' : 'O'
            }
            else if((squares[5] && squares[5] === squares[7]) && (squares[5] != squares[4] && squares[8] === null)){
              squares[8] = this.state.xIsNext ? 'X' : 'O'
            }
            else{
            let emptySquares = []
            for(let i = 1; i<squares.length;i++){
              if(i === 1 || i ===  3 || i === 5 || i === 7){
                if(squares[i] === null) {
                  emptySquares.push(i)
                }
              }
            }
            let random = Math.floor(Math.random()*emptySquares.length)
            squares[emptySquares[random]] = this.state.xIsNext ? 'X' : 'O'
            }
          }
          else {
            let emptySquares = squares.filter(square => square == null)
            let random = Math.floor(Math.random()*emptySquares.length)
            if(squares[random] != null){
              for(let i = random; i<18; i++){
                if(squares[i] == null){
                    random = i 
                    break 
                }
              }
            }
            squares[random] = this.state.xIsNext ? 'X' : 'O' 
          }
        }
          this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            computerIsNext: false
          })
        }, 1000);
    }
}
calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
goingToWin(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(this.state.xIsNext){
      if (squares[a] === 'X' && squares[a] === squares[b] && squares[c] === null) {
        return c;
      }
      else if(squares[a] === 'X' && squares[a] === squares[c] && squares[b] === null){
        return b
      }
      else if(squares[b] === 'X' && squares[b] === squares[c] && squares[a] === null){
        return a
      }
    }else{
      if( squares[a] === 'O' && squares[a] === squares[b] && squares[c] === null) {
        return c;
      }
      else if(squares[a] === 'O' && squares[a] === squares[c] && squares[b] === null){
        return b
      }
      else if(squares[b] === 'O' && squares[b] === squares[c] && squares[a] === null){
        return a
      }
    }
  }
  for(let i = 0; i< lines.length; i++){
    const [a, b, c] = lines[i];
    if ( squares[a] && squares[a] === squares[b] && squares[c] === null) {
      return c;
    }
    else if(squares[a] && squares[a] === squares[c] && squares[b] === null){
      return b
    }
    else if(squares[b] && squares[b] === squares[c] && squares[a] === null){
      return a
    }
  }
  return null;
  }
  gameOver(squares){
    for(let i = 0; i<squares.length;i++){
      if(squares[i] === null){
        return false
      }
    }
    return true
  }
  newGame(Xwins, Owins){
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      computerIsNext: false,
      game: false,
      Xwins: Xwins,
      Owins: Owins
    })
  }
  
  render(){
    const squares = this.state.squares
    const winner = this.calculateWinner(squares)
    const tie = this.gameOver(squares)
    let newGame = false;
    let Xwins = this.state.Xwins;
    let Owins = this.state.Owins
    let status;
    let Xturn = 'player';
    let Oturn ='player';
    if(winner){
      status = "Winner: " + winner;
      if(winner === "X"){
        Xwins = Number(Xwins)+1
      }
      else{
        Owins = Number(Owins)+1
      }
      newGame = true
    }
    else if(tie){
      status = "It's a Tie"
      newGame = true;  
    }
    else{
      if (this.state.xIsNext) {
        Xturn += ' turn';
      }else{
        Oturn += ' turn'
      }
    } 
    return (
      <div>
      <select onChange={() => this.handleChange()}>
        <option value="Noob">Noob</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Impossible">Impossible</option>
        <option value="">Play against friend</option>
      </select>
      <Choose game={!this.state.game}></Choose>
      <div>
      <div className={Xturn}>X {Xwins}</div>
      <div className={Oturn} onClick={(i) => this.choosePlayer()}>O {Owins}</div>
      </div>
      <div>{status}</div>
      <Board squares={squares}
      onClick={(i) => this.handleClick(i)}></Board>
      {newGame&&<button onClick={(i) =>this.newGame(Xwins,Owins)}>New Game</button>}
      </div>
    );
  }
}

export default App;
