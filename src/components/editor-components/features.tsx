'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash, Star, Settings, PentagonIcon, Grid } from 'lucide-react';
import React from 'react';
import DOMPurify from 'dompurify'; // Make sure to install dompurify if you haven't
import { Props } from './types'; 


const FeaturesSection = (props: Props) => {
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

  const handleUpdateContent = (
    field: 'feature_title' | 'feature_description' | 'feature1' | 'feature1Description' | 'feature2' | 'feature2Description' | 'feature3' | 'feature3Description' | 'feature4' | 'feature4Description',
    e: React.FocusEvent<HTMLDivElement>
  ) => {
    const divElement = e.target as HTMLDivElement;
    const sanitizedContent = DOMPurify.sanitize(divElement.innerHTML);
    
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          [field]: sanitizedContent,
        },
      },
    });
  };

  const styles = props.element.styles;

  return (
    <section
      style={styles}
      className={clsx(
        'p-6 text-black relative',
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

      <h2
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('feature_title', e)}
        className="text-3xl font-bold mb-6 text-center"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.element.feature_title || 'Our Amazing Features') }}
      />
      
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('feature_description', e)}
        className="text-lg mb-8 text-center"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.element.feature_description || 'Discover the innovative features we offer.') }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {['feature1', 'feature2', 'feature3', 'feature4'].map((featureKey, index) => (
          <div key={index} className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
            {index === 0 && <Star size={40} className="mb-4 text-yellow-400" />}
            {index === 1 && <Settings size={40} className="mb-4 text-green-400" />}
            {index === 2 && <PentagonIcon size={40} className="mb-4 text-red-400" />}
            {index === 3 && <Grid size={40} className="mb-4 text-blue-400" />}
            <h3
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => handleUpdateContent(featureKey as 'feature1' | 'feature2' | 'feature3' | 'feature4', e)}
              className="text-xl font-semibold mb-2"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.element[featureKey] || `Feature ${index + 1}`) }}
            />
            <p
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => handleUpdateContent(`${featureKey}Description` as `${'feature1' | 'feature2' | 'feature3' | 'feature4'}Description`, e)}
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.element[`${featureKey}Description`] || 'Description of the feature.') }}
            />
          </div>
        ))}
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

export const exportToFeaturesSectionCode = (element: EditorElement) => {
  const styles = JSON.stringify(element.styles || {});
  const featureTitle = JSON.stringify(element.feature_title || 'Our Amazing Features');
  const featureDescription = JSON.stringify(element.feature_description || 'Discover the innovative features we offer.');

  const features = ['feature1', 'feature2', 'feature3', 'feature4'].map((featureKey, index) => {
    return {
      featureTitle: JSON.stringify(element[featureKey] || `Feature ${index + 1}`),
      featureDescription: JSON.stringify(element[`${featureKey}Description`] || 'Description of the feature.'),
      icon: index === 0 ? 'Star' : index === 1 ? 'Settings' : index === 2 ? 'PentagonIcon' : 'Grid',
    };
  });

  return `

    import DOMPurify from 'dompurify';
    import { Star, Settings, PentagonIcon, Grid } from 'lucide-react';

    const FeaturesSection = ({ styles = ${styles}, featureTitle = ${featureTitle}, featureDescription = ${featureDescription}, features = ${JSON.stringify(features)} }) => {
      const handleUpdateContent = (field, e) => {
        const sanitizedContent = DOMPurify.sanitize(e.target.innerHTML);
        // Handle content update logic
      };

      return (
        <section style={styles} className="p-6 text-black relative">
          <h2
            
            className="text-3xl font-bold mb-6 text-center"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(featureTitle) }}
          />
          
          <p
            
            className="text-lg mb-8 text-center"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(featureDescription) }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                {feature.icon === 'Star' && <Star size={40} className="mb-4 text-yellow-400" />}
                {feature.icon === 'Settings' && <Settings size={40} className="mb-4 text-green-400" />}
                {feature.icon === 'PentagonIcon' && <PentagonIcon size={40} className="mb-4 text-red-400" />}
                {feature.icon === 'Grid' && <Grid size={40} className="mb-4 text-blue-400" />}
                <h3
                  
                  className="text-xl font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(feature.featureTitle) }}
                />
                <p
                  
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(feature.featureDescription) }}
                />
              </div>
            ))}
          </div>
        </section>
      );
    };

    export default FeaturesSection;
  `;
};


export default FeaturesSection;
