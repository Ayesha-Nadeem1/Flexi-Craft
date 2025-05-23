'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Props } from './types'; 
import { useSocket } from '../../SocketContext';  
import { useParams } from 'react-router-dom';

const ButtonSection = (props: Props) => {
  const { dispatch, state } = useEditor();
  const  socket  = useSocket(); 
  const { roomId } = useParams();
  const [buttonText, setButtonText] = useState<string>(props.element.buttontext || 'Button');


  const handleDeleteElement = () => {
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
  };

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

  const handleUpdateContent = (e: React.FormEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement;
    // Sanitize the input to prevent XSS attacks
    const sanitizedText = DOMPurify.sanitize(divElement.innerText);

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
            buttontext: sanitizedText,
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
  }, [socket, props.element.id, dispatch]);

  const styles = props.element.styles;

  return (
    <section
      style={styles}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 relative',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      <div
        contentEditable={!state.editor.liveMode}
        //onBlur={handleUpdateContent}
        onInput={handleUpdateContent}
        suppressContentEditableWarning={true}
        className="bg-transparent text-black py-2 px-4 rounded-md hover:bg-primary-dark"
        role="button"
      >
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.element.buttontext || 'Button'),
          }}
          dir="ltr"  // Ensure text is left-to-right

        />
      </div>

      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
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

export const generatebuttonCode = (element: EditorElement) => {
  return `

const Button = () => {
  const styles = ${JSON.stringify(element.styles)};
  
  return (
    <button style={styles}>
      ${element.buttontext || 'Button'}
    </button>
  );
};

export default Button;
  `;
};


export default ButtonSection;
