'use client'

import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'

const GridAndCards: React.FC<{ element: EditorElement }> = ({ element }) => {
  const { dispatch, state } = useEditor()
  const [cards, setCards] = useState(element.cards || [
    { title: 'Card 1', description: 'This is the first card.', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Card 2', description: 'This is the second card.', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Card 3', description: 'This is the third card.', imageUrl: 'https://via.placeholder.com/150' },
  ])
  const [columns, setColumns] = useState<number>(3)
  const [cardColor, setCardColor] = useState<string>(element.styles.backgroundColor || '#ffffff')

  const handleDeleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index)
    setCards(updatedCards)
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: { ...element, cards: updatedCards },
      },
    })
  }

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleColorChange = (color: string) => {
    setCardColor(color)
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: { ...element, styles: { ...element.styles, backgroundColor: color } },
      },
    })
  }

  const handleImageUrlChange = (index: number, url: string) => {
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, imageUrl: url } : card
    )
    setCards(updatedCards)
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: { ...element, cards: updatedCards },
      },
    })
  }

  const handleTitleChange = (index: number, title: string) => {
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, title: title } : card
    )
    setCards(updatedCards)
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: { ...element, cards: updatedCards },
      },
    })
  }

  const handleDescriptionChange = (index: number, description: string) => {
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, description: description } : card
    )
    setCards(updatedCards)
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: { ...element, cards: updatedCards },
      },
    })
  }

  return (
    <section
      style={{ ...element.styles, backgroundColor: cardColor }}
      className={clsx(
        'relative p-4',
        { [`grid-cols-${columns}`]: true },
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <>
          <Badge className="absolute top-2 left-2 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
          <div
            className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded-none rounded-t-lg text-white cursor-pointer"
            onClick={handleDeleteContainer}
          >
            <Trash size={16} />
          </div>
        </>
      )}

      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {cards.map((card, index) => (
          <div key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={card.imageUrl} alt={card.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              {state.editor.selectedElement.id === element.id && !state.editor.liveMode ? (
                <>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    placeholder="Enter card title"
                    className="w-full text-xl font-semibold border p-1 mb-2 rounded"
                    disabled={state.editor.liveMode}
                  />
                  <textarea
                    value={card.description}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    placeholder="Enter card description"
                    className="w-full text-gray-600 border p-1 rounded"
                    rows={3}
                    disabled={state.editor.liveMode}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-2 text-gray-600">{card.description}</p>
                </>
              )}
              {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
                <div className="absolute top-2 right-12 flex items-center">
                  <input
                    type="text"
                    value={card.imageUrl}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder="Enter image URL"
                    className="p-1 border rounded mr-2 w-80"
                    disabled={state.editor.liveMode}
                  />
                  <div
                    className="bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer"
                    onClick={() => handleDeleteCard(index)}
                  >
                    <Trash size={16} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="absolute bottom-4 left-2 right-2 flex justify-between space-x-2">
          <input
            type="color"
            value={cardColor}
            onChange={(e) => handleColorChange(e.target.value)}
            disabled={state.editor.liveMode}
            className="p-1 rounded"
          />
        </div>
      )}
    </section>
  )
}

export default GridAndCards
