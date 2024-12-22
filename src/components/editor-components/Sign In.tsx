'use client';

import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify
import {Props} from './types'
// Type guard to check if content is an object
const isContentObject = (content: any): content is { [key: string]: any } => {
  return typeof content === 'object' && !Array.isArray(content);
};

const SignInComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [textColor, setTextColor] = useState<string>(props.element.styles.color || '#000000');

  const handleDeleteElement = useCallback(() => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  }, [dispatch, props.element]);

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleUpdateContent = useCallback(
    (field: 'email' | 'password' | 'rememberMe', e: React.FormEvent<HTMLInputElement>) => {
      const updatedContent = (e.target as HTMLElement).innerText;
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {
          elementDetails: {
            ...props.element,
            [field]: updatedContent,  // Update email, password, or rememberMe
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
        <h3 className="text-gray-800 text-3xl font-extrabold mb-12">Sign In</h3>
        <div className="space-y-6">
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
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0 border-gray-300 rounded"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
              Remember me
            </label>
          </div>
        </div>

        <div className="mt-12">
          <button
            type="submit"
            className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Sign In
          </button>
        </div>
        <p className="text-sm text-gray-800 mt-6">
          Don't have an account?{' '}
          <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
            Register here
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

export const exportTosiCode = (element: EditorElement) => {
  const { email, password, styles } = element;

  const code = `
    const SignInComponent = () => {
      const [email, setEmail] = useState('${email || ''}');
      const [password, setPassword] = useState('${password || ''}');
      const [rememberMe, setRememberMe] = useState(false);

      const styles = { ...element.styles, color: textColor };

      return (
        <form onSubmit={(e) => e.preventDefault()} className="w-full bg-white p-6 rounded shadow-lg">
          <h3 className="text-gray-800 text-3xl font-extrabold mb-12">Sign In</h3>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
                value="${email}"
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
                value="${password}"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 border-gray-300 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign In
            </button>
          </div>
          <p className="text-sm text-gray-800 mt-6">
            Don't have an account?{' '}
            <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
              Register here
            </a>
          </p>
        </form>
      );
    };
  `;
  return code;
};

export default React.memo(SignInComponent);
