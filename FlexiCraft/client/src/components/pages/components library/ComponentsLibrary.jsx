import React from 'react';
import Headers from './Headers';
import WithLayout_User from '../../shared/Layout';

import { Link } from 'react-router-dom';

const ComponentsLibrary = () => {
  const components = [
    { name: 'Headers', path: '/headers' },
    { name: 'Hero Sections', path: '/herosections' },
    { name: 'Footers', path: '/footers' },
    
  ];

  return (
    <div className="mt-[100px] ml-[200px] text-neutral-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Components Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {components.map((component) => (
          <Link to={component.path} key={component.name}>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold">{component.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WithLayout_User(ComponentsLibrary);
