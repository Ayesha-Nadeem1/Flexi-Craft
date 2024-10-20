'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet'
import { Tabs, TabsContent } from '../components/ui/tabs'
import { useEditor } from './editor-provider'
import clsx from 'clsx'
import React from 'react'
import TabList from './tabs'
import SettingsTab from './settings'
import Templates from './Templates'
import ComponentsTab from '../components/menu-components/draggable-components-sidebar'

const EditorSidebar = () => {
  const { state, dispatch } = useEditor()

  return (
    <Sheet
      open={true}
      modal={false}
    >
      <Tabs
        className="w-full "
        defaultValue="Settings"
      >
        <SheetContent
          side="right"
          className={clsx(
            'mt-[97px] w-16 z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden',
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          side="right"
          className={clsx(
            'mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden ',
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>CSS Styling</SheetTitle>
                <SheetDescription>
                  Customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Media">
              <Templates />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="text-left p-6 ">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  Drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  )
}

export default EditorSidebar
