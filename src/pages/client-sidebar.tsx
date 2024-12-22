import React from 'react';
import { FaCode, FaSuperpowers } from 'react-icons/fa';
import Client from '../Client'

interface Client {
    socketId: string;
    username: string;
}

interface ClientSidebarProps {
    clients: Client[];
    copyRoomId: () => void;
    leaveRoom: () => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({
    clients,
    copyRoomId,
    leaveRoom,
}) => {
    return (
        <div className="flex flex-col h-full min-h-screen bg-gray-300 border text-white p-4">
        {/* Logo and Title */}
        <div className="mb-4">
            <FaSuperpowers className="text-blue-400 text-4xl mb-2" />
            <h4 className="text-lg font-semibold">Collaborators</h4>
        </div>
    
        {/* Connected Clients */}
        <div className="flex-grow">
            <h3 className="text-md font-semibold mb-2">Connected Clients</h3>
            <div className="space-y-2">
                {Array.isArray(clients) && clients.length > 0 ? (
                    clients.map((client) => (
                        <Client key={client.socketId} username={client.username} />
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No connected clients.</p>
                )}
            </div>

            <div className="mt-4 space-y-2">
            <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
                onClick={copyRoomId}
            >
                Copy ROOM ID
            </button>
            <button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md"
                onClick={leaveRoom}
            >
                Leave
            </button>
        </div>
        </div>
    
       

    </div>
    
    );
};

export default ClientSidebar;
