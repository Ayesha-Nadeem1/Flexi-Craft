'use client'


import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import { Trash, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'

type Props = {
  element: EditorElement
}

const LoadingComponent = (props: Props) => {
  const { dispatch, state } = useEditor()
  const [progress, setProgress] = useState(0)
  const [loadingElements, setLoadingElements] = useState([
    'spinner',
    'progressBar',
    'dots',
    'skeletonScreen',
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 0))
    }, 500)
    return () => clearInterval(interval)
  }, [])

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

  const handleDeleteLoadingElement = (element: string) => {
    setLoadingElements((prev) => prev.filter((el) => el !== element))
  }

  const styles = props.element.styles

  return (
    <section
      style={styles}
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
          <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {/* Spinner */}
      {loadingElements.includes('spinner') && (
        <div className="relative">
          <div className="border-t-4 border-b-4 border-primary border-solid rounded-full w-16 h-16 animate-spin"></div>
          {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
              <X
                className="absolute top-0 right-0 cursor-pointer text-red-500"
                size={16}
                onClick={() => handleDeleteLoadingElement('spinner')}
              />
            )}
        </div>
      )}

      {/* Progress Bar */}
      {loadingElements.includes('progressBar') && (
        <div className="relative w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
              <X
                className="absolute top-0 right-0 cursor-pointer text-red-500"
                size={16}
                onClick={() => handleDeleteLoadingElement('progressBar')}
              />
            )}
        </div>
      )}

      {/* Dots */}
      {loadingElements.includes('dots') && (
        <div className="relative flex space-x-1">
          <div className="bg-primary w-2.5 h-2.5 rounded-full animate-bounce delay-75"></div>
          <div className="bg-primary w-2.5 h-2.5 rounded-full animate-bounce delay-150"></div>
          <div className="bg-primary w-2.5 h-2.5 rounded-full animate-bounce delay-300"></div>
          {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
              <X
                className="absolute top-0 right-0 cursor-pointer text-red-500"
                size={16}
                onClick={() => handleDeleteLoadingElement('dots')}
              />
            )}
        </div>
      )}

      {/* Skeleton Screen */}
      {loadingElements.includes('skeletonScreen') && (
        <div className="relative w-full h-12 bg-gray-300 animate-pulse rounded">
          {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
              <X
                className="absolute top-0 right-0 cursor-pointer text-red-500"
                size={16}
                onClick={() => handleDeleteLoadingElement('skeletonScreen')}
              />
            )}
        </div>
      )}

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
    </section>
  )
}

export default LoadingComponent
