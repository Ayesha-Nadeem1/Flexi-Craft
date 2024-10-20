import { EditorBtns } from '../../pages/const'

import React from 'react'
import { PersonStandingIcon } from 'lucide-react'
//wallet-cards



type Props = {}

const SMPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'sm')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <PersonStandingIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default SMPlaceholder