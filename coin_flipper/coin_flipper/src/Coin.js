import React, {Component} from 'react';
import './Coin.css'

class Coin extends Component {
    render(){
       return( 
       <div className='Coin'>
        <img src={process.env.PUBLIC_URL + this.props.info.imgSrc} alt={this.props.info.side}/>
       </div>
       )} 
}

export default Coin;