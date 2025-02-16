'use client'
import { Badge } from '../../components/ui/badge'
import { EditorBtns, defaultStyles } from '../../pages/const'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Recursive from './component_distributor'
import { Trash } from 'lucide-react'
import  { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client';
import { useSocket } from '../../SocketContext';  // Import the socket context





type Props = { element: EditorElement }

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element
  const { dispatch, state } = useEditor()
  const  socket  = useSocket(); 
  const [canvasComponents, setCanvasComponents] = useState<EditorElement[]>([]);  // State to store components on the canvas
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const { roomId } = useParams();



useEffect(() => {
  const handleSyncState = ({ roomId, updatedElements }: { roomId: string; updatedElements: any }) => {
    console.log(`C Sync event received for Room ID: ${roomId}`, updatedElements);
    console.log("C Updated elements: ", updatedElements)

    let parsedElements;
    try {
      parsedElements = typeof updatedElements === 'string' ? JSON.parse(updatedElements) : updatedElements;
    } catch (err) {
      console.error('Failed to parse updated elements:', err);
      return;
    }

    console.log('Recent elements:', parsedElements);
    dispatch({
    type: 'LOAD_DATA_S',
      payload: { elements: parsedElements },
    });
  };

  socket.on('syncState', handleSyncState);

  // Cleanup the listener on unmount
  return () => {
    socket.off('syncState', handleSyncState);
  };
}, [socket, dispatch]);



useEffect(() => {
  const handleElementdel = ({ deletedElement }: { deletedElement: any }) => {
    console.log('Element del:', deletedElement);

    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: deletedElement,
      },
    })
  };

  socket.on('componentDeleted', handleElementdel);

  return () => {
    socket.off('componentDeleted', handleElementdel);
  };
}, [socket, dispatch]);



useEffect(() => {
  const handleElementadd = ({ addedElement, containerId }: { addedElement: any, containerId : any }) => {
    console.log('Element add:', addedElement);
    console.log('cont add:', containerId);

    dispatch({
      type: "ADD_ELEMENT",
      payload: {
        containerId,
        elementDetails: addedElement,
      },
    });

  };

  socket.on('componentDropped', handleElementadd);

  return () => {
    socket.off('componentDropped', handleElementadd);
  };
}, [socket, dispatch]);






useEffect(() => {
  const handleElementClick = ({ selectedElement }: { selectedElement: EditorElement }) => {
    console.log('Element clicked:', selectedElement);

    // Dispatch action to update UI state with the selected element
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: selectedElement,
      },
    });
  };

  socket.on('elementClicked', handleElementClick);

  return () => {
    socket.off('elementClicked', handleElementClick);
  };
}, [socket, dispatch]);





  useEffect(() => {

    //socketRef.current = socket; // Ensure socketRef is initialized

    if (socketRef.current) {
      //socketRef.current.on('componentDropped', (componentData: any) => {
      //  setCanvasComponents((prev) => [...prev, componentData]);
      //});

      //socketRef.current.on('componentDeleted', (componentId: string) => {
      //  setCanvasComponents((prev) => prev.filter((comp) => comp.id !== componentId));
      //});



    }

    return () => {
      if (socketRef.current) {
        //socketRef.current.off('componentDropped');
        //socketRef.current.off('componentDeleted');

      }
    };
}, [socketRef]);



  const emitComponentDropped = (socket :any, roomId : any, state: any) => {
    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements); // Replace with Redux `getState` if available

      socket.emit('componentDropped', {
        roomId,
        updatedElements,
      });
    }, 0);
  };

  
const dispatchElement = (
  containerId: string,
  name: string,
  type: EditorBtns,
  content: any = [],
  styles: object = {}
) => {

  const newElement = {
    id: uuidv4(),
    name,
    type,
    content,
    styles,
  };

  dispatch({
    type: "ADD_ELEMENT",
    payload: {
      containerId,
      elementDetails: newElement,
    },
  });

  setTimeout(() => {
  const updatedElements = JSON.stringify(state.editor.elements); 

    socket.emit('componentDropped', {
      roomId,
      updatedElements,
      addedElement : newElement,
      containerId
    });
  }, 0);

};

// Main function to handle the drop event
const handleOnDrop = (e: React.DragEvent, type: string) => {
  e.stopPropagation(); // Prevent event bubbling
  const componentType = e.dataTransfer.getData("componentType") as EditorBtns;

  const defaultStyleOverrides = { color: "black", ...defaultStyles };

  switch (componentType) {
    case "text":
      dispatchElement(id, "Text", "text", { innerText: "Text Element" }, defaultStyleOverrides);
      break;
    case "link":
      dispatchElement(id, "Link", "link", { innerText: "Link Element", href: "#" }, defaultStyleOverrides);
      break;
    case "video":
      dispatchElement(id, "Video", "video", { src: "https://www.youtube.com/watch?v=mTbD8tYsVvk&t=3081s" }, {});
      break;
    case "container":
      dispatchElement(id, "Container", "container", [], defaultStyleOverrides);
      break;
    case "contactForm":
      dispatchElement(id, "Contact Form", "contactForm", [], {});
      break;
    case "paymentForm":
      dispatchElement(id, "Payment Form", "paymentForm", [], {});
      break;
    case "inputfield":
      dispatchElement(id, "Input Field", "inputfield", [], {});
      break;
    case "header":
      dispatchElement(id, "Header", "header", [], {});
      break;
    case "signup":
      dispatchElement(id, "Sign Up", "signup", [], {});
      break;
    case "signin":
      dispatchElement(id, "Sign In", "signin", [], {});
      break;
    case "hero":
      dispatchElement(id, "Hero", "hero", [], {});
      break;
    case "value":
      dispatchElement(id, "Value", "value", [], {});
      break;
    case "testimonial":
      dispatchElement(id, "Testimonial", "testimonial", [], {});
      break;
    case "features":
      dispatchElement(id, "Features", "features", [], {});
      break;
    case "footer":
      dispatchElement(id, "Footer", "footer", [], {});
      break;
    case "button":
      dispatchElement(id, "Button", "button", [], {});
      break;
    case "buttonset":
      dispatchElement(id, "Buttonset", "buttonset", [], {});
      break;
    case "loading":
      dispatchElement(id, "Loading", "loading", [], {});
      break;
    case "cartoons":
      dispatchElement(id, "Cartoons", "cartoons", [], {});
      break;
    case "texthover":
      dispatchElement(id, "Text Hover", "texthover", [], {});
      break;
    case "greetings":
      dispatchElement(id, "Greetings", "greetings", [], {});
      break;
    case "lasers":
      dispatchElement(id, "Lasers", "lasers", [], {});
      break;
    case "graph":
      dispatchElement(id, "Graph", "graph", [], {});
      break;
    case "navbars":
      dispatchElement(id, "Navbars", "navbars", [], {});
      break;
    case "gridsandcards":
      dispatchElement(id, "Grids and Cards", "gridsandcards", [], {});
      break;
    case "modals":
      dispatchElement(id, "Modals", "modals", [], {});
      break;
    case "search":
      dispatchElement(id, "Search", "search", [], {});
      break;
    case "tc":
      dispatchElement(id, "Tabs and Accordions", "tc", [], {});
      break;
    case "steps":
      dispatchElement(id, "Steps", "steps", [], {});
      break;
    case "sm":
      dispatchElement(id, "Social Media", "sm", [], {});
      break;
    case "stack":
      dispatchElement(id, "Stack", "stack", [], { display: "flex", flexDirection: "column", ...defaultStyles });
      break;
    case "urlimg":
      dispatchElement(id, "Image", "urlimg", [], {});
      break;
    case "2Col":
      dispatchElement(id, "Two Columns", "2Col", [
        {
          content: [],
          id: uuidv4(),
          name: "Container",
          styles: { ...defaultStyles, width: "100%" },
          type: "container",
        },
        {
          content: [],
          id: uuidv4(),
          name: "Container",
          styles: { ...defaultStyles, width: "100%" },
          type: "container",
        },
      ], { ...defaultStyles, display: "flex" });
      break;
    default:
      break;
  }
};

  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
    
  }

  return (
    <div
      style={styles}
      className={clsx('relative p-4 transition-all group', {
        'max-w-full w-full': type === 'container' || type === '2Col',
        'h-fit': type === 'container',
        'h-full': type === '__body',
        'overflow-scroll ': type === '__body',
        'flex flex-col md:!flex-row': type === '2Col',
        '!border-blue-500':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== '__body',
        '!border-yellow-400 !border-4':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === '__body',
        '!border-solid':
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== '__body'}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, 'container')}
    >
      <Badge
        className={clsx(
          'absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden',
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== '__body' && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  )
}

export default Container