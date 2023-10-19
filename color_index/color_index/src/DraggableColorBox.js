import React from 'react';
import './DraggableColorBox.css';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

export default function DraggableColorBox(props) {
    const {removeColor, name, color, colors, onDragEnd} = props;
    //const handleRemoveColor = () => {
    //    props.removeColor(name);
    //  };

        return(
            
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            
            <SortableContext items={colors} strategy={rectSortingStrategy}>

            <div className='Draggable-root' style={{backgroundColor: color, height: "calc(40vh - 64px)"}}>
            <div className='Draggable-boxcontent'>
                <span>{name}</span>
                <DeleteForeverSharpIcon className='delete-icon' onClick={() => removeColor(name)}/>
            </div>
            <div>
                 {color.name}
            </div>
            
            </div>

        </SortableContext>
        
        </DndContext>
    )
}
