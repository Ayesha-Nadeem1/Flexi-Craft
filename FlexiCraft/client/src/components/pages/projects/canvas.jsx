import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WithLayout_User from "../../shared/Layout";
import { headers } from "../../../constants/index";
import axios from "axios";
import { useParams } from "react-router-dom";

const DropZone = ({ components }) => {
  return (
    <div className="flex-1 p-4 m-2 bg-gray-100 rounded border-dashed border-2 border-gray-300">
      <h2 className="text-xl font-bold mb-4">Drop Zone</h2>

      {/* Header */}
      {components.header && (
        <div className="p-4 bg-white border border-gray-300 rounded mb-2">
          <style>{components.header.css}</style>
          <div dangerouslySetInnerHTML={{ __html: components.header.html }} />
        </div>
      )}

      {/* Hero Section */}
      {components.hero && (
        <div
          className="p-4 bg-white border border-gray-300 rounded mb-2"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <iframe
            src={`/hero-sections/${components.hero.folder}/index.html`}
            className="w-full h-full border-none"
            title={components.hero.name}
          />
        </div>
      )}

      {/* Footer */}
      {components.footer && (
        <div
          className="p-4 bg-white border border-gray-300 rounded mb-2"
          style={{ height: "400px" }}
        >
          <iframe
            src={`/footers/${components.footer.folder}/index.html`}
            className="w-full border-none"
            style={{ height: "100%", minHeight: "200px" }}
            title={components.footer.name}
          />
        </div>
      )}
    </div>
  );
};

const DragDropEditor = () => {
  const { id } = useParams(); // Assume the project ID is passed as a URL parameter
  const [components, setComponents] = useState({
    header: null,
    hero: null,
    footer: null,
  });

  useEffect(() => {
    const fetchProjectComponents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/${id}`
        );
        if (response.data.project.uiComponents) {
          setComponents(response.data.project.uiComponents);
        }
      } catch (error) {
        console.error("Error fetching project components:", error);
      }
    };

    fetchProjectComponents();
  }, [id]);

  const availableCategories = [
    { name: "Headers", items: headers, type: "header" },
    {
      name: "Hero Sections",
      items: [
        { name: "Hero 1", folder: "Hero1" },
        { name: "Hero 2", folder: "Hero2" },
        { name: "Hero 3", folder: "Hero3" },
        { name: "Hero 4", folder: "Hero4" },
        { name: "Hero 5", folder: "Hero5" },
        { name: "Hero 6", folder: "Hero6" },
      ],
      type: "hero",
    },
    {
      name: "Footers",
      items: [
        { name: "Footer 1", folder: "footer-1" },
        { name: "Footer 2", folder: "footer-2" },
        { name: "Footer 3", folder: "footer-3" },
        { name: "Footer 4", folder: "footer-4" },
      ],
      type: "footer",
    },
  ];

  const handleCheckboxChange = (event, component, type) => {
    if (event.target.checked) {
      setComponents((prevComponents) => ({
        ...prevComponents,
        [type]: component,
      }));
    } else {
      setComponents((prevComponents) => ({
        ...prevComponents,
        [type]: null,
      }));
    }
  };

  const handleSaveTemplate = async () => {
    const componentNames = {
      header: components.header ? components.header.name : null,
      hero: components.hero ? components.hero.name : null,
      footer: components.footer ? components.footer.name : null,
    };

    console.log("Saving components:", componentNames);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/projects/${id}/ui-components`,
        { uiComponents: componentNames }
      );
      console.log("Backend response:", response.data); // Log the entire response
      console.log("Updated project:", response.data.project); // Specifically log the project object
      console.log("UI Components:", response.data.project.uiComponents);
      console.log("Header:", response.data.project.uiComponents.header);
      console.log("Hero:", response.data.project.uiComponents.hero);
      console.log("Footer:", response.data.project.uiComponents.footer);

      alert("Template saved successfully!");
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen mt-[100px] ml-[200px] text-neutral-900">
        {/* Sidebar with Dropdowns */}
        <div className="w-1/5 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">Components</h2>
          {availableCategories.map((category) => (
            <div key={category.name} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <div>
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`${category.name}-${index}`}
                      name={category.type}
                      className="mr-2"
                      onChange={(e) =>
                        handleCheckboxChange(e, item, category.type)
                      }
                      checked={components[category.type]?.name === item.name}
                    />
                    <label
                      htmlFor={`${category.name}-${index}`}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div className="flex-1 p-4">
          <DropZone components={components} />
          <button
            onClick={handleSaveTemplate}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
          >
            Save Template
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default WithLayout_User(DragDropEditor);
