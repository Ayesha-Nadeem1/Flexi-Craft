'use client'

import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

const FooterSection: React.FC<Props> = (props) => {
  const { dispatch, state } = useEditor()

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  const handleUpdateContent = (field: 'heading' | 'subheading' | 'footer_text' | 'contact_info', e: React.FocusEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          content: {
            ...props.element.content,
            [field]: divElement.innerText,
          },
        },
      },
    })
  }

  const styles = props.element.styles

  return (
    <footer
      style={styles}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 px-6 text-black relative',
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
        onBlur={(e) => handleUpdateContent('heading', e)}
        className="text-3xl font-bold mb-4"
      >
        {!Array.isArray(props.element.content) && props.element.content.heading || 'Footer Heading'}
      </h1>
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('subheading', e)}
        className="text-lg mb-4"
      >
        {!Array.isArray(props.element.content) && props.element.content.subheading || 'Your footer subheading or description here.'}
      </p>
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('footer_text', e)}
        className="text-md mb-8"
      >
        {!Array.isArray(props.element.content) && props.element.content.footer_text || 'Additional footer text or information here.'}
      </p>
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('contact_info', e)}
        className="text-md mb-8"
      >
        {!Array.isArray(props.element.content) && props.element.content.contact_info || 'Contact information: email@example.com'}
      </p>

      <div className="flex gap-6 justify-center">
        <a href="#privacy" className="hover:underline">Privacy Policy</a>
        <a href="#terms" className="hover:underline">Terms of Service</a>
        <a href="#contact" className="hover:underline">Contact Us</a>
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
    </footer>
  )
}

export default FooterSection
