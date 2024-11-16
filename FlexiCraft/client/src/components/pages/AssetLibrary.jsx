import React, { useState } from 'react';
import WithLayout_User from '../shared/Layout';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`;

const AssetLibrary = () => {
  const [folders, setFolders] = useState([]);
  const [assets, setAssets] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewAsset, setPreviewAsset] = useState(null);

  const addFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { name: newFolderName, assets: [] }]);
      setNewFolderName('');
    }
  };

  const uploadAsset = () => {
    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileUrl = URL.createObjectURL(selectedFile);
      const newAsset = { name: fileName, url: fileUrl, type: selectedFile.type };

      if (selectedFolder === 'all') {
        setAssets([...assets, newAsset]);
      } else {
        setFolders(folders.map(folder => {
          if (folder.name === selectedFolder) {
            return { ...folder, assets: [...folder.assets, newAsset] };
          }
          return folder;
        }));
      }
      setSelectedFile(null);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAssetClick = (asset) => {
    setPreviewAsset(asset);
  };

  const closePreview = () => {
    setPreviewAsset(null);
  };

  const allAssets = [
    ...assets,
    ...folders.flatMap(folder => folder.assets)
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-[100px] ml-[200px] text-neutral-900">
      <h1 className="text-4xl font-bold mb-6 text-center">Asset Library</h1>

      {/* Folder Creation */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="New folder name..."
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2 bg-neutral-200"
        />
        <button
          onClick={addFolder}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Folder
        </button>
      </div>

      {/* Asset Upload */}
      <div className="mb-6">
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2 bg-neutral-200"
        >
          <option value="all">Upload to All Assets</option>
          {folders.map((folder, index) => (
            <option key={index} value={folder.name}>
              Upload to {folder.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded mb-2 bg-neutral-200"
        />
        <button
          onClick={uploadAsset}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload Asset
        </button>
      </div>

      {/* Display All Assets */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">All Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allAssets.map((asset, index) => (
            <div
              key={index}
              onClick={() => handleAssetClick(asset)}
              className="p-4 bg-white border border-gray-300 rounded shadow cursor-pointer"
            >
              {asset.type.startsWith('image/') ? (
                <img src={asset.url} alt={asset.name} className="w-full h-40 object-cover" />
              ) : asset.type === 'application/pdf' ? (
                <p>PDF Document: {asset.name}</p>
              ) : (
                <p>{asset.name}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Display Folders and Their Assets */}
      <section className="mb-12">
        {folders.map((folder, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{folder.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {folder.assets.length > 0 ? (
                folder.assets.map((asset, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleAssetClick(asset)}
                    className="p-4 bg-white border border-gray-300 rounded shadow cursor-pointer"
                  >
                    {asset.type.startsWith('image/') ? (
                      <img src={asset.url} alt={asset.name} className="w-full h-40 object-cover" />
                    ) : asset.type === 'application/pdf' ? (
                      <p>PDF Document: {asset.name}</p>
                    ) : (
                      <p>{asset.name}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No assets in this folder.</p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Asset Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full">
            <button onClick={closePreview} className="text-red-500 float-right">Close</button>
            {previewAsset.type.startsWith('image/') ? (
              <img src={previewAsset.url} alt={previewAsset.name} className="w-full h-auto" />
            ) : previewAsset.type === 'application/pdf' ? (
              <Document file={previewAsset.url}>
                <Page pageNumber={1} />
              </Document>
            ) : (
              <p>{previewAsset.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithLayout_User(AssetLibrary);
