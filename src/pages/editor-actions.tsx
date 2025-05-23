import { DeviceTypes, EditorElement } from './editor-provider'

export type EditorAction =
  | {
      type: 'ADD_ELEMENT'
      payload: {
        containerId: string
        elementDetails: EditorElement
      }
    }
  | 

   {
    type: 'ADDMODEL_ELEMENT'
    payload: {
      containerId: string
      elementDetails: any
    }
  }
|

  {
      type: 'UPDATE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
      type: 'DELETE_ELEMENT'
      payload: {
        elementDetails: EditorElement
      }
    }
  | {
    type: 'DELETE_ELEMENT_COLLAB'
    payload: {
      roomId: string,
      elementDetails: EditorElement
    }
  } | {
      type: 'CHANGE_CLICKED_ELEMENT'
      payload: {
        elementDetails?:
          | EditorElement
          | {
              id: ''
              content: []
              name: ''
              styles: {}
              type: null
            }
      }
    }
  | {
      type: 'CHANGE_DEVICE'
      payload: {
        device: DeviceTypes
      }
    }
  | {
      type: 'TOGGLE_PREVIEW_MODE'
    }
  | {
      type: 'TOGGLE_LIVE_MODE'
      payload?: {
        value: boolean
      }
    }
  | { type: 'REDO' }
  | { type: 'UNDO' }
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorElement[]
        withLive: boolean
      }
    }
  |
{
    type: 'LOAD_DATA_LS'
    payload: {
      elements: EditorElement[]
    }
  }
  |

  {
      type: 'LOAD_MODEL_DATA'
      payload: {
        elements: any
      }
    }
  |

  
  {
      type: 'LOAD_UPDATED_STATE'
      payload: {
        elements: EditorElement[]
      }
    }
    |

  {
    type: 'LOAD_DATA_TEMPLATE'
    payload: {
      elements: EditorElement[]
    }
  }
  |

  

  {
    type: 'GET_CURRENT_STATE'
    payload: {
      elements: EditorElement[]
    }
  }
  |

  

  {
    type: 'LOAD_DATA_S'
    payload: {
      elements: EditorElement[]
    }
  }
  |
  
  {
      type: 'SET_FUNNELPAGE_ID'
      payload: {
        funnelPageId: string
      }
    }