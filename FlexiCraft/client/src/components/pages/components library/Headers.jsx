// HeaderSection.jsx
import React, { useEffect } from 'react';
import { headers } from '../../../constants';
import WithLayout_User from '../../shared/Layout';

const Headers = () => {
  useEffect(() => {
    // Inject the CSS styles and JS scripts into the document head
    headers.forEach((header) => {
      // Inject CSS
      const styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.appendChild(document.createTextNode(header.css));
      document.head.appendChild(styleElement);

      // Inject JS
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.appendChild(document.createTextNode(header.js));
      document.body.appendChild(scriptElement);
    });
  }, []);

  return (
    <div className="mb-8 mt-[90px] ml-[200px] text-neutral-900">
      <h2 className="text-2xl font-bold mb-4 text-center">Headers</h2>
      <div className="flex flex-col gap-4 px-[20px]">
        {headers.map((header) => (
          <div key={header.id} className="border p-4 rounded shadow width-[200px]">
            <h3 className="text-xl font-semibold mb-2">Header {header.id}</h3>
            <div dangerouslySetInnerHTML={{ __html: header.html }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithLayout_User(Headers);
