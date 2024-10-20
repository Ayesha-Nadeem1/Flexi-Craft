'use client'
import { Badge } from '../../components/ui/badge'
import { EditorBtns, defaultStyles } from '../../pages/const'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Recursive from './component_distributor'
import { Trash } from 'lucide-react'

type Props = { element: EditorElement }

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element
  const { dispatch, state } = useEditor()

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation() //to prevent event bubbling
    const componentType = e.dataTransfer.getData('componentType') as EditorBtns

    switch (componentType) {
      case 'text':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'Text Element' },
              id: uuidv4(),
              name: 'Text',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
              type: 'text',
            },
          },
        })
        break
      case 'link':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: 'Link Element',
                href: '#',
              },
              id: uuidv4(),
              name: 'Link',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
              type: 'link',
            },
          },
        })
        break
      case 'video':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: 'https://www.youtube.com/watch?v=mTbD8tYsVvk&t=3081s',
              },
              id: uuidv4(),
              name: 'Video',
              styles: {},
              type: 'video',
            },
          },
        })
        break
      case 'container':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: uuidv4(),
              name: 'Container',
              styles: { ...defaultStyles },
              type: 'container',
            },
          },
        })
        break
      case 'contactForm':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: uuidv4(),
              name: 'Contact Form',
              styles: {},
              type: 'contactForm',
            },
          },
        })
        break
      case 'paymentForm':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: uuidv4(),
              name: 'Contact Form',
              styles: {},
              type: 'paymentForm',
            },
          },
        })
        break

      case 'inputfield':
          dispatch({
            type: 'ADD_ELEMENT',
            payload: {
              containerId: id,
              elementDetails: {
                content: [],
                id: uuidv4(),
                name: 'Input Field',
                styles: {},
                type: 'inputfield',
              },
            },
          })
      break

      case 'header':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: uuidv4(),
              name: 'Header',
              styles: {},
              type: 'header',
            },
          },
        })
    break

    case 'hero':
      dispatch({
        type: 'ADD_ELEMENT',
        payload: {
          containerId: id,
          elementDetails: {
            content: [],
            id: uuidv4(),
            name: 'Hero',
            styles: {},
            type: 'hero',
          },
        },
      })
  break

  case 'value':
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        containerId: id,
        elementDetails: {
          content: [],
          id: uuidv4(),
          name: 'Value',
          styles: {},
          type: 'value',
        },
      },
    })
break


case 'testimonial':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Testimonial',
        styles: {},
        type: 'testimonial',
      },
    },
  })
break

case 'features':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Features',
        styles: {},
        type: 'features',
      },
    },
  })
break

case 'footer':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Footer',
        styles: {},
        type: 'footer',
      },
    },
  })
break

case 'button':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Button',
        styles: {},
        type: 'button',
      },
    },
  })
break

case 'buttonset':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Buttonset',
        styles: {},
        type: 'buttonset',
      },
    },
  })
break


case 'loading':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Loading',
        styles: {},
        type: 'loading',
      },
    },
  })
break


case 'cartoons':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Cartoons',
        styles: {},
        type: 'cartoons',
      },
    },
  })
break

case 'texthover':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Text hover',
        styles: {},
        type: 'texthover',
      },
    },
  })
break


case 'greetings':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Greetings',
        styles: {},
        type: 'greetings',
      },
    },
  })
break


case 'lasers':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Lasers',
        styles: {},
        type: 'lasers',
      },
    },
  })
break


case 'graph':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Graph',
        styles: {},
        type: 'graph',
      },
    },
  })
break


case 'navbars':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Navbars',
        styles: {},
        type: 'navbars',
      },
    },
  })
break


case 'gridsandcards':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Grids and Cards',
        styles: {},
        type: 'gridsandcards',
      },
    },
  })
break

case 'modals':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Modals',
        styles: {},
        type: 'modals',
      },
    },
  })
break


case 'search':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Search',
        styles: {},
        type: 'search',
      },
    },
  })
break


case 'tc':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Tabs and Accordions',
        styles: {},
        type: 'tc',
      },
    },
  })
break


case 'steps':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Steps',
        styles: {},
        type: 'steps',
      },
    },
  })
break


case 'sm':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Social Media',
        styles: {},
        type: 'sm',
      },
    },
  })
break

case 'stack':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Stack',
        styles: {display: 'flex', flexDirection: 'column', ...defaultStyles},
        type: 'stack',
      },
    },
  })
break



case 'urlimg':
  dispatch({
    type: 'ADD_ELEMENT',
    payload: {
      containerId: id,
      elementDetails: {
        content: [],
        id: uuidv4(),
        name: 'Image',
        styles: {},
        type: 'urlimg',
      },
    },
  })
break





      case '2Col':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: uuidv4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
              ],
              id: uuidv4(),
              name: 'Two Columns',
              styles: { ...defaultStyles, display: 'flex' },
              type: '2Col',
            },
          },
        })
        break
    }
  }

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
