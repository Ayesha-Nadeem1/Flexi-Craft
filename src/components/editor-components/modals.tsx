import { Badge } from '../ui/badge';
import { EditorElement, useEditor } from '../../pages/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Props } from './types'; 
import { useSocket } from '../../SocketContext';
import { useParams } from 'react-router-dom';


type ImageCarousel = {
  imageUrl: string;
  linkUrl?: string;
};

const CarouselAndSliders: React.FC<Props> = ({ element }) => {
  const { dispatch, state } = useEditor();
  const socket = useSocket();
  const { roomId } = useParams();
  const [imageCarousels, setImageCarousels] = useState<ImageCarousel[]>(element.imageCarousels || [
    { imageUrl: '/images/image1.jpg' },
    { imageUrl: '/images/image2.jpg' },
    { imageUrl: '/images/image3.jpg' },
  ]);
  const [carouselTitle, setCarouselTitle] = useState<string>(element.title || 'Image Carousel');
  const [titleColor, setTitleColor] = useState<string>(element.titleColor || '#000000');
  
  useEffect(() => {
    // Update the element with the new properties when they change
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...element,  // Spread existing element properties
          imageCarousels,  // Update the imageCarousels
          title: carouselTitle,  // Update the title
          titleColor,  // Update the titleColor
        },
      },
    });
  }, [imageCarousels, carouselTitle, titleColor, dispatch, element]);
  
  const handleDeleteImage = (index: number) => {
    setImageCarousels((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDeleteContainer = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    });

    setTimeout(() => {
      const updatedElements = JSON.stringify(state.editor.elements);
      
      socket.emit('componentDeleted', {
      roomId,
      updatedElements,
      });
      }, 0);
      
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: element },
    });
  };

  const handleImageUrlChange = (index: number, url: string) => {
    setImageCarousels((prevImages) =>
      prevImages.map((img, i) => (i === index ? { ...img, imageUrl: url } : img))
    );
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarouselTitle(e.target.value);
  };

  const handleTitleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleColor(e.target.value);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section
      style={{ ...element.styles }}
      className={clsx(
        'relative p-4',
        {
          '!border-blue-500': state.editor.selectedElement.id === element.id,
          '!border-solid': state.editor.selectedElement.id === element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {/* Container Badge and Delete Button */}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <>
          <Badge className="absolute top-2 left-2 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
          <div
            className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded-none rounded-t-lg text-white cursor-pointer"
            onClick={handleDeleteContainer}
          >
            <Trash size={16} />
          </div>
        </>
      )}

      {/* Image URL Inputs (only in edit mode) */}
      {!state.editor.liveMode && (
        <div className="mt-8 space-y-4">
          {imageCarousels.map((carouselItem, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={carouselItem.imageUrl}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                className="bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer"
                onClick={() => handleDeleteImage(index)}
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Title and Text Color Picker */}
      <div className="mt-8">
        {state.editor.selectedElement.id === element.id && !state.editor.liveMode ? (
          <>
            <input
              type="text"
              value={carouselTitle}
              onChange={handleTitleChange}
              className="text-2xl font-bold mb-4 w-full border-b-2 focus:outline-none"
            />
          </>
        ) : (
          <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
            {carouselTitle}
          </h2>
        )}
      </div>

      {/* Image Carousel */}
      <Slider {...carouselSettings} className="mt-8">
        {imageCarousels.map((carouselItem, index) => (
          <div key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={carouselItem.imageUrl} alt={`Carousel image ${index + 1}`} className="w-full h-auto" />
            {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
              <button
                className="absolute top-2 right-2 bg-red-500 px-2.5 py-1 text-xs font-bold rounded text-white cursor-pointer"
                onClick={() => handleDeleteImage(index)}
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CarouselAndSliders;