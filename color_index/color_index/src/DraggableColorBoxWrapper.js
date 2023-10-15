import React, { useState } from 'react';
import DraggableColorBox from "./DraggableColorBox";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, rectSwappingStrategy } from '@dnd-kit/sortable';

function DraggableColorBoxWrapper({ colors, color, name, removeColor }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      <SortableContext items={colors.map((color, index) => ({ id: color.name, index }))} strategy={rectSwappingStrategy}>
        {colors.map((color, index) => (
          <div key={color.name}>
            <DraggableColorBox
              index={index}
              color={color.color}
              name={color.name}
              removeColor={() => removeColor(color.name)}
            />
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default DraggableColorBoxWrapper;