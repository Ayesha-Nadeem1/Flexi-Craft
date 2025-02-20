'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { Props } from './types'; 
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';


const HeroSection = (props: Props) => {
  const { dispatch, state } = useEditor();
    
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

  const handleUpdateContent = (field: 'herotitle' | 'herotagline', e: React.FormEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement;
    const sanitizedText = DOMPurify.sanitize(divElement.innerText);
    divElement.style.direction = 'ltr';

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          [field]: sanitizedText, // Update heading or subheading directly
        },
      },
    });
    
    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
      socket.emit('HeaderUpdated',{roomId,elementId:props.element.id,updatedText : sanitizedText,field,updatedElements});
    }, 0);
  };


      useEffect(() => {
        const handleTextUpdate = ({ elementId, field ,updatedText }: { elementId: string; field:any, updatedText: string }) => {
          if (elementId === props.element.id) {
            dispatch({
              type: 'UPDATE_ELEMENT',
              payload: {
                elementDetails: {
                  ...props.element,
                  [field]: updatedText, // Update heading or subheading directly
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
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <h1
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onInput={(e) => handleUpdateContent('herotitle', e)}
        className="text-4xl font-bold mb-4"
      >
        <span
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.herotitle || 'Your Main Heading Here'),
        }}
        dir='ltr'
        suppressContentEditableWarning={true}

        />
      </h1>
      <p
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}

        onInput={(e) => handleUpdateContent('herotagline', e)}
        className="text-xl mb-8"
      >
        <span
        dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.element.herotagline || 'Your compelling subheading goes here.'),
        }}
        dir='ltr'
        suppressContentEditableWarning={true}

        />
      </p>

      <div className="flex gap-6">
        <a href="#learn-more" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">Learn More</a>
        <a href="#learn-more" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">Get In Touch</a>
      </div>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
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


export const exportToHeroSectionCode = (element: EditorElement) => {
  const heroTitle = JSON.stringify(element.herotitle || 'Your Main Heading Here');
  const heroTagline = JSON.stringify(element.herotagline || 'Your compelling subheading goes here.');
  const styles = JSON.stringify(element.styles);

  return `
    const HeroSection = () => {
      const styles = ${styles};

      return (
        <section style={styles} className="flex flex-col items-center justify-center text-center py-16 relative">
          <h1
  
            className="text-4xl font-bold mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(${heroTitle}),
            }}
          />
          <p
        
            className="text-xl mb-8"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(${heroTagline}),
            }}
          />
          <div className="flex gap-6">
            <a href="#learn-more" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">
              Learn More
            </a>
            <a href="#learn-more" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">
              Get In Touch
            </a>
          </div>
        </section>
      );
    };

    export default HeroSection;
  `;
};



export default HeroSection;