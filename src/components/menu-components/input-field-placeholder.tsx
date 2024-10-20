import { EditorBtns } from '../../pages/const'
import { Edit } from 'lucide-react'
import React from 'react'

type Props = {}

const InputPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'inputfield')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Edit
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default InputPlaceholder