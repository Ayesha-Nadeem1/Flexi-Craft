'use client'


import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Props } from './types'; 


const SearchComponent: React.FC<Props> = ({ element }) => {
  const { dispatch, state } = useEditor()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [bgColor, setBgColor] = useState<string>('#ffffff')

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  return (
    <div
      style={{ ...element.styles }}
      className={clsx(
        'relative flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md',
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
          <div className="absolute top-2 left-2 flex items-center">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 border-none p-0"
              aria-label="Select background color"
            />
          </div>
        </>
      )}

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          style={{ backgroundColor: bgColor }}
        />
        <button
          className="absolute top-0 right-0 mt-2 mr-3 text-gray-500"
          aria-label="Search"
          type="button"
          onClick={() => console.log(`Searching for: ${searchQuery}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.64 11.5a5.14 5.14 0 11-10.28 0 5.14 5.14 0 0110.28 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export const exportTosearchCode = (element: EditorElement) => {

  const code = `
    const SearchComponent = () => {

      const styles = { ...element.styles };

      return (
        <div
          style={styles}
          className="relative flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md"
        >
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              style={{ backgroundColor: bgColor }}
            />
            <button
              className="absolute top-0 right-0 mt-2 mr-3 text-gray-500"
              aria-label="Search"
              type="button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16.64 11.5a5.14 5.14 0 11-10.28 0 5.14 5.14 0 0110.28 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      );
    };
  `;
  return code;
};


export default SearchComponent
