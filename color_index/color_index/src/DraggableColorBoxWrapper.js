import React, {useState} from 'react';
import DraggableColorBox from "./DraggableColorBox";
import {DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    rectSwappingStrategy,
    useSortable,
    arraySwap
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import './DraggableColorBoxWrapper.css';

function DraggableColorBoxWrapper({colors, color, name, removeColor, onDragEnd}) {
    const SortableColor = ({color}) => {

        const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: color.name});
        const style = {
            transition,
            transform: CSS.Transform.toString(transform)
        };
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
            >
                <DraggableColorBox
                    colors={colors}
                    color={color.color}
                    name={color.name}
                    removeColor={removeColor}
                    onDragEnd={onDragEnd}
                />
            </div>
        );
    }
    console.log('Colors Array:', colors);
    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>

            <SortableContext items={colors.map((color) => color.id)} strategy={rectSwappingStrategy}
                             style={{display: 'grid'}}>
                {colors.map((color) => (
                    <SortableColor key={color.name} color={color}/>
                ))}
            </SortableContext>

        </DndContext>
    );
}

export default DraggableColorBoxWrapper;
