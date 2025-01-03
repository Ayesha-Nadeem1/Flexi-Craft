'use client'

import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import { EditorBtns } from '../../pages/const'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import {Props} from './types'
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';


const ImageComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
  const [imageUrl, setImageUrl] = useState<string>('')
  const styles = props.element.styles
  const socket = useSocket();
  const { roomId } = useParams();

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

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
      });
      }, 0);


  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImageUrl(url)
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'image')}
      onClick={handleOnClick}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      {!state.editor.liveMode ? (
        <>
          <input
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            className="absolute top-0 left-0 w-full p-2 bg-white border border-gray-300 rounded-lg"
            placeholder="Enter image URL"
          />
          {imageUrl && (
            <div style={{ position: 'relative', width: styles.width || '100%', height: styles.height || 'auto' }}>
              <img
                src={imageUrl}
                alt="Loaded"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Adjust styling here
              />
            </div>
          )}
        </>
      ) : (
        <div style={{ position: 'relative', width: styles.width || '100%', height: styles.height || 'auto' }}>
          <img
            src={imageUrl}
            alt="Loaded"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Adjust styling here
          />
        </div>
      )}

      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <div
          className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white"
        >
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

export default ImageComponent
