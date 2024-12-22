'use client'

import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import { toast } from '../ui/use-toast'
import { EditorBtns } from '../../pages/const'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Props } from './types'; 

const Checkout = (props: Props) => {
  const { dispatch, state } = useEditor()
  const [clientSecret, setClientSecret] = useState('')
  const [livePrices, setLivePrices] = useState([])
  const [subAccountConnectAccId, setSubAccountConnectAccId] = useState('')
  const options = useMemo(() => ({ clientSecret }), [clientSecret])
  const styles = props.element.styles

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'paymentForm')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div className="border-none transition-all w-full">
        <div className="flex flex-col gap-6 w-full px-4 py-6 max-w-xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900">Checkout</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="card-details" className="block text-sm font-medium text-gray-700">Card Details</label>
              <div className="mt-2">
                {/* Add your card input component here */}
                <input
                  id="card-details"
                  type="text"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm"
                  placeholder="Enter your card details"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Pay
            </button>
          </form>
        </div>
      </div>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-indigo-600 px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  )
}

export const exportToCheckoutCode = (element: EditorElement) => {
  const styles = JSON.stringify(element.styles || {});
  
  return `
    const Checkout = ({ styles = ${styles} }) => {
      const [clientSecret, setClientSecret] = useState('');
      const options = useMemo(() => ({ clientSecret }), [clientSecret]);


      return (
        <div
          style={styles}
          className="p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center"
        >
          <div className="border-none transition-all w-full">
            <div className="flex flex-col gap-6 w-full px-4 py-6 max-w-xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-900">Checkout</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-2">
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="card-details" className="block text-sm font-medium text-gray-700">Card Details</label>
                  <div className="mt-2">
                    <input
                      id="card-details"
                      type="text"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm"
                      placeholder="Enter your card details"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    };

    export default Checkout;
  `;
};


export default Checkout
