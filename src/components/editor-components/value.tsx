'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React from 'react';
import DOMPurify from 'dompurify';

type Props = {
  element: EditorElement;
};

const ValuePropositionSection = (props: Props) => {
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

  const handleUpdateContent = (field: 'ftitle' | 'fdescription' | 'value1' | 'value2' | 'value3' | 'value4' | `${'value1' | 'value2' | 'value3' | 'value4'}Description`, e: React.FocusEvent<HTMLDivElement>) => {
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
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <h2
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('ftitle', e)}
        className="text-3xl font-semibold mb-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.ftitle || 'Your Value Proposition Title'),
        }}
      />
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('fdescription', e)}
        className="text-lg mb-8"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.fdescription || 'A compelling description of the value you offer to your customers.'),
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {['value1', 'value2', 'value3', 'value4'].map((valueKey, index) => (
          <div key={index} className="p-6 border rounded-lg bg-white shadow-md">
            <h3
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => handleUpdateContent(valueKey as 'value1' | 'value2' | 'value3' | 'value4', e)}
              className="text-xl font-semibold mb-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.element[valueKey] || `Core Value ${index + 1}`),
              }}
            />
            <p
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => handleUpdateContent(`${valueKey}Description` as `${'value1' | 'value2' | 'value3' | 'value4'}Description`, e)}
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.element[`${valueKey}Description`] || 'Description of core value.'),
              }}
            />
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
