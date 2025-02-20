'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';  // Import DOMPurify
import { Props } from './types'; 
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';

// Type guard to check if content is an object
const isContentObject = (content: any): content is { [key: string]: any } => {
  return typeof content === 'object' && !Array.isArray(content);
};

const HeaderComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [textColor, setTextColor] = useState<string>(props.element.styles.color || '#000000');
  const socket = useSocket();
  const { roomId } = useParams();



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

  const handleUpdateContent = useCallback(
    (field: 'htitle' | 'htagline', e: React.FormEvent<HTMLHeadingElement | HTMLParagraphElement>) => {
      const updatedContent = (e.target as HTMLElement).textContent;

      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...props.element,
            [field]: updatedContent,  // Update htitle or htagline directly
          },
        },
      });

      setTimeout(() => {
        const updatedElements = JSON.stringify(state.editor.elements);
        socket.emit('HeaderUpdated',{roomId,elementId:props.element.id,updatedText : updatedContent,field,updatedElements});
      }, 0);

    },

    [dispatch, props.element]
  );

    useEffect(() => {
      const handleTextUpdate = ({ elementId, field ,updatedText }: { elementId: string; field:any, updatedText: string }) => {
        
        if (elementId === props.element.id) {
          console.log("Received update:", updatedText);
          console.log("Received id:", elementId);
          console.log('field', field);

          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...props.element,
                [field]: updatedText,  // Update htitle or htagline directly
              },
            },
          });
        }
      };
      socket.on('HeaderUpdated', handleTextUpdate);
      return () => {
        socket.off('HeaderUpdated', handleTextUpdate);
      };
    }, [socket, props.element.id, dispatch]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
  };

  const styles = { ...props.element.styles, color: textColor };

  return (
    <header
      style={styles}
      className={clsx(
        'p-4 w-full flex flex-col items-center text-gray-800 relative',
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

      <h1
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onInput={(e) => handleUpdateContent('htitle', e)}  // Update htitle
        className="text-4xl font-bold mb-2"
      >
        <span
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.htitle || 'Website Title'), // Sanitize the input
        }}
        dir="ltr"  
        suppressContentEditableWarning={true}


        />
      </h1>

      <p
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onInput={(e) => handleUpdateContent('htagline', e)}  // Update htagline
        className="text-lg mb-4"   
      >
        <span
        dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.element.htagline || 'A brief tagline or description goes here.'), // Sanitize the input
        }}
        dir="ltr"  
        suppressContentEditableWarning={true}

        />
      </p>

      <nav className="flex gap-4">
        <a href="#home" className="hover:underline">Home</a>
        <a href="#about" className="hover:underline">About</a>
        <a href="#services" className="hover:underline">Services</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </nav>

      {!state.editor.liveMode && (
        <div className="absolute bottom-4 right-4">
          <input
            type="color"
            value={textColor}
            onChange={handleColorChange}
            title="Change Text Color"
          />
        </div>
      )}

      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white">
          <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
        </div>
      )}
    </header>
  );
};


export const exportToHeaderComponentCode = (element: EditorElement) => {
  const headerTitle = JSON.stringify(element.htitle || 'Website Title');
  const headerTagline = JSON.stringify(element.htagline || 'A brief tagline or description goes here.');
  const styles = JSON.stringify(element.styles);

  return `
    const HeaderComponent = () => {
      const [textColor, setTextColor] = useState<string>(${JSON.stringify(element.styles.color || '#000000')});


      return (
        <header style={{ ...${styles}, color: textColor }} className="p-4 w-full flex flex-col items-center text-gray-800 relative">
          <h1

            className="text-4xl font-bold mb-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(${headerTitle}),
            }}
          />
          <p

            className="text-lg mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(${headerTagline}),
            }}
          />
          <nav className="flex gap-4">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <div className="absolute bottom-4 right-4">
            <input
              type="color"
              value={textColor}
              onChange={handleColorChange}
              title="Change Text Color"
            />
          </div>
        </header>
      );
    };

    export default HeaderComponent;
  `;
};


export default React.memo(HeaderComponent);