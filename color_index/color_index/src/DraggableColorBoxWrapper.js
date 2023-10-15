import React, { useState } from 'react';
import DraggableColorBox from "./DraggableColorBox";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, rectSwappingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import './DraggableColorBoxWrapper.css';

function DraggableColorBoxWrapper({ colors, color, name, removeColor, onDragEnd }) {
  const SortableColor = ({ color }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: color.name });
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

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      
      <SortableContext items={colors.map((color, index) => ({ id: color.name, index }))} strategy={rectSwappingStrategy}>
        {colors.map((color, index) => (
          <SortableColor key={color.name} color={color} />
        ))}
      </SortableContext>
  
    </DndContext>
  );
}

export default DraggableColorBoxWrapper;
