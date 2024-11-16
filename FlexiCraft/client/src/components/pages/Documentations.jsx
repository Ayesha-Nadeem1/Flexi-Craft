import React, { useState } from 'react';
import WithLayout_User from '../shared/Layout'

const Documentations = () => {
  const [sections, setSections] = useState(['Introduction']);
  const [sectionInput, setSectionInput] = useState('');

  const addSection = () => {
    if (sectionInput.trim()) {
      setSections([...sections, sectionInput.trim()]);
      setSectionInput('');
    }
  };

  const generateDocumentation = () => {
    //api call
    console.log('Generating documentation for sections:', sections);
  };

  return (
    <div className=" max-w-4xl mx-auto p-6 mt-[50px] text-neutral-900">
      <h1 className="text-4xl font-bold mb-6 text-center">Generate Project Documentation</h1>
      <p className="text-gray-700 mb-6 text-center">
        Enter the sections you want to include in your LaTeX documentation, and our AI will generate it for you.
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Add a new section..."
          value={sectionInput}
          onChange={(e) => setSectionInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2 bg-neutral-200"
        />
        <button
          onClick={addSection}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Section
        </button>
      </div>

      <ul className="mb-6">
        {sections.map((section, index) => (
          <li
            key={index}
            className="p-2 mb-2 bg-gray-100 border border-gray-300 rounded"
          >
            {section}
          </li>
        ))}
      </ul>
      <div className='flex justify-center'>
        <button
          onClick={generateDocumentation}
          className="bg-green-600 text-white px-6 py-3 rounded font-semibold"
        >
          Generate Documentation
        </button>
      </div>
      
    </div>
  );
};

export default WithLayout_User(Documentations)