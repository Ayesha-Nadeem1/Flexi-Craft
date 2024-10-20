'use client';

import React, { useState } from 'react';
import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import './greetings.css';

type Props = {
  element: EditorElement;
};

const TextAnimation: React.FC<Props> = ({ element }) => {
  const { state, dispatch } = useEditor();
  const [textColor, setTextColor] = useState(element.styles.color || '#000000');

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTextColor(color);
  };

  return (
    <div
      className={clsx('content', 'relative', {
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        '!border-blue-500': state.editor.selectedElement.id === element.id,
        '!border-solid': state.editor.selectedElement.id === element.id,
      })}
      style={{ ...element.styles, color: textColor }}
      onClick={handleOnClickBody}
    >
      <div className="content__container">
        <p
          className="content__container__text"
          //contentEditable={!state.editor.liveMode}
        >
          Hello
        </p>
        <ul className="content__container__list">
          {['world !', 'guys !', 'users !', 'everybody !'].map((text, index) => (
            <li
              key={index}
              className="content__container__list__item"
              //contentEditable={!state.editor.liveMode}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="editor-controls absolute bottom-0 left-0 w-full flex justify-between items-center p-2 bg-white bg-opacity-75">
          <Badge className="rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <label htmlFor="text-color" className="mr-1 text-sm">
                Text Color:
              </label>
              <input
                id="text-color"
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                className="border border-gray-300 rounded"
              />
            </div>
            <div
              className="bg-red-500 px-2.5 py-1 text-xs font-bold text-white cursor-pointer rounded-none rounded-t-lg flex items-center"
              onClick={handleDeleteContainer}
            >
              <Trash size={16} />
              <span className="ml-1">Delete</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAnimation;
