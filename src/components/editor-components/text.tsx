'use client';
import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import {Props} from './types'
import { useSocket } from '../../SocketContext';  // Import the socket context
import { useParams } from 'react-router-dom';



const TextComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const  socket  = useSocket(); 
  const { roomId } = useParams();
  const [textContent, setTextContent] = useState<string>(props.element.texttitle || 'Sample Text'); // Contentoptimization

  

  
  
  const handleDeleteElement = useCallback(() => {

  //const updatedElements = state.editor.elements.filter(
  //  (el) => el.id !== props.element.id
  //);

  //const updatedState = {
  //  ...state.editor,
  //  elements: updatedElements,
  //};

  dispatch({
    type: 'DELETE_ELEMENT',
    payload: { elementDetails: props.element },
  });

  setTimeout(() => {
    const updatedElements = JSON.stringify(state.editor.elements); // Replace with Redux `getState` if available
  
    socket.emit('componentDeleted', {
      roomId,
      updatedElements,
    });
  }, 0);

  console.log("Component deleted:", roomId, props.element.id, props.element,state);

}, [dispatch, props.element, socket, roomId]);


  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });

    //socket.emit('componentDropped', props.element);
  };

  const handleUpdateText = (e: React.FocusEvent<HTMLSpanElement>) => {
    const updatedText = e.target.innerText;
    setTextContent(updatedText);

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          texttitle: updatedText, 
        },
      },
    });
  };

  const styles = props.element.styles;

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    socket.emit('componentDropped', props.element);
  };

  return (
    <div
      style={styles}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
        {
          '!border-blue-500':
            state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}

    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <span
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onBlur={handleUpdateText}
        onDrop={handleOnDrop}  
      >
        {textContent}
      </span>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};


export const generateTextComponentCode = (element: EditorElement) => {
  return `
    const TextComponent = () => {
      const textContent = '${element.texttitle || 'Sample Text'}'; // Only export the changes made by the user
      const styles = ${JSON.stringify(element.styles)};
    
      return (
        <div style={styles} className="p-[2px] w-full m-[5px] relative text-[16px] transition-all">
          <span>
            ${element.texttitle || 'Sample Text'}
          </span>
        </div>
      );
    };
    
    export default TextComponent;
  `;
};



export default React.memo(TextComponent);