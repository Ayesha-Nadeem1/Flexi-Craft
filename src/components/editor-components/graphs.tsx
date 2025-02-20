'use client'

import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Props } from './types'; 
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';


const GraphEditor: React.FC<Props> = (props) => {
  const { dispatch, state } = useEditor()
  const socket = useSocket();
  const { roomId } = useParams();
  const [graphs, setGraphs] = useState([
    'lineChart',
    'barChart',
    'pieChart',
    'areaChart',
    'scatterPlot',
    'radarChart',
    'bubbleChart',
    'heatmap',
    'histogram',
    'donutChart'
  ])

  const handleDeleteGraph = (index: number) => {
    const updatedGraphs = graphs.filter((_, i) => i !== index)
    setGraphs(updatedGraphs)
  }

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })

    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
  
      socket.emit('componentDeleted', {
        roomId,
        updatedElements,
        deletedElement: props.element,  
      });
    }, 0);

  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })

    socket.emit('elementClicked', {
      roomId,
      selectedElement: props.element,
    });

  }

  const renderGraph = (type: string) => {
    switch(type) {
      case 'lineChart':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your line chart SVG or component here */}
            <svg className="w-full h-full">
              {/* Example line chart SVG */}
              <polyline fill="none" stroke="blue" strokeWidth="2" points="10,40 30,60 50,50 70,70"/>
            </svg>
          </div>
        )
      case 'barChart':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your bar chart SVG or component here */}
            <svg className="w-full h-full">
              {/* Example bar chart SVG */}
              <rect x="10" y="20" width="15" height="60" fill="blue"/>
              <rect x="35" y="10" width="15" height="70" fill="green"/>
              <rect x="60" y="30" width="15" height="50" fill="red"/>
            </svg>
          </div>
        )
      case 'pieChart':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your pie chart SVG or component here */}
            <svg className="w-full h-full">
              {/* Example pie chart SVG */}
              <circle cx="28" cy="28" r="20" fill="blue"/>
              <circle cx="28" cy="28" r="20" fill="red" stroke="blue" strokeWidth="10" strokeDasharray="20 40"/>
            </svg>
          </div>
        )
      case 'areaChart':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your area chart SVG or component here */}
            <svg className="w-full h-full">
              {/* Example area chart SVG */}
              <polygon points="10,40 30,60 50,50 70,70" fill="blue" opacity="0.3"/>
              <polyline fill="none" stroke="blue" strokeWidth="2" points="10,40 30,60 50,50 70,70"/>
            </svg>
          </div>
        )
      case 'scatterPlot':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your scatter plot SVG or component here */}
            <svg className="w-full h-full">
              {/* Example scatter plot SVG */}
              <circle cx="20" cy="30" r="8" fill="blue"/>
              <circle cx="40" cy="40" r="8" fill="green"/>
              <circle cx="60" cy="20" r="8" fill="red"/>
            </svg>
          </div>
        )
      case 'radarChart':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your radar chart SVG or component here */}
            <svg className="w-full h-full">
              {/* Example radar chart SVG */}
              <polygon points="28,10 45,30 28,50 10,30" fill="blue" opacity="0.3"/>
              <polyline fill="none" stroke="blue" strokeWidth="2" points="28,10 45,30 28,50 10,30"/>
            </svg>
          </div>
        )
      case 'bubbleChart':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your bubble chart SVG or component here */}
            <svg className="w-full h-full">
              {/* Example bubble chart SVG */}
              <circle cx="20" cy="30" r="12" fill="blue"/>
              <circle cx="40" cy="40" r="18" fill="green"/>
              <circle cx="60" cy="20" r="24" fill="red"/>
            </svg>
          </div>
        )
      case 'heatmap':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your heatmap SVG or component here */}
            <svg className="w-full h-full">
              {/* Example heatmap SVG */}
              <rect x="10" y="10" width="20" height="20" fill="blue"/>
              <rect x="35" y="10" width="20" height="20" fill="green"/>
              <rect x="60" y="10" width="20" height="20" fill="red"/>
            </svg>
          </div>
        )
      case 'histogram':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your histogram SVG or component here */}
            <svg className="w-full h-full">
              {/* Example histogram SVG */}
              <rect x="10" y="20" width="20" height="60" fill="blue"/>
              <rect x="35" y="10" width="20" height="70" fill="green"/>
              <rect x="60" y="30" width="20" height="50" fill="red"/>
            </svg>
          </div>
        )
      case 'donutChart':
        return (
          <div className="relative w-56 h-56 bg-transparent border border-gray-300 p-4">
            {/* Add your donut chart SVG or component here */}
            <svg className="w-full h-full">
              {/* Example donut chart SVG */}
              <circle cx="28" cy="28" r="20" fill="blue"/>
              <circle cx="28" cy="28" r="15" fill="white"/>
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section
      style={props.element.styles}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 relative gap-4',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <>
            <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
              {state.editor.selectedElement.name}
            </Badge>
            <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white cursor-pointer" onClick={handleDeleteContainer}>
              <Trash size={16} />
            </div>
          </>
        )}

      {graphs.map((graph, index) => (
        <div key={index} className="relative">
          {renderGraph(graph)}
          {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
              <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white cursor-pointer" onClick={() => handleDeleteGraph(index)}>
                <Trash size={16} />
              </div>
            )}
        </div>
      ))}
    </section>
  )
}

export default GraphEditor
