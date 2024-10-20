import { EditorBtns } from '../../pages/const'
import { Award } from 'lucide-react'
import React from 'react'

type Props = {}

const HeroPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'hero')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Award
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default HeroPlaceholder