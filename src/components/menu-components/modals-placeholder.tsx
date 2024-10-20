import { EditorBtns } from '../../pages/const'
import { ScanFace } from 'lucide-react'
import React from 'react'

type Props = {}

const ModalsPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'modals')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <ScanFace
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default ModalsPlaceholder