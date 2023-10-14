import React from 'react';
import './DraggableColorBox.css'

export default function DraggableColorBox(props) {
    return(
        <div className='Draggable-root' style={{backgroundColor: props.color, height: "calc(40vh - 64px)"}}>
            {props.name}
        </div>
    )
}
