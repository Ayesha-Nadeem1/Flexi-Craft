import React from 'react';
import WithLayout from '../../WithLayout';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">SiteCrafter Documentation</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Journey</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>User signs up for SiteCrafter</li>
            <li>Inputs text description of bakery</li>
            <li>AI generates tailored website template</li>
            <li>User customizes the template</li>
            <li>Utilizes SEO tools to optimize content</li>
            <li>Collaborates with business partner</li>
            <li>Exports code and integrates with existing system (Netlify)</li>
            <li>Accesses analytics tools</li>
            <li>Improves marketing strategies</li>
            <li>Outcome: Successful website launch and maintenance without a developer</li>
            <li>Creates documentation</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold  mb-4">Details</h2>
          <ul className="list-disc pl-6 space-y-2 ">
            <li><strong>Add photos:</strong> Users can add images to their template.</li>
            <li><strong>Adjust color scheme:</strong> Customize the look and feel of the website.</li>
            <li><strong>Real-time collaboration:</strong> Work together with team members on the same project.</li>
            <li><strong>Version control:</strong> Track changes and manage different versions of the project.</li>
            <li><strong>Track website performance:</strong> Monitor metrics to gauge website success.</li>
            <li><strong>Gain customer insights:</strong> Analyze data to improve user engagement and strategies.</li>
            <li><strong>Outputs LaTeX code:</strong> Generate LaTeX code for documentation.</li>
            <li><strong>Compiles PDF documentation:</strong> Create a compiled PDF version of the documentation.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default WithLayout(DocumentationPage);
