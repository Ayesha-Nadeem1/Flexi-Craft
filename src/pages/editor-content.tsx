'use client'
import { Button } from '../components/ui/button'
import { useEditor } from './editor-provider'
import clsx from 'clsx'
import { EyeOff } from 'lucide-react'
import React, { useEffect } from 'react'
import Component_distributor from '../components/editor-components/component_distributor'

type Props = { liveMode?: boolean }

const EditorContent = ({ liveMode }: Props) => {
  const { dispatch, state } = useEditor()

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: 'TOGGLE_LIVE_MODE',
        payload: { value: true },
      })
    }
  }, [liveMode])

  useEffect(() => {
    const savedEditorData = localStorage.getItem('editorElements')
    
    if (savedEditorData) {
      const parsedData = JSON.parse(savedEditorData)
      dispatch({
        type: 'LOAD_DATA_LS',
        payload: {
          elements: parsedData,
        }, 
      })
    }
  }, [dispatch])

  const handleClick = () => {
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {},
    })
  }

  const handleUnpreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }

  return (
    <div
      className={clsx(
        'use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md',
        {
          '!p-0 !mr-0':
            state.editor.previewMode === true || state.editor.liveMode === true,
          '!w-[850px]': state.editor.device === 'Tablet',
          '!w-[420px]': state.editor.device === 'Mobile',
          'w-full': state.editor.device === 'Desktop',
        }
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={'ghost'}
          size={'icon'}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Component_distributor
            key={childElement.id}
            element={childElement}
          />
        ))}
    </div>
  )
}

export default EditorContent
