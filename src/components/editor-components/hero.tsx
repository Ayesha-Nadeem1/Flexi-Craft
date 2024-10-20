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

const HeroSection = (props: Props) => {
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

  const handleUpdateContent = (field: 'herotitle' | 'herotagline', e: React.FocusEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement;
    const sanitizedText = DOMPurify.sanitize(divElement.innerText);
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          [field]: sanitizedText, // Update heading or subheading directly
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

      <h1
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('herotitle', e)}
        className="text-4xl font-bold mb-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.herotitle || 'Your Main Heading Here'),
        }}
      />
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('herotagline', e)}
        className="text-xl mb-8"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.herotagline || 'Your compelling subheading goes here.'),
        }}
      />
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

export default HeroSection;
