'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import {Props} from './types'
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';


// Type guard to check if content is an object
const isContentObject = (content: any): content is { [key: string]: any } => {
  return typeof content === 'object' && !Array.isArray(content);
};

const SignUpComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const socket = useSocket();
  const { roomId } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [textColor, setTextColor] = useState<string>(props.element.styles.color || '#000000');

  const handleDeleteElement = useCallback(() => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });

    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
  
      socket.emit('componentDeleted', {
        roomId,
        updatedElements,
        deletedElement: props.element,  
      });
    }, 0);
      

  }, [dispatch, props.element]);

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });
    socket.emit('elementClicked', {
      roomId,
      selectedElement: props.element,
    });
  };

  const handleUpdateContent = useCallback(
    (field: 'email' | 'password' | 'confirmPassword' | 'name', e: React.FormEvent<HTMLInputElement>) => {
      const updatedContent = (e.target as HTMLElement).innerText;
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...props.element,
            [field]: updatedContent,  // Update email, password, confirmPassword, or name
          },
        },
      });
    },
    [dispatch, props.element]
  );

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
  };

  const styles = { ...props.element.styles, color: textColor };

  return (
    <div
      className={clsx(
        'p-4 w-full flex flex-col items-center text-gray-800 relative',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
      // You can implement drag handlers if needed, like 'onDragStart', 'onDragOver', etc.
    >
      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      <form onSubmit={(e) => e.preventDefault()} className="w-full bg-white p-6 rounded shadow-lg">
        <h3 className="text-gray-800 text-3xl font-extrabold mb-12">Sign Up</h3>
        <div className="space-y-6">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
            <input
              name="name"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email</label>
            <input
              name="email"
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-12">
          <button
            type="submit"
            className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Sign Up
          </button>
        </div>
        <p className="text-sm text-gray-800 mt-6">
          Already have an account?{' '}
          <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
            Sign in here
          </a>
        </p>
      </form>

      {!state.editor.liveMode && (
        <div className="absolute bottom-4 right-4">
          <input
            type="color"
            value={textColor}
            onChange={handleColorChange}
            title="Change Text Color"
          />
        </div>
      )}

      {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
        <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white">
          <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
        </div>
      )}
    </div>
  );
};


export const exportTosuCode = (element: EditorElement) => {
  const { email, password, confirmPassword, name, styles } = element;
  
  return `
    const SignUpComponent = () => {
      const [email, setEmail] = useState('${email || ''}');
      const [password, setPassword] = useState('${password || ''}');
      const [confirmPassword, setConfirmPassword] = useState('${confirmPassword || ''}');
      const [name, setName] = useState('${name || ''}');
      const [textColor, setTextColor] = useState('${styles?.color || '#000000'}');
  
      const styles = { ...element.styles, color: textColor };

      return (

          <form onSubmit={(e) => e.preventDefault()} className="w-full bg-white p-6 rounded shadow-lg">
            <h3 className="text-gray-800 text-3xl font-extrabold mb-12">Sign Up</h3>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
                <input
                  name="name"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
            <p className="text-sm text-gray-800 mt-6">
              Already have an account?{' '}
              <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
                Sign in here
              </a>
            </p>
          </form>
        </div>
      );
    };

    export default SignUpComponent;
  `;
};


export default React.memo(SignUpComponent);
