import { EditorBtns } from '../../pages/const'
import { FileText } from 'lucide-react'
import React from 'react'

type Props = {}

const HeaderPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'header')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <FileText
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default HeaderPlaceholder