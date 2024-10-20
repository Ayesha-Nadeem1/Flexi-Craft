import { EditorBtns } from '../../pages/const'
import React from 'react'
import { Move3DIcon } from 'lucide-react'
//wallet-cards



type Props = {}

const CartoonPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'cartoons')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Move3DIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default CartoonPlaceholder