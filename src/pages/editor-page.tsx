import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSocket } from '../SocketContext'; 
import ClientSidebar from './client-sidebar';
import EditorProvider from './editor-provider';
import { EditorElement,useEditor } from './editor-provider';
import EditorNavigation from './editor-navigation';
import EditorContent from './editor-content';
import EditorSidebar from './editor-sidebar';
import { sample } from 'cypress/types/lodash';


interface Client {
    socketId: string;
    username: string;
}

interface JoinedEventPayload {
    clients: Client[];
    username: string;
    socketId: string;
}

interface DisconnectedEventPayload {
    socketId: string;
    username: string;
    clients: Client[];

}

//steps after ai model integration: 
//get the text prompt from the promptpage
//use that to call the ai model api here
//render the response code
//download the response code after it loads properly
//for now we're using the sample model output code for rendering

//P.S only render the sample output when user chooses to enter text prompt 
//otherwise just navigate user to the room for manual template creation


const EditorPage: React.FC<{ element: EditorElement}> = ({ element }) => {
    const ACTIONS = {
        JOIN: 'join',
        JOINED: 'joined',
        DISCONNECTED: 'disconnected',
        //SYNC_STATE_REQUEST: 'syncStateRequest',
        //SYNC_STATE_RESPONSE: 'syncStateResponse',
    };

const [sampleoutput, setSampleoutput] = useState(`<!DOCTYPE html>
    <html>
    <head>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100 font-sans leading-normal tracking-normal">
      <div class="flex flex-col min-h-screen">
        <div class="relative flex flex-col-reverse py-12 lg:py-24">
          <div class="container mx-auto px-4">
            <div class="flex flex-col items-center text-center lg:flex-row lg:text-left">
              <div class="flex-1">
                <h1 class="text-4xl font-bold leading-none mb-10 text-gray-900 lg:text-5xl">Fashion Brand</h1>
              </div>
              <div class="flex-1 lg:flex-grow-0 lg:pl-20">
                <p class="text-lg text-gray-600 leading-relaxed mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container mx-auto px-4">
          <nav class="flex items-center justify-between flex-wrap p-6">
            <div class="block lg:hidden">
              <button class="flex items-center px-3 py-2 border rounded hover:text-gray-100 hover:border-gray-400">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
              </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div class="text-sm lg:flex-grow">
                <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">Home</a>
                <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">About</a>
                <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">Contact</a>
              </div>
              <div>
                <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-100 border-gray-400 hover:border-gray-500 hover:text-gray-900 hover:bg-gray-100 mt-4 lg:mt-0">Shop Now</a>
              </div>
            </div>
          </nav>
        </div>
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="w-full lg:w-1/3">
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full h-64" src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sunset in the mountains">
                <div class="px-6 py-4">
                  <h2 class="text-2xl font-bold text-gray-900">Collection A</h2>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3">
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full h-64" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Rainforest">
                <div class="px-6 py-4">
                  <h2 class="text-2xl font-bold text-gray-900">Collection B</h2>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3">
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full h-64" src="https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="River">
                <div class="px-6 py-4">
                  <h2 class="text-2xl font-bold text-gray-900">Collection C</h2>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container mx-auto px-4 pb-12 lg:pb-24">
          <footer class="flex flex-wrap items-center justify-between border-t border-gray-200 pt-6">
            <div class="w-full lg:w-1/2">
              <p class="text-gray-600">Copyright © 2021 Fashion Brand. All Rights Reserved.</p>
            </div>
            <div class="w-full lg:w-1/2 text-right">
              <a href="#" class="text-gray-600 hover:text-gray-900 mr-4">Privacy Policy</a>
              <a href="#" class="text-gray-600 hover:text-gray-900 mr-4">Terms of Service</a>
            </div>
          </footer>
        </div>
      </div>
    </body>
    </html>`);

    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};
    const { roomId } = useParams(); // roomId can be undefined
    const [clients, setClients] = useState<Client[]>([]);
    const socket = useSocket(); // Use socket from context
    const { state, dispatch } = useEditor()
    const [livemode, setLiveMode] = useState(false); // Track liveMode in EditorPage


    const [images, setImages] = useState<string[]>([]);
    const editorRef = useRef<HTMLDivElement | null>(null);

    
    useEffect(() => {
        // Parse the incoming modelResponse and extract image sources dynamically
        const parser = new DOMParser();
        const doc = parser.parseFromString(sampleoutput, "text/html");
        const imgElements = doc.querySelectorAll("img");

        // Extract src values
        const extractedSrcs = Array.from(imgElements).map((img) => img.src);
        setImages(extractedSrcs);
    }, [sampleoutput]); // Runs every time the response changes

    const handleImageUpdate = (index: number, newSrc: string) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = newSrc;
            return updatedImages;
        });

        // Also update the actual DOM elements inside .sample-output
        const imgElements = document.querySelectorAll(".sample-output img");
        if (imgElements[index]) {
            (imgElements[index] as HTMLImageElement).src = newSrc;
        }
    };


    const handleLiveModeChange = (newLiveMode: boolean) => {
        setLiveMode(newLiveMode); // Update liveMode state when it changes in EditorContent
    };



    useEffect(() => {
        const init = async () => {

        if (!socket) {
            console.error('Socket instance not available');
            return;
        }

        socket.on('connect_error', handleErrors);
        socket.on('connect_failed', handleErrors);

        function handleErrors(e: any) {
            console.log('Socket error:', e);
            toast.error('Socket connection failed, try again later.');
            navigate('/');
        }

        setTimeout(() => {
            const updatedElements = JSON.stringify(state.editor.elements);
            console.log("EP", updatedElements)
            
        // Emit JOIN event
        if (roomId) {
            socket.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
                updatedElements
            });

        } else {
            toast.error('Room ID is missing.');
            navigate('/');
        }

    }, 0);


        // Handle JOINED event
        socket.on(
            ACTIONS.JOINED,
            ({ clients, username }: JoinedEventPayload) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room.`);
                    socket.emit('getstatus', {roomId})

                }
                setClients(clients);
            }                                

        );


        socket.on(ACTIONS.DISCONNECTED, ({ socketId, username, clients }: {socketId: string, username: string, clients: Client[]}) => {
            toast.success(`${username} left the room.`);

            // Update the clients state with the new list of clients
            setClients(clients); // Use the clients list received from the server
        });

    };
    init();
        return () => {
            socket.disconnect();
            socket.off(ACTIONS.DISCONNECTED);
            socket.off(ACTIONS.JOINED);
            //socket.off(ACTIONS.SYNC_STATE_REQUEST);
            //socket.off(ACTIONS.SYNC_STATE_RESPONSE);
        };
    }, [roomId, socket, state.editor.elements]);

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId || '').then(() => {
            toast.success('Room ID copied to clipboard!');
        });
    };

    const leaveRoom = () => {
        if (!roomId) return;
    
        // Emit leave event to inform other clients (if necessary)
        socket.emit(ACTIONS.DISCONNECTED, {
            socketId: socket.id,
            username: location.state?.username,
            clients, // Send the list of current clients to update others
        });
    
        // Disconnect the socket and update the client list in state
        socket.disconnect();
    
        // Remove the current user from the client list
        //setClients(clients);
    
        // Show toast message
        toast.success('You left the room.');
    
        // Navigate back to the main page
        navigate('/');
    };


    //saving, css , rt

    const [content, setContent] = useState<string>(() => {
        return localStorage.getItem("editormContent") || "<p>Sample Output Content</p>";
    });

    // Load styles from localStorage or use defaults
    const [styles, setStyles] = useState(() => {
        const storedStyles = localStorage.getItem("editormStyles");
        return storedStyles
            ? JSON.parse(storedStyles)
            : {
                  fontSize: "16px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  padding: "10px",
                  borderRadius: "5px",
              };
    });

    // Save content to localStorage on every change
    const handleContentChange = (event: any) => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            setContent(newContent);
            localStorage.setItem("editormContent", newContent);
        }
    };

    // Save styles to localStorage on change
    const handleStyleChange = (key: string, value: string) => {
        const updatedStyles = { ...styles, [key]: value };
        setStyles(updatedStyles);
        localStorage.setItem("editormStyles", JSON.stringify(updatedStyles));
    };

    // Load content into the div when the component mounts
    useEffect(() => {
            if (editorRef.current) {
    editorRef.current.innerHTML = content;
    }
    }, []);

    const exportOutputState = () => {
        if (!editorRef.current) return;
    
        // Capture inner HTML of output rendering div
        const htmlContent = editorRef.current.innerHTML;
    
        // Create an object to store content & styles
        const outputData = {
            content: htmlContent,
            styles: styles, // Current styles state
        };
    
        // Convert to JSON and download as a file
        const blob = new Blob([JSON.stringify(outputData, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "output_state.json";
        a.click();
    };

    const importOutputState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target?.result) return;
    
            try {
                // Parse JSON and restore content & styles
                const outputData = JSON.parse(e.target.result as string);
                setSampleoutput(outputData.content);
                setStyles(outputData.styles);
            } catch (error) {
                toast.error("Invalid file format!");
            }
        };
        reader.readAsText(file);
    };
    
    



    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
            <EditorProvider>
                <EditorNavigation />
                <div className="h-full flex justify-center">
                {!livemode && (
                        <ClientSidebar
                            clients={clients}
                            copyRoomId={copyRoomId}
                            leaveRoom={leaveRoom}

                        />
                    )}


                    <div className="mt-4">
                        <h3>Edit Image URLs:</h3>
                        {images.map((src, index) => (
                            <div key={index} className="mb-2">
                                <input
                                    type="text"
                                    value={src}
                                    onChange={(e) => handleImageUpdate(index, e.target.value)}
                                    className="border p-1 w-full"
                                />
                            </div>
                        ))}

<h3 className="font-bold mb-2">Edit Styles:</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Font Size</label>
                        <input
                            type="text"
                            value={styles.fontSize}
                            onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                            className="border p-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Background Color</label>
                        <input
                            type="color"
                            value={styles.backgroundColor}
                            onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                            className="border p-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Text Color</label>
                        <input
                            type="color"
                            value={styles.color}
                            onChange={(e) => handleStyleChange("color", e.target.value)}
                            className="border p-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Padding</label>
                        <input
                            type="text"
                            value={styles.padding}
                            onChange={(e) => handleStyleChange("padding", e.target.value)}
                            className="border p-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Border Radius</label>
                        <input
                            type="text"
                            value={styles.borderRadius}
                            onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                            className="border p-1 w-full"
                        />
                    </div>

                    
                        <div>
                    <button onClick={exportOutputState}>Export Output</button>
                    <input type="file" accept="application/json" onChange={importOutputState} />
                        </div>

                </div>


                    </div>


                    <div 
                        className="sample-output border p-4 bg-white overflow-auto" 
                        style={{
                            maxHeight: "90vh",
                            fontSize: styles.fontSize,
                            backgroundColor: styles.backgroundColor,
                            color: styles.color,
                            padding: styles.padding,
                            borderRadius: styles.borderRadius,
                        }}
                        contentEditable
                        ref={editorRef}
                        dangerouslySetInnerHTML={{ __html: sampleoutput }}
                        onInput={handleContentChange}

                    >
                    </div>

                    {roomId && (
                        <EditorContent
                            liveMode={false}
                            roomId={roomId}
                            element={element}
                            onLiveModeChange={handleLiveModeChange}

                        />
                    )}
                </div>
                <EditorSidebar />
            </EditorProvider>
        </div>
    );
};

export default EditorPage;
