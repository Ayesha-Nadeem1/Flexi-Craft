'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React from 'react';
import DOMPurify from 'dompurify';
import { Props } from './types'; 


const ButtonSection = (props: Props) => {
  const { dispatch, state } = useEditor();

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleUpdateContent = (e: React.FocusEvent<HTMLDivElement>) => {
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
  };

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
        onBlur={handleUpdateContent}
        suppressContentEditableWarning={true}
        className="bg-transparent text-black py-2 px-4 rounded-md hover:bg-primary-dark"
        role="button"
      >
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.element.buttontext || 'Button'),
          }}
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
