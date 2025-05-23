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


const TestimonialComponent: React.FC<Props> = (props) => {
  const { dispatch, state } = useEditor();
  const [imageUrl, setImageUrl] = useState(props.element.imageUrl || '');
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

  // Using optimizedcontent approach
  const handleUpdateContent = (field: 'quote' | 'author', e: React.FormEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement;

    // Create a new object with sanitized content
    const sanitizedContent = DOMPurify.sanitize(divElement.innerText);

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,

            [field]: sanitizedContent,
          },
      },
    });
    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
      socket.emit('HeaderUpdated',{roomId,elementId:props.element.id,updatedText : sanitizedContent,field,updatedElements});
    }, 0);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Update imageUrl state
        // Update the imageUrl in the EditorElement
        dispatch({
          type: 'UPDATE_ELEMENT',
          payload: {
            elementDetails: {
              ...props.element,
              imageUrl: reader.result,
            },
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
          const handleTextUpdate = ({ elementId, field ,updatedText }: { elementId: string; field:any, updatedText: string }) => {
            if (elementId === props.element.id) {
  
              dispatch({
                type: 'UPDATE_ELEMENT',
                payload: {
                  elementDetails: {
                    ...props.element,
          
                      [field]: updatedText,
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
        'p-6 w-full flex flex-col items-center text-gray-800 relative',
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

      <div className="flex items-center mb-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
            width={64}
            height={64}
          />
        )}
        
        {/* Only show the file input and placeholder in edit mode */}
        {!state.editor.liveMode && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="ml-4"
            />
            {!imageUrl && (
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </>
        )}

        <div className="ml-4">
          <p
            contentEditable={!state.editor.liveMode}
            suppressContentEditableWarning={true}
            onInput={(e) => handleUpdateContent('quote', e)}
            className="text-lg italic"
          >
            <span
            dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.element.quote || 'This is a fantastic service!'),
            }}
            dir='ltr'
            suppressContentEditableWarning={true}
            />
          </p>
          <p
            contentEditable={!state.editor.liveMode}
            suppressContentEditableWarning={true}
            onInput={(e) => handleUpdateContent('author', e)}
            className="text-md font-semibold mt-2"
          >
            <span
            dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.element.author || 'John Doe'),
            }}
            dir='ltr'
            suppressContentEditableWarning={true}
            />
          </p>
        </div>
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

// Export Function for the Testimonial Component
export const generateTestimonialComponentCode = (element: EditorElement) => {
  return `
    import React from 'react';

    const TestimonialComponent = () => {
      const imageUrl = '${element.imageUrl || ''}';
      const styles = ${JSON.stringify(element.styles)};
    
      return (
        <section style={styles}>
          ${element.imageUrl ? `<img src="${element.imageUrl}" alt="User" className="w-16 h-16 rounded-full border-2 border-gray-300" />` : ''}
          <div className="ml-4">
            <p className="text-lg italic">${element.quote || 'This is a fantastic service!'}</p>
            <p className="text-md font-semibold mt-2">${element.author || 'John Doe'}</p>
          </div>
        </section>
      );
    };
  
    export default TestimonialComponent;
  `;
};

export default TestimonialComponent;
