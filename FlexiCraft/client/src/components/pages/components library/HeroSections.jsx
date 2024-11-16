import React, { useState,useRef } from 'react';
import WithLayout_User from '../../shared/Layout';


const HeroSections = () => {
  const heroSections = [
    { name: 'Hero 1', folder: 'Hero1' },
    { name: 'Hero 2', folder: 'Hero2' },
    { name: 'Hero 3', folder: 'Hero3' },
    { name: 'Hero 4', folder: 'Hero4' },
    { name: 'Hero 5', folder: 'Hero5' },
    { name: 'Hero 6', folder: 'Hero6' },
  ];

  const [selectedHero, setSelectedHero] = useState(null);
  const iframeRef = useRef(null);

  const renderHeroSection = (hero) => {
    return (
      <div className="hero-preview" style={{ width: '100%', overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          src={`/hero-sections/${hero.folder}/index.html`}
          title={hero.name}
          className="w-full border-none"
          onLoad={adjustIframeHeight}
          style={{ height: '100%' }}
        />
      </div>
    );
  };

  const adjustIframeHeight = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
  };

  return (
    <div className='mt-[90px] ml-[200px] text-neutral-900'>
      <h1 className="text-2xl font-bold mb-4 text-center">Hero Sections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroSections.map((hero, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedHero(hero)}
          >
            <h2 className="text-xl font-semibold">{hero.name}</h2>
          </div>
        ))}
      </div>
      {selectedHero && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{selectedHero.name}</h2>
          {renderHeroSection(selectedHero)}
        </div>
      )}
    </div>
  );
};

export default WithLayout_User(HeroSections);
