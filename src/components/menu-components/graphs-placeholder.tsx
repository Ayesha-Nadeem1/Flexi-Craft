import { EditorBtns } from '../../pages/const'
import { GitGraphIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const GraphsPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'graph')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <GitGraphIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default GraphsPlaceholder