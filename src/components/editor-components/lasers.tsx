'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import { Trash } from 'lucide-react';
import './laser.css'; // Ensure you have a CSS file for styles

type Props = {
  element: EditorElement;
};

const AnimationComponent: React.FC<Props> = ({ element }) => {
  const { state } = useEditor();
  const [animations, setAnimations] = useState([
    'lightning',
    'boom',
  ]);
  const [backgroundColor, setBackgroundColor] = useState<string>(element.styles.backgroundColor || '#ffffff');

  const handleDeleteAnimation = (index: number) => {
    const updatedAnimations = animations.filter((_, i) => i !== index);
    setAnimations(updatedAnimations);
  };

  const handleDeleteContainer = () => {
    // Handle deletion of the container locally if needed
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle selection change locally if needed
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBackgroundColor(newColor);
  };

  return (
    <div
      className={clsx('animation-container', 'relative', {
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        '!border-blue-500': state.editor.selectedElement.id === element.id,
        '!border-solid': state.editor.selectedElement.id === element.id,
      })}
      style={{ ...element.styles, backgroundColor }}
      onClick={handleOnClickBody}
    >
      {animations.map((animation, index) => (
        <div key={index} className="relative">
          {animation === 'lightning' && (
            <div className="lightning-container">
              <div className="lightning white"></div>
              <div className="lightning red"></div>
            </div>
          )}
          {animation === 'boom' && (
            <>
              <div className="boom-container">
                <div className="shape circle big white"></div>
                <div className="shape circle white"></div>
                <div className="shape triangle big yellow"></div>
                <div className="shape disc white"></div>
                <div className="shape triangle blue"></div>
              </div>
              <div className="boom-container second">
                <div className="shape circle big white"></div>
                <div className="shape circle white"></div>
                <div className="shape disc white"></div>
                <div className="shape triangle blue"></div>
              </div>
            </>
          )}
          {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
            <div
              className="absolute top-0 right-0 m-2 bg-red-500 px-2.5 py-1 text-xs font-bold text-white cursor-pointer rounded-full flex items-center z-10"
              onClick={() => handleDeleteAnimation(index)}
              style={{ zIndex: 10 }}
            >
              <Trash size={16} />
              <span className="ml-1">Delete</span>
            </div>
          )}
        </div>
      ))}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="editor-controls absolute top-0 left-0 w-full flex justify-between items-center p-2 bg-white bg-opacity-75 z-20">
          <Badge className="rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
          <div
            className="bg-red-500 px-2.5 py-1 text-xs font-bold text-white cursor-pointer rounded-full flex items-center"
            onClick={handleDeleteContainer}
            style={{ zIndex: 20 }}
          >
            <Trash size={16} />
            <span className="ml-1">Delete</span>
          </div>
          <input
            type="color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            className="absolute bottom-2 right-2"
          />
        </div>
      )}
    </div>
  );
};



export const exportToLaserAnimationCode = (element: EditorElement) => {
  const { styles, id, name, content } = element;

  const renderAnimation = (animation: string) => {
    switch (animation) {
      case 'lightning':
        return `
          <div className="lightning-container">
            <div className="lightning white"></div>
            <div className="lightning red"></div>
          </div>
        `;
      case 'boom':
        return `
          <>
            <div className="boom-container">
              <div className="shape circle big white"></div>
              <div className="shape circle white"></div>
              <div className="shape triangle big yellow"></div>
              <div className="shape disc white"></div>
              <div className="shape triangle blue"></div>
            </div>
            <div className="boom-container second">
              <div className="shape circle big white"></div>
              <div className="shape circle white"></div>
              <div className="shape disc white"></div>
              <div className="shape triangle blue"></div>
            </div>
          </>
        `;
      default:
        return null;
    }
  };

  const animations = content ? content.map((item: any) => item.animation).filter(Boolean) : [];
  const animationComponents = animations.map(renderAnimation).join('\n');

  return `
import './laser.css'; // Ensure you have a CSS file for styles

const LaserAnimationComponent = () => {
  return (
    <div
      className="animation-container"
      style={{ ...{ /* styles here */ }}}
    >
      <div className="lightning-container">
        <div className="lightning white"></div>
        <div className="lightning red"></div>
      </div>
      <>
        <div className="boom-container">
          <div className="shape circle big white"></div>
          <div className="shape circle white"></div>
          <div className="shape triangle big yellow"></div>
          <div className="shape disc white"></div>
          <div className="shape triangle blue"></div>
        </div>
        <div className="boom-container second">
          <div className="shape circle big white"></div>
          <div className="shape circle white"></div>
          <div className="shape disc white"></div>
          <div className="shape triangle blue"></div>
        </div>
      </>
    </div>
  );
};

export default LaserAnimationComponent;

  `;
};


export default AnimationComponent;
