'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';  // Import DOMPurify

type Props = {
  element: EditorElement;
};

// Type guard to check if content is an object
const isContentObject = (content: any): content is { [key: string]: any } => {
  return typeof content === 'object' && !Array.isArray(content);
};

const FooterComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [textColor, setTextColor] = useState<string>(props.element.styles.color || '#000000');

  const handleDeleteElement = useCallback(() => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  }, [dispatch, props.element]);

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleUpdateContent = useCallback(
    (field: 'footerText' | 'footerTagline', e: React.FormEvent<HTMLHeadingElement | HTMLParagraphElement>) => {
      const updatedContent = (e.target as HTMLElement).innerText;
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...props.element,
            [field]: updatedContent,  // Update footerText or footerTagline directly
          },
        },
      });
    },
    [dispatch, props.element]
  );

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
  };

  const styles = { ...props.element.styles, color: textColor };

  return (
    <footer
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

      <p
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onInput={(e) => handleUpdateContent('footerText', e)}  // Update footerText
        className="text-lg mb-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.footerText || 'Footer text goes here.'), // Sanitize the input
        }}
      />

      <p
        contentEditable={!state.editor.liveMode}
        suppressContentEditableWarning={true}
        onInput={(e) => handleUpdateContent('footerTagline', e)}  // Update footerTagline
        className="text-sm mb-2"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.element.footerTagline || 'Your tagline or additional info.'), // Sanitize the input
        }}
      />

      <nav className="flex gap-4 mt-4">
        <a href="#privacy" className="text-black hover:underline">Privacy Policy</a>
        <a href="#terms" className="text-black hover:underline">Terms of Service</a>
        <a href="#contact" className="text-black hover:underline">Contact</a>
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
    </footer>
  );
};


export const exportToFooterComponentCode = (element: EditorElement) => {
  const textColor = JSON.stringify(element.styles.color || '#000000');
  const footerText = JSON.stringify(element.footerText || 'Footer text goes here.');
  const footerTagline = JSON.stringify(element.footerTagline || 'Your tagline or additional info.');

  return `

    import DOMPurify from 'dompurify';

    const FooterComponent = ({ textColor = ${textColor}, footerText = ${footerText}, footerTagline = ${footerTagline} }) => {

      return (
        <footer style={{ color: currentTextColor }} className="p-4 w-full flex flex-col items-center">
          <p
            
            className="text-lg mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(footerText),
            }}
          />

          <p
            
            className="text-sm mb-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(footerTagline),
            }}
          />

          <nav className="flex gap-4 mt-4">
            <a href="#privacy" className="text-black hover:underline">Privacy Policy</a>
            <a href="#terms" className="text-black hover:underline">Terms of Service</a>
            <a href="#contact" className="text-black hover:underline">Contact</a>
          </nav>

        </footer>
      );
    };

    export default FooterComponent;
  `;
};


export default React.memo(FooterComponent);
