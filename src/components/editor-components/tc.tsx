'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import { Trash } from 'lucide-react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

const TabsAndAccordions: React.FC<{ element: EditorElement }> = ({ element }) => {
  const { dispatch, state } = useEditor();
  const [tabs, setTabs] = useState<string[]>(element.tabs || ['Tab 1', 'Tab 2', 'Tab 3']);
  const [tabContents, setTabContents] = useState<string[]>(element.tabContents || ['Content for Tab 1', 'Content for Tab 2', 'Content for Tab 3']);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabHeading, setTabHeading] = useState(element.tabHeading || 'Tabs');
  const [acbHeading, setACHeading] = useState(element.accordionHeading || 'Accordions');
  
  // Initialize with 3 default accordions
  const [accordions, setAccordions] = useState<{ title: string; content: string; open: boolean }[]>(element.accordions || [
    { title: 'Accordion 1', content: 'Content for Accordion 1', open: false },
    { title: 'Accordion 2', content: 'Content for Accordion 2', open: false },
    { title: 'Accordion 3', content: 'Content for Accordion 3', open: false },
  ]);
  useEffect(() => {
    // Update the EditorElement with the current state whenever it changes
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...element,
          tabs,
          tabContents,
          tabHeading,
          accordionHeading: acbHeading,
          accordions,
        },
      },
    });
  }, [tabs, tabContents, tabHeading, acbHeading, accordions]); // Dependencies to trigger effect

  const handleDeleteTab = (index: number) => {
    setTabs((prev) => prev.filter((_, i) => i !== index));
    setTabContents((prev) => prev.filter((_, i) => i !== index));
    if (activeTab >= index) {
      setActiveTab(Math.max(0, activeTab - 1));
    }
  };

  const handleDeleteAccordion = (index: number) => {
    setAccordions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleAccordion = (index: number) => {
    setAccordions((prev) =>
      prev.map((acc, i) =>
        i === index ? { ...acc, open: !acc.open } : acc
      )
    );
  };

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    });
  };

  const handleTabChange = (index: number, value: string) => {
    setTabs((prev) => prev.map((tab, i) => (i === index ? value : tab)));
  };

  const handleTabContentChange = (index: number, value: string) => {
    setTabContents((prev) => prev.map((content, i) => (i === index ? value : content)));
  };

  const handleAccordionChange = (index: number, field: 'title' | 'content', value: string) => {
    setAccordions((prev) =>
      prev.map((acc, i) => (i === index ? { ...acc, [field]: value } : acc))
    );
  };

  return (
    <section
      style={{ ...element.styles }}
      className={clsx(
        'relative p-4',
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {/* Container Badge and Delete Button */}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <>
          <Badge className="absolute top-2 left-2 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
          <div 
            className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded-none rounded-t-lg text-white cursor-pointer" 
            onClick={handleDeleteContainer}
          >
            <Trash size={16} />
          </div>
        </>
      )}

      {/* Tabs */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          <input
            type="text"
            value={tabHeading}
            onChange={(e) => setTabHeading(e.target.value)}
            className="bg-transparent border-none outline-none text-2xl font-bold mb-4"
            readOnly={state.editor.liveMode}
          />
        </h2>
        <div className="flex border-b border-gray-300 mb-4">
          {tabs.map((tab, index) => (
            <div key={index} className="relative flex items-center">
              <button
                className={clsx(
                  'px-4 py-2 border-b-2',
                  index === activeTab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600'
                )}
                onClick={() => setActiveTab(index)}
              >
                <input
                  type="text"
                  value={tab}
                  onChange={(e) => handleTabChange(index, e.target.value)}
                  className="bg-transparent border-none outline-none"
                  readOnly={state.editor.liveMode}
                />
              </button>
              {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
                <div 
                  className="absolute top-2 right-0 bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer" 
                  onClick={() => handleDeleteTab(index)}
                >
                  <Trash size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border border-gray-300">
          <textarea
            value={tabContents[activeTab]}
            onChange={(e) => handleTabContentChange(activeTab, e.target.value)}
            className="w-full bg-transparent border-none outline-none"
            rows={4}
            readOnly={state.editor.liveMode}
          />
        </div>
      </div>

      {/* Accordions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          <input
            type="text"
            value={acbHeading}
            onChange={(e) => setACHeading(e.target.value)}
            className="bg-transparent border-none outline-none text-2xl font-bold mb-4"
            readOnly={state.editor.liveMode}
          />
        </h2>
        {accordions.map((accordion, index) => (
          <div key={index} className="relative border-b border-gray-300 mb-2">
            <button
              className="flex justify-between w-full px-4 py-2 text-left bg-gray-200 hover:bg-gray-300"
              onClick={() => handleToggleAccordion(index)}
            >
              <input
                type="text"
                value={accordion.title}
                onChange={(e) => handleAccordionChange(index, 'title', e.target.value)}
                className="bg-transparent border-none outline-none flex-grow"
                readOnly={state.editor.liveMode}
              />
              <span>{accordion.open ? '-' : '+'}</span>
            </button>
            {accordion.open && (
              <div className="p-4">
                <textarea
                  value={accordion.content}
                  onChange={(e) => handleAccordionChange(index, 'content', e.target.value)}
                  className="w-full bg-transparent border-none outline-none"
                  rows={4}
                  readOnly={state.editor.liveMode}
                />
              </div>
            )}
            {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
              <div 
                className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer" 
                onClick={() => handleDeleteAccordion(index)}
              >
                <Trash size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};





export const generateTCCode = (element: EditorElement) => {
  // Only include user-made changes, using default values for other properties
  const tabs = element.tabs || ['Tab 1', 'Tab 2', 'Tab 3'];
  const tabContents = element.tabContents || ['Content for Tab 1', 'Content for Tab 2', 'Content for Tab 3'];
  const tabHeading = element.tabHeading || 'Tabs';
  const acbHeading = element.accordionHeading || 'Accordions';
  const accordions = element.accordions || [
    { title: 'Accordion 1', content: 'Content for Accordion 1', open: false },
    { title: 'Accordion 2', content: 'Content for Accordion 2', open: false },
    { title: 'Accordion 3', content: 'Content for Accordion 3', open: false },
  ];

  return `
import React, { useState } from 'react';
import clsx from 'clsx';

const TabsAndAccordions = () => {
  const [tabs, setTabs] = useState(${JSON.stringify(tabs)});
  const [tabContents, setTabContents] = useState(${JSON.stringify(tabContents)});
  const [activeTab, setActiveTab] = useState(0);
  const [tabHeading, setTabHeading] = useState(${JSON.stringify(tabHeading)});
  const [acbHeading, setACHeading] = useState(${JSON.stringify(acbHeading)});
  const [accordions, setAccordions] = useState(${JSON.stringify(accordions)});

  const handleDeleteTab = (index) => {
    setTabs(tabs.filter((_, i) => i !== index));
    setTabContents(tabContents.filter((_, i) => i !== index));
    if (activeTab >= index) setActiveTab(Math.max(0, activeTab - 1));
  };

  const handleDeleteAccordion = (index) => {
    setAccordions(accordions.filter((_, i) => i !== index));
  };

  const handleToggleAccordion = (index) => {
    setAccordions(accordions.map((acc, i) =>
      i === index ? { ...acc, open: !acc.open } : acc
    ));
  };

  return (
    <section style={{ ...element.styles }} className={clsx('relative p-4')}>
      {/* Tabs */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          <input
            type="text"
            value={tabHeading}
            onChange={(e) => setTabHeading(e.target.value)}
            className="bg-transparent border-none outline-none text-2xl font-bold mb-4"
          />
        </h2>
        <div className="flex border-b border-gray-300 mb-4">
          {tabs.map((tab, index) => (
            <div key={index} className="relative flex items-center">
              <button
                className={clsx(
                  'px-4 py-2 border-b-2',
                  index === activeTab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'
                )}
                onClick={() => setActiveTab(index)}
              >
                <input
                  type="text"
                  value={tab}
                  onChange={(e) => {
                    const newTabs = [...tabs];
                    newTabs[index] = e.target.value;
                    setTabs(newTabs);
                  }}
                  className="bg-transparent border-none outline-none"
                />
              </button>
              <div className="absolute top-2 right-0 bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer" onClick={() => handleDeleteTab(index)}>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border border-gray-300">
          <textarea
            value={tabContents[activeTab]}
            onChange={(e) => {
              const newContents = [...tabContents];
              newContents[activeTab] = e.target.value;
              setTabContents(newContents);
            }}
            className="w-full bg-transparent border-none outline-none"
            rows={4}
          />
        </div>
      </div>

      {/* Accordions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          <input
            type="text"
            value={acbHeading}
            onChange={(e) => setACHeading(e.target.value)}
            className="bg-transparent border-none outline-none text-2xl font-bold mb-4"
          />
        </h2>
        {accordions.map((accordion, index) => (
          <div key={index} className="relative border-b border-gray-300 mb-2">
            <button
              className="flex justify-between w-full px-4 py-2 text-left bg-gray-200 hover:bg-gray-300"
              onClick={() => handleToggleAccordion(index)}
            >
              <input
                type="text"
                value={accordion.title}
                onChange={(e) => {
                  const newAccordions = [...accordions];
                  newAccordions[index].title = e.target.value;
                  setAccordions(newAccordions);
                }}
                className="bg-transparent border-none outline-none flex-grow"
              />
              <span>{accordion.open ? '-' : '+'}</span>
            </button>
            {accordion.open && (
              <div className="p-4">
                <textarea
                  value={accordion.content}
                  onChange={(e) => {
                    const newAccordions = [...accordions];
                    newAccordions[index].content = e.target.value;
                    setAccordions(newAccordions);
                  }}
                  className="w-full bg-transparent border-none outline-none"
                  rows={4}
                />
              </div>
            )}
            <div className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer" onClick={() => handleDeleteAccordion(index)}>

          
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TabsAndAccordions;
  `;
};


export default TabsAndAccordions;