'use client'

import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Props } from './types'; 


type NavbarType = 'horizontal' | 'vertical'

const Navbar: React.FC<Props> = ({ element }) => {
  const { dispatch, state } = useEditor()
  const [links, setLinks] = useState<{ name: string; href: string }[]>([
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Contact', href: '#' },
  ])
  const [orientation, setOrientation] = useState<NavbarType>('horizontal')
  const [textColor, setTextColor] = useState<string>(element.styles.color || '#ffffff')
  const [bgColor, setBgColor] = useState<string>(element.styles.backgroundColor || '#333333')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editName, setEditName] = useState<string>('')

  const handleDeleteLink = (index: number) => {
    setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index))
  }

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

  const handleColorChange = (colorType: 'text' | 'bg', color: string) => {
    if (colorType === 'text') {
      setTextColor(color)
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: { ...element, styles: { ...element.styles, color } },
        },
      })
    } else if (colorType === 'bg') {
      setBgColor(color)
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: { ...element, styles: { ...element.styles, backgroundColor: color } },
        },
      })
    }
  }

  const handleEditLink = (index: number) => {
    setEditIndex(index)
    setEditName(links[index].name)
  }

  const handleSaveEdit = (index: number) => {
    setLinks((prevLinks) => prevLinks.map((link, i) => (i === index ? { ...link, name: editName } : link)))
    setEditIndex(null)
  }

  const isHorizontal = orientation === 'horizontal'

  return (
    <nav
      style={{ ...element.styles, color: textColor, backgroundColor: bgColor }}
      className={clsx(
        'p-4',
        {
          'flex items-center justify-between': isHorizontal,
          'flex-col': !isHorizontal,
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
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
          <div className="absolute top-2 left-16 flex space-x-2">
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as NavbarType)}
              className="bg-gray-700 border border-gray-600 text-white rounded p-1"
              disabled={state.editor.liveMode}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
            <input
              type="color"
              value={textColor}
              onChange={(e) => handleColorChange('text', e.target.value)}
              disabled={state.editor.liveMode}
              className="p-1 rounded"
            />
            <input
              type="color"
              value={bgColor}
              onChange={(e) => handleColorChange('bg', e.target.value)}
              disabled={state.editor.liveMode}
              className="p-1 rounded"
            />
          </div>
        </>
      )}

      <ul className={clsx('flex', { 'space-x-4': isHorizontal, 'flex-col space-y-4': !isHorizontal })}>
        {links.map((link, index) => (
          <li key={index} className="relative">
            {editIndex === index ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="p-1 rounded text-black"
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <a
                href={link.href}
                className="hover:underline"
                onDoubleClick={() => handleEditLink(index)}
              >
                {link.name}
              </a>
            )}
            {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
              <div
                className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-2 -right-2 rounded-none rounded-t-lg text-white cursor-pointer"
                onClick={() => handleDeleteLink(index)}
              >
                <Trash size={16} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const exportTonavCode = (element: EditorElement) => {
  const { styles, links, orientation } = element
  const navLinks = links?.map((link) => `<a href="${link.href}">${link.name}</a>`).join('\n')
  const orientationClass = orientation === 'horizontal' ? 'flex items-center justify-between' : 'flex-col'

  return `
    import React from 'react';

    const Navbar = ({ textColor = '${element.styles.color || '#ffffff'}', bgColor = '${element.styles.backgroundColor || '#333333'}' }) => (
      <nav
        style={{ color: textColor, backgroundColor: bgColor, ...${JSON.stringify(styles)} }}
        className="p-4 ${orientationClass}"
      >
              <ul className={clsx('flex', { 'space-x-4': isHorizontal, 'flex-col space-y-4': !isHorizontal })}>
        {links.map((link, index) => (
          <li key={index} className="relative">
            {editIndex === index ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="p-1 rounded text-black"
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <a
                href={link.href}
                className="hover:underline"
                onDoubleClick={() => handleEditLink(index)}
              >
                {link.name}
              </a>
            )}
            {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
              <div
                className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-2 -right-2 rounded-none rounded-t-lg text-white cursor-pointer"
                onClick={() => handleDeleteLink(index)}
              >
                <Trash size={16} />
              </div>
            )}
          </li>
        ))}
      </ul>
      </nav>
    );

    export default Navbar;
  `
}

export default Navbar
