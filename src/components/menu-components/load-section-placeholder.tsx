import { EditorBtns } from '../../pages/const'
import { Loader2Icon  } from 'lucide-react'
import React from 'react'

type Props = {}

const LoadingPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'loading')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Loader2Icon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default LoadingPlaceholder