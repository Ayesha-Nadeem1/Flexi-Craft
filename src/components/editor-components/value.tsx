'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Props } from './types'; 
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';

const ValuePropositionSection = (props: Props) => {
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

  const handleUpdateContent = (field: 'ftitle' | 'fdescription' | 'value1' | 'value2' | 'value3' | 'value4' | `${'value1' | 'value2' | 'value3' | 'value4'}Description`, e: React.FormEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement;
    const sanitizedText = DOMPurify.sanitize(divElement.innerText);
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          [field]: sanitizedText, // Update title, description, or value directly
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
            console.log("updatee", updatedText)
            console.log("updatee", field)

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

      <h2
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onInput={(e) => handleUpdateContent('ftitle', e)}
        className="text-3xl font-semibold mb-4"
      >
        <span
        dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.element.ftitle || 'Your Value Proposition Title'),
        }}
        dir = 'ltr'
        />

      </h2>
      <p
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onInput={(e) => handleUpdateContent('fdescription', e)}
        className="text-lg mb-8"
      >
        <span
        dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.element.fdescription || 'A compelling description of the value you offer to your customers.'),
        }}
        dir='ltr'
        />

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {['value1', 'value2', 'value3', 'value4'].map((valueKey, index) => (
          <div key={index} className="p-6 border rounded-lg bg-white shadow-md">
            <h3
              contentEditable={!state.editor.liveMode}
              suppressContentEditableWarning={true}
              onInput={(e) => handleUpdateContent(valueKey as 'value1' | 'value2' | 'value3' | 'value4', e)}
              className="text-xl font-semibold mb-2"
            >
              <span
              dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.element[valueKey] || `Core Value ${index + 1}`),
              }}
              dir='ltr'
              />

            </h3>
            <p
              contentEditable={!state.editor.liveMode}
              suppressContentEditableWarning={true}
              onInput={(e) => handleUpdateContent(`${valueKey}Description` as `${'value1' | 'value2' | 'value3' | 'value4'}Description`, e)}
              className="text-gray-600"
            >
              <span
              dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.element[`${valueKey}Description`] || 'Description of core value.'),
              }}
              dir='ltr'
              />
            </p> 
          </div>
        ))}
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


export const generateValuePropositionCode = (element: EditorElement) => {
  const valueKeys = ['value1', 'value2', 'value3', 'value4'];
  const valueCode = valueKeys.map((valueKey, index) => {
    return `
      <div key={${index}} className="p-6 border rounded-lg bg-white shadow-md">
        <h3>{${JSON.stringify(element[valueKey] || `Core Value ${index + 1}`)}}</h3>
        <p>{${JSON.stringify(element[`${valueKey}Description`] || 'Description of core value.')}}</p>
      </div>
    `;
  }).join('');

  return `
    const ValueProposition = () => {
      const styles = ${JSON.stringify(element.styles)};
    
      return (
        <section style={styles}>
          <h2>{${JSON.stringify(element.ftitle || 'Your Value Proposition Title')}}</h2>
          <p>{${JSON.stringify(element.fdescription || 'A compelling description of the value you offer to your customers.')}}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            ${valueCode}
          </div>
        </section>
      );
    };
  
    export default ValueProposition;
  `;
};



export default ValuePropositionSection;
