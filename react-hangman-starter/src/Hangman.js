import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyboardGuess);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyboardGuess);
  }

  reset(){
    this.setState({
      nWrong:0,
      guessed: new Set(),
      answer: randomWord(),
      inputValue: "",
      inputRef: null,
    })
  }
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  handleKeyboardGuess = (event) => {
    const keyPressed = event.key.toLowerCase();
    
    // Check if the game is over (6/6 wrong guesses or solved correctly)
    if (
      this.state.nWrong >= this.props.maxWrong ||
      this.guessedWord().join("") === this.state.answer
    ) {
      return; // Don't process further keyboard input
    }
  
    if (/^[a-z]$/.test(keyPressed) && !this.state.guessed.has(keyPressed)) {
      this.setState(
        (st) => ({
          guessed: st.guessed.add(keyPressed),
          nWrong: st.nWrong + (st.answer.includes(keyPressed) ? 0 : 1),
        }),
        () => {
          if (this.inputElement) {
            this.inputElement.focus(); // Set focus back to the input field if it exists
          }
        }
      );
    }
  };

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,index) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    let gameOver = this.state.nWrong >= this.props.maxWrong;
    const iswinner = this.guessedWord().join("") === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} wrong guesses`;
    let gameState = this.generateButtons();
    if(iswinner) gameState = "You Win!";
    if (gameOver) gameState = "You Lose!"
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText}/>
        <p>Guessed Wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>{!gameOver ? this.guessedWord() : this.state.answer}</p>
        <p className='Hangman-btns'>
        {gameState}</p>
        <button id='reset' onClick={this.reset}>Restart?</button>
        <input
        type="text"
        value={this.state.inputValue}
        onChange={this.handleInputChange}
        ref={(input) => (this.inputElement = input)} // Add this line
        />
        
      </div>
    );
  }
}

export default Hangman;
