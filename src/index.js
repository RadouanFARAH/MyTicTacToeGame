import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ayoub from './images/ayoub.png';
import redouane from './images/redouane.png';


function Square(props) {
   const OorX=props.value;
   if (OorX==='redouane') { 
     return (
        <button className="square" style={ {backgroundImage: `url(${redouane})`}} onClick={props.onClick}></button>
    )
  }
   else if (OorX==='ayoub') { 
     return (
        <button className="square" style={ {backgroundImage: `url(${ayoub})`}}  onClick={props.onClick}></button>
    )
  } 
  else return (<button className="square"  onClick={props.onClick}>{OorX}</button>)
  
}

class Board extends React.Component {

  renderSquare(i) { 
    return <Square value={this.props.squares[i]}  onClick={ () => this.props.onClick(i)}/>
  }

  render() {
  
    return (
      <div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  state = {
    history : [{
      squares : Array(9).fill(null)
    }],
    stepNumber : 0,
    xIsNext : true
  }
  
  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares)||squares[i]){return}
    squares[i]= this.state.xIsNext? 'redouane' : 'ayoub'
    this.setState({
    history: history.concat([{
        squares: squares,
      }]),
    stepNumber: history.length,
    xIsNext : !this.state.xIsNext,
    
  });
}

jumpTo=(step) => {
  this.setState({
      stepNumber: 0,
    });
}

  render() {
    let status;
    const history = this.state.history
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares)
    const draw = calculateDraw(current.squares)
  


    if (winner) {status = 'Winner :' + winner;}
    else if (draw) {status = draw}
    else {status = ('Next player: ') + (this.state.xIsNext? 'Redouane' : 'Ayoub');}
 

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick = {(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="button" onClick={() => this.jumpTo()}>{'Restart The Game'}</button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
      return squares[a]
    }
  }
  return null;
}


function isFull(squares){
  for (let i=0; i<9; i++) {
    if (squares[i]!=null){continue;}
    return false
  }
  return true

}

function calculateDraw(squares){
  if (!calculateWinner(squares) && isFull(squares)) {
    return 'It\'s a Draw'
  }
  else {return null}
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
