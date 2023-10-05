import React, {Component} from 'react';

class Pokecard extends Component {
    render(){
    return (
        <div className='Pokecard'>
            <h1>{this.props.name}</h1>
        </div>
        );
    }
}

export default Pokecard;