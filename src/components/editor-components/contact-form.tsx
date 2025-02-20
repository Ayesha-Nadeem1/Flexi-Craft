'use client'
import { toast } from '../../components/ui/use-toast'
import { EditorBtns } from '../../pages/const'
import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';
import React from 'react'
import { Props } from './types'; 

const ContactFormComponent = (props: Props) => {
  const { dispatch, state} = useEditor()
  const socket = useSocket();
  const { roomId } = useParams();


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

    socket.emit('elementClicked', {
      roomId,
      selectedElement: props.element,
    });


  }

  const styles = props.element.styles

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })

    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
  
      socket.emit('componentDeleted', {
        roomId,
        updatedElements,
        deletedElement: props.element,  
      });
    }, 0);
    
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
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your message"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
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


export const generatecontactCode = (element: EditorElement) => {
  return `

const ContactForm = () => {

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Form Submitted',
      description: 'Thank you for contacting us. We will get back to you soon.',
    })
  }

  return (
    <div style={styles} className="contact-form">
      <form onSubmit={onFormSubmit}>
        <label htmlFor="first-name">First name</label>
        <input type="text" name="first-name" required />
        <label htmlFor="last-name">Last name</label>
        <input type="text" name="last-name" required />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
        <label htmlFor="message">Message</label>
        <textarea name="message" rows="4" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
  `;
};

export default ContactFormComponent;
