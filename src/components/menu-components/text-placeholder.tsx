import { EditorBtns } from '../../pages/const';
import { TypeIcon } from 'lucide-react';
import React from 'react';
import { io } from "socket.io-client"; // Assuming socket.io client

// Initialize socket connection
const socket = io("http://localhost:5000");

type Props = {};

const TextPlaceholder = (props: Props) => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    
    // Get the cursor position (clientX and clientY)
    const position = { x: e.clientX, y: e.clientY };

    e.dataTransfer.setData('componentType', type);

    // Emit drag event to the server
    socket.emit('drag-component', { type, position });
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, 'text');
      }}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <TypeIcon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default TextPlaceholder;
