'use client'
import { toast } from '../../components/ui/use-toast'
import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import { EditorBtns } from '../../pages/const'
import clsx from 'clsx'
import { Trash } from 'lucide-react'

import React from 'react'

type Props = {
  element: EditorElement
}

const InputComponent = (props: Props) => {
  const { dispatch, state} = useEditor()


  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
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

  const styles = props.element.styles

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Form Submitted',
      description: 'Thank you for contacting us. We will get back to you soon.',
    })
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'contactForm')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center',
        {
          '!border-blue-500':
            state.editor.selectedElement.id === props.element.id,

          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div className="border-none transition-all w-full">
        <form onSubmit={onFormSubmit} className="flex flex-col gap-4 w-full">
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter text"
              required
            />
          </div>
        </form>
      </div>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  )
}


export const exportToInputCode = (element: EditorElement) => {

    return `

   

const InputComponent = () => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Form Submitted',
      description: 'Thank you for contacting us. We will get back to you soon.',
    });
  };

  return (
    <div className="border-none transition-all w-full">
      <form onSubmit={onFormSubmit} className="flex flex-col gap-4 w-full">
        <div className="mb-4">
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter text"
            required
          />
        </div>
      </form>

      <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default InputComponent;

    `;
  };


export default InputComponent
