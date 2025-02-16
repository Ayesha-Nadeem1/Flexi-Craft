'use client'

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Loading from './loading'; // Import the loading component
import { EditorElement } from './editor-provider'


// Dynamically import EditorPage
const EditorPage = lazy(() => import('./editor-page'));

const Page: React.FC<{ element: EditorElement }> = ({ element }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a timeout to show the content after 5 seconds
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      {showContent ? (
        <Suspense fallback={<Loading />}>
          <EditorPage element={element} />
        </Suspense>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Page;
