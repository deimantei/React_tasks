import React, {Component} from 'react';
import "./DogList.css";
import {Link} from 'react-router-dom';

class DogList extends Component {
    render() {
        return (
            <div className='DogList'>
                <h1 className='display-1 text-center my-4'>Šuniukų duomenų bazė!</h1>
                    <div className='row'>
                    {this.props.dogs.map(d => (
                        <div className='Dog col-lg-4 text-center' key={d.new}>
                            <Link to={`/dogs/${d.name}`}>
                            <img src={d.src} alt={d.name}/>
                            </Link>
                            <h3 className='my-3'><Link className="underline" to={`/dogs/${d.name}`}>
                            {d.name}
                            </Link></h3>
                        </div>
                    ))}
                    </div>
            </div>
        )
    }
}

export default DogList;