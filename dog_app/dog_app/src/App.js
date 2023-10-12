import React, { Component } from 'react';
import Routes from './Routes';
import Navbar from './Navbar';
import './App.css';
import Grafas from "./images/Grafas.jpg";
import Leila from "./images/Leila.jpg";
import Aira from "./images/Aira.jpg";
import Hugas from "./images/Hugas.jpg";

class App extends Component {
  static defaultProps = {
    dogs: [
      {
        name:"Grafas",
        age: 9,
        src: Grafas,
        facts: [
          "Gaudo bites ir širšes.",
          "Geras rytinis žadintuvas.",
          "Nebeturi priekinių dantų."
        ]
      },
      {
        name:"Leila",
        age: 5,
        src: Leila,
        facts: [
          "Miegalė, gali miegoti visur ir visada, nepatinka anksti keltis.",
          "Labai patinka vištiena, bet žalia, visada užuodžia, net jei ir būna kitame kambaryje.",
          "Lepūnėlė, o mes jos vergai, viską turime daryti pagal ją."
        ]
      },
      {
        name:"Aira",
        age: 5,
        src: Aira,
        facts: [
          "Bijo žodžio tapkė.",
          "Padovanota sesei kalėdų proga iš draugės.",
          "Aploja ir savus 😀."
        ]
      },
      {
        name:"Hugas",
        age: 3,
        src: Hugas,
        facts: [
          "Valgo viską, ir sakau nuoširdžiai viską…nuo torto iki plastmasės.",
          "Mėgsta bėgti iš namų.",
          "Draugauja su viskuo kas juda ar nejuda."
        ]
      },
    ]
  }

  render(){
   
    return (
      <div>
        <Navbar dogs={this.props.dogs}/>
        <div className='container'>
        <Routes dogs={this.props.dogs}/>
        </div>
      </div>
    );
  }
}

export default App;
