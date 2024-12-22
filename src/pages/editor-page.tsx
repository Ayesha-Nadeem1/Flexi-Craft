import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSocket } from '../SocketContext'; 
import ClientSidebar from './client-sidebar';
import EditorProvider from './editor-provider';
import { EditorElement } from './editor-provider';
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

const EditorPage: React.FC<{ element: EditorElement }> = ({ element }) => {
    const ACTIONS = {
        JOIN: 'join',
        JOINED: 'joined',
        DISCONNECTED: 'disconnected',
    };

    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};
    const { roomId } = useParams(); // roomId can be undefined
    const [clients, setClients] = useState<Client[]>([]);
    const socket = useSocket(); // Use socket from context

    useEffect(() => {
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

        // Emit JOIN event
        if (roomId) {
            socket.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });
        } else {
            toast.error('Room ID is missing.');
            navigate('/');
        }

        // Handle JOINED event
        socket.on(
            ACTIONS.JOINED,
            ({ clients, username }: JoinedEventPayload) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room.`);
                }
                setClients(clients);
            }                                

        );

        /*socket.on(
            ACTIONS.DISCONNECTED,
            ({ socketId, username }: {socketId:any, username:any}) => {
                toast.success(`${username} left the room.`);
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                });
            }
        );*/

        socket.on(ACTIONS.DISCONNECTED, ({ socketId, username, clients }: {socketId: string, username: string, clients: Client[]}) => {
            toast.success(`${username} left the room.`);

            // Update the clients state with the new list of clients
            setClients(clients); // Use the clients list received from the server
        });

        return () => {
            //socket.disconnect();
            socket.off(ACTIONS.JOINED);
            socket.off(ACTIONS.DISCONNECTED);
        };
    }, [roomId, socket]);

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
        setClients((prev) => prev.filter((client) => client.socketId !== socket.id));
    
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
                    <ClientSidebar
                        clients={clients}
                        copyRoomId={copyRoomId}
                        leaveRoom={leaveRoom}
                    />
                    {roomId && (
                        <EditorContent
                            liveMode={false}
                            roomId={roomId}
                            element={element}
                        />
                    )}
                </div>
                <EditorSidebar />
            </EditorProvider>
        </div>
    );
};

export default EditorPage;
