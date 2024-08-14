import React from 'react';
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import { ItemTypes } from '../constants/ItemTypes';

export default function Card({ id, text, left, top, moveCard, openModal }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleShowMore = () => {
    openModal(text + " (full text)");
  };

  return (
    <ResizableBox
      width={200}
      height={100}
      minConstraints={[100, 50]}
      maxConstraints={[400, 200]}
      style={{
        position: "absolute",
        left,
        top,
        border: "1px solid black",
        backgroundColor: "white",
        opacity: isDragging ? 0.5 : 1,
        padding: 10,
        overflow: "hidden",
      }}
      ref={drag}  // Attach drag ref directly to the ResizableBox
    >
      <div>
        <p>{text.slice(0, 50)}...</p>
        <button onClick={handleShowMore}>Show More</button>
      </div>
    </ResizableBox>
  );
}
