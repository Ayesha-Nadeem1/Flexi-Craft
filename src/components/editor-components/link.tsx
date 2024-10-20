'use client';

import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React from 'react';
import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import DOMPurify from 'dompurify';

type Props = {
  element: EditorElement;
};

const LinkComponent = (props: Props) => {
  const { dispatch, state } = useEditor();

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === null) return;
    e.dataTransfer.setData('componentType', type);
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

  const styles = props.element.styles;

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'link')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      {/* Link rendering in preview or live mode */}
      {(state.editor.previewMode || state.editor.liveMode) && (
        <a
          href={props.element.href || '#'} // Reference href directly
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.element.innerText || 'Link'),
          }}
        />
      )}

      {/* Editable link text */}
      {!state.editor.previewMode && !state.editor.liveMode && (
        <span
          contentEditable={!state.editor.liveMode}
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            const spanElement = e.target as HTMLSpanElement;
            const sanitizedText = DOMPurify.sanitize(spanElement.innerText);

            dispatch({
              type: 'UPDATE_ELEMENT',
              payload: {
                elementDetails: {
                  ...props.element,
                  innerText: sanitizedText, // Update innerText directly
                },
              },
            });
          }}
          className="cursor-text"
        >
          {props.element.innerText || 'Link'}
        </span>
      )}

      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
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

export default LinkComponent;
