'use client'

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { Props } from './types'; 
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';


const ButtonSet: React.FC<Props> = ({ element }) => {
  const { dispatch, state } = useEditor();
  const socket = useSocket();
  const { roomId } = useParams();

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    });

    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
  
      socket.emit('componentDeleted', {
        roomId,
        updatedElements,
        deletedElement: element,  
      });
    }, 0);
      
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    });
    socket.emit('elementClicked', {
      roomId,
      selectedElement: element,
    });
  };

  const handleUpdateContent = (field: string, e: React.FormEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement;

    // Using optimizedcontent approach to update
    const newContent = { ...element, [field]: divElement.innerText };

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: newContent,
      },
    });

    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
      socket.emit('textUpdated',{roomId,elementId:element.id,updatedText : newContent,updatedElements});
    }, 0);
  };

    useEffect(() => {
      const handleTextUpdate = ({ elementId, updatedText }: { elementId: string; updatedText: string }) => {
  
        if (elementId === element.id) {
          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...element,
                  buttontext: updatedText,
                },
            },
          });
        }
      };
    
      socket.on('textUpdated', handleTextUpdate);
    
      return () => {
        socket.off('textUpdated', handleTextUpdate);
      };
    }, [socket, element.id, dispatch]);

  const styles = element.styles;

  return (
    <section
      style={styles}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 relative',
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      <div className="flex gap-4">
        {[1, 2, 3].map((index) => {
          const buttonKey = `button${index}`; // Determine the key for button text
          return (
            <div
              key={buttonKey}
              contentEditable={!state.editor.liveMode}
              suppressContentEditableWarning={true}
              onInput={(e) => handleUpdateContent(buttonKey, e)}
              className="bg-transparent text-black py-2 px-4 rounded-md hover:bg-primary-dark border border-black"
              role="button"
              tabIndex={0} // Make it focusable
              aria-label={`Button ${index}`} // Improve accessibility
            >
              {element[buttonKey] || `Button ${index}`} {/* Display button text */}
            </div>
          );
        })}
      </div>

      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </section>
  );
};

export const exportToButtonSetCode = (element: EditorElement) => {
  const styles = JSON.stringify(element.styles || {});
  const button1Text = element.button1 || 'Button 1';
  const button2Text = element.button2 || 'Button 2';
  const button3Text = element.button3 || 'Button 3';

  return `


    const ButtonSet = () => {
      const styles = ${styles}; // Component styles

      return (
        <section
          style={styles}
          className="flex flex-col items-center justify-center text-center py-16 relative"
        >
          <div className="flex gap-4">
            <div
              className="bg-transparent text-black py-2 px-4 rounded-md hover:bg-primary-dark border border-black"
              role="button"
              tabIndex={0}
              aria-label="Button 1"
            >
              ${button1Text}
            </div>
            <div
              
              className="bg-transparent text-black py-2 px-4 rounded-md hover:bg-primary-dark border border-black"
              role="button"
              tabIndex={0}
              aria-label="Button 2"
            >
              ${button2Text}
            </div>
            <div
              
              className="bg-transparent text-black py-2 px-4 rounded-md hover:bg-primary-dark border border-black"
              role="button"
              tabIndex={0}
              aria-label="Button 3"
            >
              ${button3Text}
            </div>
          </div>
        </section>
      );
    };

    export default ButtonSet;
  `;
};


export default ButtonSet;
