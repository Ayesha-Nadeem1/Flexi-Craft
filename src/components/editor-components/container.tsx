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
  const { roomId } = useParams();


  const sampleoutput = `<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
  <div class="flex flex-col min-h-screen">
    <div class="relative flex flex-col-reverse py-12 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center text-center lg:flex-row lg:text-left">
          <div class="flex-1">
            <img src="https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" class="h-10">
            <h1 class="text-4xl font-bold leading-none mb-10 text-gray-900 lg:text-5xl">Fashion Brand</h1>
          </div>
          <div class="flex-1 lg:flex-grow-0 lg:pl-20">
            <p class="text-lg text-gray-600 leading-relaxed mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between flex-wrap p-6">
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded hover:text-gray-100 hover:border-gray-400">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">Home</a>
            <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">About</a>
            <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">Contact</a>
          </div>
          <div>
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-100 border-gray-400 hover:border-gray-500 hover:text-gray-900 hover:bg-gray-100 mt-4 lg:mt-0">Shop Now</a>
          </div>
        </div>
      </nav>
    </div>
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/3">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full h-64" src="https://source.unsplash.com/random/300x200/?fashion" alt="Sunset in the mountains">
            <div class="px-6 py-4">
              <h2 class="text-2xl font-bold text-gray-900">Collection A</h2>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/3">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full h-64" src="https://source.unsplash.com/random/300x200/?fashion" alt="Rainforest">
            <div class="px-6 py-4">
              <h2 class="text-2xl font-bold text-gray-900">Collection B</h2>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/3">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full h-64" src="https://source.unsplash.com/random/300x200/?fashion" alt="River">
            <div class="px-6 py-4">
              <h2 class="text-2xl font-bold text-gray-900">Collection C</h2>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 pb-12 lg:pb-24">
      <footer class="flex flex-wrap items-center justify-between border-t border-gray-200 pt-6">
        <div class="w-full lg:w-1/2">
          <p class="text-gray-600">Copyright © 2021 Fashion Brand. All Rights Reserved.</p>
        </div>
        <div class="w-full lg:w-1/2 text-right">
          <a href="#" class="text-gray-600 hover:text-gray-900 mr-4">Privacy Policy</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 mr-4">Terms of Service</a>
        </div>
      </footer>
    </div>
  </div>
</body>
</html>`





useEffect(() => {
  const handleSyncState = () => {
    console.log('cs cont')
    const currentState = state.editor.elements
    dispatch({
      type: 'LOAD_DATA_LS',
      payload: { elements: currentState },
    });
  
    socket.on('getstatus', handleSyncState);
  };
  
  socket.on('getstatus', handleSyncState);
  
  // Cleanup the listener on unmount
  return () => {
  socket.off('getstatus', handleSyncState);
  };
  }, [socket, dispatch]);

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



//DELETE
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


//ADD
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



//HIGHLIGHT
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

    socket.emit('elementClicked', {
      roomId,
      selectedElement: element,
    });
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })

    
    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
  
      socket.emit('componentDeleted', {
        roomId,
        updatedElements,
        deletedElement: element,  
      });
    }, 0);
    
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