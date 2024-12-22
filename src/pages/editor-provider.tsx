'use client'
import { EditorBtns } from './const'
import { EditorAction } from './editor-actions'
import { Dispatch, createContext, useContext, useReducer } from 'react'
import React from 'react';
export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

export type CardType = {
  title: string;
  description: string;
  imageUrl: string;

};

export type ImageCarousel = {
  imageUrl: string;
  linkUrl?: string;
  title?: string;       
  titleColor?: string;  
};

export interface Step {
  title: string;
  description: string;
}


export type EditorElement = {
  id: string
  styles: React.CSSProperties
  mediaUrl?: string;      
  imageWidth?: string;     
  imageHeight?: string;  
  imageCarousels?: ImageCarousel[];  
  title?: string;  
  titleColor?: string; 
  htitle?: string
  htagline?: string
  texttitle?:string
  buttontext?:string
  innerText?: string
  href?: string
  herotitle?: string
  herotagline?: string
  ftitle?: string; 
  fdescription?: string; 
  value1?: string; 
  value1Description?: string; 
  value2?: string; 
  value2Description?: string; 
  value3?: string; 
  value3Description?: string; 
  value4?: string; 
  value4Description?: string; 
  feature_title?: string; 
  feature_description?: string; 
  feature1?: string; 
  feature1Description?: string; 
  feature2?: string; 
  feature2Description?: string; 
  feature3?: string; 
  feature3Description?: string; 
  feature4?: string; 
  feature4Description?: string;
  quote?: string
  author?: string 
  tabs?: string[]; 
  tabContents?: string[]; 
  tabHeading?: string; 
  accordionHeading?: string; 
  accordions?: { title: string; content: string; open: boolean }[]; 
  stepHeading?: string; 

  links?: { name: string; href: string }[];
  orientation?: 'horizontal' | 'vertical';
  navstyles?: {
    color?: string;
    backgroundColor?: string;
    // other style properties...
  };





  name: string
  type: EditorBtns
  content: {
    


    description?: string
    feature_title?: string
    feature_description?: string
    feature1?: string
    feature1Description?: string
    feature2?: string
    feature2Description?: string
    feature3?: string
    feature3Description?: string
    feature4?: string
    feature4Description?: string
    heading?: string
    subheading?: string
   
    [key: string]: any

    src?: string
  } | EditorElement[]

  cards?: CardType[];
  steps?: Step[];



  [key: string]: any;


};

const isContentObject = (content: any): content is { [key: string]: any } => {
  return typeof content === 'object' && !Array.isArray(content)
}



export type Editor = {
  liveMode: boolean
  elements: EditorElement[]
  selectedElement: EditorElement
  device: DeviceTypes
  previewMode: boolean
  funnelPageId: string
}

export type HistoryState = {
  history: Editor[]
  currentIndex: number
}

export type EditorState = {
  editor: Editor
  history: HistoryState
}

const initialEditorState: EditorState['editor'] = {
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: {
    id: '',
    content: [],
    name: '',
    styles: {},
    type: null,
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
  funnelPageId: '',
}

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
}

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
}

const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'ADD_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Add Element editor State'
    )
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      }
    }
    return item
  })
}

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'UPDATE_ELEMENT') {
    throw Error('You sent the wrong action type to the update Element State')
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      }
    }
    return item
  })
}

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'DELETE_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Delete Element editor State'
    )
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action)
    }
    return true
  })
}

const deleteElementForRoom = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'DELETE_ELEMENT_COLLAB')
    throw Error(
      'You sent the wrong action type to the Delete Element for Room State'
    );

  const { roomId, elementDetails } = action.payload;

  return editorArray.filter((item) => {
    // Check if the element belongs to the specified room and matches the component ID
    console.log("dispatch delelemntroom idd", roomId)
    if (item.roomId === roomId && item.id === elementDetails.id) {
      return false; // Remove this item if it matches the criteria
    } else if (item.content && Array.isArray(item.content)) {
      // Recursively check the content if it's an array
      item.content = deleteElementForRoom(item.content, action);
    }
    return true;
  });
};





const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      }
      // Update the history to include the entire updated EditorState
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState }, // Save a copy of the updated state
      ]

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      }

      return newEditorState

    case 'UPDATE_ELEMENT':
      // Perform your logic to update the element in the state
      const updatedElements = updateAnElement(state.editor.elements, action)

      const UpdatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: '',
              content: [],
              name: '',
              styles: {},
              type: null,
            },
      }

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate }, // Save a copy of the updated state
      ]
      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      }
      return updatedEditor

    case 'DELETE_ELEMENT':
      // Perform your logic to delete the element from the state
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action
      )
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      }
      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete }, // Save a copy of the updated state
      ]

      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      }
      return deletedState

    

      case 'DELETE_ELEMENT_COLLAB':
        // Perform the deletion logic for the specified room and component
        const updatedElementsForRoom = deleteElementForRoom(state.editor.elements, action);
      
    
        // Update the editor state with the deleted component
        const updatedEditorStateAfterDelete_C = {
            ...state.editor,
            elements: updatedElementsForRoom,
        };
    
        // Handle history update to allow undo/redo functionality
        const updatedHistoryAfterDelete_C = [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...updatedEditorStateAfterDelete_C }, // Save a copy of the updated state
        ];
    
        // Prepare the new state after deletion
        const deletedState_C = {
            ...state,
            editor: updatedEditorStateAfterDelete_C,
            history: {
                ...state.history,
                history: updatedHistoryAfterDelete_C,
                currentIndex: updatedHistoryAfterDelete_C.length - 1,
            },
        };
    
        return deletedState_C;
    

  
    case 'CHANGE_CLICKED_ELEMENT':
      const clickedState = {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            id: '',
            content: [],
            name: '',
            styles: {},
            type: null,
          },
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor }, // Save a copy of the current editor state
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      }
      return clickedState
    case 'CHANGE_DEVICE':
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      }
      return changedDeviceState

    case 'TOGGLE_PREVIEW_MODE':
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      }
      return toggleState

    case 'TOGGLE_LIVE_MODE':
      const toggleLiveMode: EditorState = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? action.payload.value
            : !state.editor.liveMode,
        },
      }
      return toggleLiveMode

    case 'REDO':
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1
        const nextEditorState = { ...state.history.history[nextIndex] }
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        }
        return redoState
      }
      return state

    case 'UNDO':
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1
        const prevEditorState = { ...state.history.history[prevIndex] }
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        }
        return undoState
      }
      return state

    case 'LOAD_DATA':
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      }


      //case 'LOAD_UPDATED_STATE':
      //  return {
      //    ...state,
      //   editor:{
      //      ...initialState.editor,
      //      elements: action.payload.elements || initialEditorState.elements
      //    }, // Replace the editor state with the updated one
      //  };

        case 'LOAD_UPDATED_STATE': {
          const { elements } = action.payload;
          // Ensure the passed elements are valid
          if (!elements || !Array.isArray(elements)) {
            console.warn('No valid elements provided to sync.');
            return state;
          }
        
          return {
            ...state,
            editor: {
              ...state.editor, // Keep other properties of the editor unchanged
              elements, // Update the elements with the provided state
            },
            history: {
              ...state.history,
              history: [...state.history.history, { ...state.editor, elements }], // Add updated editor state to history
              currentIndex: state.history.currentIndex + 1,
            },
          };
        }
        
      
    
    case 'LOAD_DATA_LS':
        return {
          ...initialState,
          editor: {
            ...initialState.editor,
            elements: action.payload.elements || initialEditorState.elements,
          },
        }



      case 'LOAD_DATA_S': {
          const { elements } = action.payload;
        
          // Validate elements
          if (!Array.isArray(elements)) {
            console.warn('Invalid elements payload for LOAD_DATA_LS.');
            return state;
          }
        
          return {
            ...initialState,
            editor: {
              ...initialState.editor,
              elements: elements || initialEditorState.elements,
              // Reset selectedElement if it was deleted
              selectedElement: elements.find((el) => el.id === state.editor.selectedElement.id)
                ? state.editor.selectedElement
                : initialEditorState.selectedElement,
            },
          };
        }
        

    case 'LOAD_DATA_TEMPLATE':
        return {
          ...initialState,
          editor: {
            ...initialState.editor,
            elements: action.payload.elements || initialEditorState.elements,
          },
        }


  



    case 'SET_FUNNELPAGE_ID':
      const { funnelPageId } = action.payload
      const updatedEditorStateWithFunnelPageId = {
        ...state.editor,
        funnelPageId,
      }

      const updatedHistoryWithFunnelPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithFunnelPageId }, // Save a copy of the updated state
      ]

      const funnelPageIdState = {
        ...state,
        editor: updatedEditorStateWithFunnelPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithFunnelPageId,
          currentIndex: updatedHistoryWithFunnelPageId.length - 1,
        },
      }
      return funnelPageIdState

    default:
      return state
  }
}

export type EditorContextData = {
  device: DeviceTypes
  previewMode: boolean
  setPreviewMode: (previewMode: boolean) => void
  setDevice: (device: DeviceTypes) => void
}

export const EditorContext = createContext<{
  state: EditorState
  dispatch: Dispatch<EditorAction>

}>({
  state: initialState,
  dispatch: () => undefined,
})

type EditorProps = {
  children: React.ReactNode
}

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor Hook must be used within the editor Provider')
  }
  return context
}

export default EditorProvider