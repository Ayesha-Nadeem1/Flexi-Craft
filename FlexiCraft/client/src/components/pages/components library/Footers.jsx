import React, { useState, useRef, useEffect } from 'react';
import WithLayout_User from '../../shared/Layout';

const Footers = () => {
  const footers = [
    { name: 'Footer 1', folder: 'footer-1' },
    { name: 'Footer 2', folder: 'footer-2' },
    { name: 'Footer 3', folder: 'footer-3' },
    { name: 'Footer 4', folder: 'footer-4' },
  ];

  const [selectedFooter, setSelectedFooter] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    adjustIframeHeight();
  }, [selectedFooter]);

  const renderFooterSection = (footer) => {
    return (
      <div className="footer-preview" style={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <iframe
          ref={iframeRef}
          src={`/footers/${footer.folder}/index.html`}
          title={footer.name}
          className="w-full border-none"
          onLoad={adjustIframeHeight}
          style={{ height: '100%', minHeight: '400px' }} // Adjust minHeight as needed
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
      <h1 className="text-2xl font-bold mb-4 text-center">Footers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {footers.map((footer, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedFooter(footer)}
          >
            <h2 className="text-xl font-semibold">{footer.name}</h2>
          </div>
        ))}
      </div>
      {selectedFooter && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{selectedFooter.name}</h2>
          {renderFooterSection(selectedFooter)}
        </div>
      )}
    </div>
  );
};

export default WithLayout_User(Footers);
