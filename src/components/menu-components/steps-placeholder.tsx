import { EditorBtns } from '../../pages/const'

import React from 'react'
import { StepForwardIcon } from 'lucide-react'



type Props = {}

const StepsPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'steps')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <StepForwardIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default StepsPlaceholder