import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import './PaletteList.css';
import bg from "./bg.svg";

class PaletteList extends Component {
    render() {
        const {palettes} = this.props;
        return(
            <div className='PaletteList-root' style={{backgroundImage: `url(${bg})`}}>
                <div className='PaletteList-container'>
                    <nav className='PaletteList-nav'>
                        <h1>React colors</h1>
                    </nav>
                    <div className='PaletteList-palettes'>
                        {palettes.map(palette => (
                                        <Link to={`/palette/${palette.id}`}>
                                        <MiniPalette {...palette}/>
                                        </Link>
                                    ))}
                    </div>
                </div>
        </div>
        )
    }
}

export default PaletteList;