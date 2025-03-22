import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSocket } from '../SocketContext'; 
import ClientSidebar from './client-sidebar';
import EditorProvider from './editor-provider';
import { EditorElement,useEditor } from './editor-provider';
import EditorNavigation from './editor-navigation';
import EditorContent from './editor-content';
import EditorSidebar from './editor-sidebar';


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

const EditorPage: React.FC<{ element: EditorElement}> = ({ element }) => {
    const ACTIONS = {
        JOIN: 'join',
        JOINED: 'joined',
        DISCONNECTED: 'disconnected',
        //SYNC_STATE_REQUEST: 'syncStateRequest',
        //SYNC_STATE_RESPONSE: 'syncStateResponse',
    };




    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};
    const { roomId } = useParams(); // roomId can be undefined
    const [clients, setClients] = useState<Client[]>([]);
    const socket = useSocket(); // Use socket from context
    const { state, dispatch } = useEditor()
    const [livemode, setLiveMode] = useState(false); // Track liveMode in EditorPage
    //const { modeloutput = "" } = location.state || {}; // Default to empty if state is missing
    //const [code, setCode] = useState(modeloutput);


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
