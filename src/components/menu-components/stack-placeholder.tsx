import { EditorBtns } from '../../pages/const'

import React from 'react'
import { SquareStackIcon } from 'lucide-react'
//wallet-cards



type Props = {}

const StackPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'stack')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <SquareStackIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default StackPlaceholder