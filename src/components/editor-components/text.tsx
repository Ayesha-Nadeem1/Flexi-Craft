'use client';
import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState, useCallback, useEffect } from 'react';
import {Props} from './types'
import { useSocket } from '../../SocketContext';  
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const TextComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const  socket  = useSocket(); 
  const { roomId } = useParams();
  const [textContent, setTextContent] = useState<string>(props.element.texttitle || 'Sample Text'); // Contentoptimization

  const handleDeleteElement = useCallback(() => {

  dispatch({
    type: 'DELETE_ELEMENT',
    payload: { elementDetails: props.element },
  });

  setTimeout(() => {
    const updatedElements = JSON.stringify(state.editor.elements);

    socket.emit('componentDeleted', {
      roomId,
      updatedElements,
      deletedElement: props.element,  
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

     socket.emit('elementClicked', {
      roomId,
      selectedElement: props.element,
    });

  };

  const handleUpdateText = (e: React.FormEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const sanitizedText = DOMPurify.sanitize(element.innerText);
    
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          texttitle: sanitizedText,
        },
      },
    });

    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
      socket.emit('textUpdated',{roomId,elementId:props.element.id,updatedText : sanitizedText,updatedElements});
    }, 0);
  };

  useEffect(() => {
    const handleTextUpdate = ({ elementId, updatedText }: { elementId: string; updatedText: string }) => {
      if (elementId === props.element.id) {
        dispatch({
          type: 'UPDATE_ELEMENT',
          payload: {
            elementDetails: {
              ...props.element,
              texttitle: updatedText,
            },
          },
        });
      }
    };
    socket.on('textUpdated', handleTextUpdate);
    return () => {
      socket.off('textUpdated', handleTextUpdate);
    };
  }, [socket, props.element.id, dispatch]);
  

  const styles = props.element.styles;

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
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

      <div
      contentEditable={!state.editor.liveMode}
      suppressContentEditableWarning={true}
      onInput={handleUpdateText}
      onDrop={handleOnDrop} 
      >
        <span
        dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.element.texttitle || 'Text'),
        }}
        dir="ltr"
        />
      </div>

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