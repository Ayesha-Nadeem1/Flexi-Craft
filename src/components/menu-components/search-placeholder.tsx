import { EditorBtns } from '../../pages/const'
import React from 'react'
import { SearchIcon } from 'lucide-react'
//wallet-cards



type Props = {}

const SearchPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'search')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <SearchIcon
        size={40}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default SearchPlaceholder