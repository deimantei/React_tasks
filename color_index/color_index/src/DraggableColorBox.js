import React from 'react';
import './DraggableColorBox.css';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export default function DraggableColorBox(props) {
    const {removeColor, name, color} = props;
        return(
        <div className='Draggable-root' style={{backgroundColor: color, height: "calc(40vh - 64px)"}}>
            <div className='Draggable-boxcontent'>
                <span>{name}</span>
                <DeleteForeverSharpIcon className='delete-icon' onClick={() => removeColor(name)}/>
            </div>
            <div>
                 {props.name}
            </div>
        </div>
    )
}
