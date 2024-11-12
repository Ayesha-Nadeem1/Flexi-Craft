'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify
import './Animationtext.css';

type Concept = 
  | 'concept-one' 
  | 'concept-two' 
  | 'concept-three' 
  | 'concept-four' 
  | 'concept-five' 
  | 'concept-six' 
  | 'concept-seven';

type Props = {
  element: EditorElement;
};

const Texthover = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [concept, setConcept] = useState<Concept>('concept-one');

  const handleDeleteContainer = () => {
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

  const handleTextChange = (e: React.FocusEvent<HTMLDivElement>, index: number) => {
    const newText = DOMPurify.sanitize(e.target.innerHTML); // Sanitize the input
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          content: {
            ...props.element.content,
            [index === 0 ? 'feature1' : `feature${index + 1}`]: newText, // Adjust according to your logic
          },
        },
      },
    });
  };

  const renderContent = () => {
    switch (concept) {
      case 'concept-one':
        return (
          <div className="concept concept-one">
            {[...Array(9)].map((_, i) => (
              <div key={i} className={`hover hover-${i + 1}`}></div>
            ))}
            <h1
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => handleTextChange(e as any, 0)}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('Desert') }} // Sanitize the default text
            />
          </div>
        );
      case 'concept-two':
        return (
          <div className="concept concept-two">
            {['F', 'O', 'R', 'E', 'S', 'T'].map((val, index) => (
              <div key={index} className={`hover hover-${index + 1}`}>
                <h1
                  contentEditable={!state.editor.liveMode}
                  onBlur={(e) => handleTextChange(e as any, index)}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val) }} // Sanitize each letter
                />
              </div>
            ))}
          </div>
        );
      case 'concept-three':
        return (
          <div className="concept concept-three">
            <div className="word">
              {['C', 'A', 'N', 'Y', 'O', 'N'].map((val, index) => (
                <div key={index} className={`hover hover-${index + 1}`}>
                  <div></div>
                  <div></div>
                  <h1
                    contentEditable={!state.editor.liveMode}
                    onBlur={(e) => handleTextChange(e as any, index)}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val) }} // Sanitize each letter
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 'concept-four':
        return (
          <div className="concept concept-four">
            <h1
              contentEditable={!state.editor.liveMode}
              className={`hover hover-${Math.floor(Math.random() * 3) + 1}`}
              onBlur={(e) => handleTextChange(e as any, 0)}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('Glacier') }} // Sanitize the default text
            />
          </div>
        );
      case 'concept-five':
        return (
          <div className="concept concept-five">
            <h1 className="word">
              {['M', 'O', 'U', 'N', 'T', 'A', 'I', 'N', 'S'].map((val, index) => (
                <span
                  key={index}
                  className={`char hover hover-${index + 1}`}
                  contentEditable={!state.editor.liveMode}
                  onBlur={(e) => handleTextChange(e as any, index)}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val) }} // Sanitize each letter
                />
              ))}
            </h1>
          </div>
        );
      case 'concept-six':
        return (
          <div className="concept concept-six">
            <h1 className="word">
              {['O', 'C', 'E', 'A', 'N'].map((val, index) => (
                <span
                  key={index}
                  className={`char hover hover-${index + 1}`}
                  contentEditable={!state.editor.liveMode}
                  onBlur={(e) => handleTextChange(e as any, index)}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val) }} // Sanitize each letter
                />
              ))}
            </h1>
          </div>
        );
      case 'concept-seven':
        return (
          <div className="concept concept-seven">
            <h1
              contentEditable={!state.editor.liveMode}
              className={`hover hover-${Math.floor(Math.random() * 3) + 1}`}
              onBlur={(e) => handleTextChange(e as any, 0)}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('Fries') }} // Sanitize the default text
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      style={props.element.styles}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 relative gap-4',
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
          <>
            <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
              {state.editor.selectedElement.name}
            </Badge>
            <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white cursor-pointer" onClick={handleDeleteContainer}>
              <Trash size={16} />
            </div>
          </>
        )}
      <div className="main-content">
        {renderContent()}
      </div>
      {!state.editor.liveMode && (
        <div className="concept-selector">
          <label htmlFor="concept-select">Choose a concept:</label>
          <select
            id="concept-select"
            value={concept}
            onChange={(e) => setConcept(e.target.value as Concept)}
          >
            <option value="concept-one">Desert</option>
            <option value="concept-two">Forest</option>
            <option value="concept-three">Canyon</option>
            <option value="concept-four">Glacier</option>
            <option value="concept-five">Mountains</option>
            <option value="concept-six">Ocean</option>
            <option value="concept-seven">Fries</option>
          </select>
        </div>
      )}
    </section>
  );
};


export const generateTexthoverCode = (element: EditorElement) => {
  const conceptCode = `
    switch (concept) {
      case 'concept-one':
        return (
          <div className="concept concept-one">
            {[...Array(9)].map((_, i) => (
              <div key={i} className={\`hover hover-\${i + 1}\`}></div>
            ))}
            <h1>{${JSON.stringify(element.conceptText || 'Desert')}}</h1>
          </div>
        );
      case 'concept-two':
        return (
          <div className="concept concept-two">
            {['F', 'O', 'R', 'E', 'S', 'T'].map((val, index) => (
              <div key={index} className={\`hover hover-\${index + 1}\`}>
                <h1>{${JSON.stringify(element.conceptText || 'Forest')}}</h1>
              </div>
            ))}
          </div>
        );
      case 'concept-three':
        return (
          <div className="concept concept-three">
            {['S', 'U', 'N', 'S', 'H', 'I', 'N', 'E'].map((val, index) => (
              <div key={index} className={\`hover hover-\${index + 1}\`}>
                <h1>{${JSON.stringify(element.conceptText || 'Sunshine')}}</h1>
              </div>
            ))}
          </div>
        );
      case 'concept-four':
        return (
          <div className="concept concept-four">
            {['C', 'L', 'O', 'U', 'D'].map((val, index) => (
              <div key={index} className={\`hover hover-\${index + 1}\`}>
                <h1>{${JSON.stringify(element.conceptText || 'Cloud')}}</h1>
              </div>
            ))}
          </div>
        );
      // Add more concepts as needed...
      default:
        return null;
    }
  `;

  return `
    const Texthover = () => {
      const styles = ${JSON.stringify(element.styles)};
    
      return (
        <section style={styles}>
          <div className="main-content">
            ${conceptCode}
          </div>
        </section>
      );
    };
  
    export default Texthover;
  `;
};


export default Texthover;