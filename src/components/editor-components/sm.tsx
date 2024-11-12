
import { Badge } from '../ui/badge'
import { EditorElement, useEditor } from '../../pages/editor-provider'
import clsx from 'clsx';
import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

type SocialMediaPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';

type SocialMediaButtonProps = {
  platform: SocialMediaPlatform;
  url: string;
  onChange: (url: string) => void;
  onDelete: () => void;
  liveMode: boolean;
};

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({ platform, url, onChange, onDelete, liveMode }) => {
  const icons: Record<SocialMediaPlatform, JSX.Element> = {
    twitter: <FaTwitter size={24} />,
    facebook: <FaFacebookF size={24} />,
    instagram: <FaInstagram size={24} />,
    linkedin: <FaLinkedinIn size={24} />,
  };

  const ensureAbsoluteUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <div className="relative flex items-center gap-2 mb-2">
      <a
        href={ensureAbsoluteUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors duration-300"
      >
        {icons[platform]}
        <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
      </a>
      {!liveMode && (
        <input
          type="text"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          className="ml-4 bg-transparent border-none outline-none flex-grow"
        />
      )}
      {!liveMode && (
        <div
          className="absolute top-1 right-1 bg-red-500 px-2 py-1 text-xs font-bold rounded-full text-white cursor-pointer transition-transform transform hover:scale-110"
          onClick={onDelete}
        >
          <Trash size={16} />
        </div>
      )}
    </div>
  );
};

const SocialMediaIntegration: React.FC<{ element: EditorElement }> = ({ element }) => {
  const { dispatch, state } = useEditor();
  const [socialMedia, setSocialMedia] = useState<{ platform: SocialMediaPlatform; url: string }[]>([
    { platform: 'twitter', url: '' },
    { platform: 'facebook', url: '' },
    { platform: 'instagram', url: '' },
    { platform: 'linkedin', url: '' },
  ]);

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    });
  };

  const handleChangeUrl = (index: number, url: string) => {
    setSocialMedia((prev) => {
      const updated = [...prev];
      updated[index].url = url;
      return updated;
    });
  };

  const handleDeleteButton = (index: number) => {
    setSocialMedia((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section
      style={element.styles}
      className={clsx(
        'relative p-4 rounded-lg shadow-lg',
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
          <Badge className="absolute top-2 left-2 rounded-lg bg-blue-500 text-white">
            {state.editor.selectedElement.name}
          </Badge>
          <div
            className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded-lg text-white cursor-pointer transition-transform transform hover:scale-110"
            onClick={handleDeleteContainer}
          >
            <Trash size={16} />
          </div>
        </>
      )}

      <div className="mt-4">
        {socialMedia.map((item, index) => (
          <SocialMediaButton
            key={index}
            platform={item.platform}
            url={item.url}
            onChange={(url) => handleChangeUrl(index, url)}
            onDelete={() => handleDeleteButton(index)}
            liveMode={state.editor.liveMode}
          />
        ))}
      </div>
    </section>
  );
};

export const exportTosmCode = (element: EditorElement) => {

  return `
    <section
      style={{ ...element.styles }}
      className={clsx('relative p-4 rounded-lg shadow-lg')}
    >
      <div className="mt-4">
        {socialMedia.map((item, index) => (
          <SocialMediaButton
            key={index}
            platform={item.platform}
            url={item.url}
            onChange={(url) => handleChangeUrl(index, url)}
            onDelete={() => handleDeleteButton(index)}
            liveMode={state.editor.liveMode}
          />
        ))}
      </div>
    </section>
  `;
};


export default SocialMediaIntegration;
