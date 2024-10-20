'use client'
import { Button } from '../components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip'
import { DeviceTypes, useEditor } from './editor-provider'
import clsx from 'clsx'
import {
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from 'lucide-react'
import React, { FocusEventHandler, useEffect } from 'react'
import { toast } from 'sonner'

// Removed Props type and related props from the component
const EditorNavigation = () => {

  const { state, dispatch } = useEditor()

  const handlePreviewClick = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }

  const handleUndo = () => {
    dispatch({ type: 'UNDO' })
  }

  const handleRedo = () => {
    dispatch({ type: 'REDO' })
  }

  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements)
    try {
      localStorage.setItem('editorElements', content)
      console.log('Saved content:', content)
      window.alert('Editor state saved successfully.')
    } catch (error) {
      window.alert('Failed to save editor state.')
    }
  }

  return (
    <TooltipProvider>
      <nav
        className={clsx(
          'border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all',
          { '!h-0 !p-0 !overflow-hidden': state.editor.previewMode }
        )}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit "
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: 'CHANGE_DEVICE',
                payload: { device: value as DeviceTypes },
              })
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="data-[state=active]:bg-muted w-10 h-10 p-0"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Mobile"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-slate-800"
            onClick={handlePreviewClick}
          >
            <EyeIcon />
          </Button>
          <Button
            disabled={!(state.history.currentIndex > 0)}
            onClick={handleUndo}
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-slate-800"
          >
            <Undo2 />
          </Button>
          <Button
            disabled={
              !(state.history.currentIndex < state.history.history.length - 1)
            }
            onClick={handleRedo}
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-slate-800 mr-4"
          >
            <Redo2 />
          </Button>
          <Button onClick={handleOnSave}>Save</Button>
        </aside>
      </nav>
    </TooltipProvider>
  )
}

export default EditorNavigation
