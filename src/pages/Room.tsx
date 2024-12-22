import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaSuperpowers } from 'react-icons/fa';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const createNewRoom = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username are required');
            return;
        }

        // Redirect to Editor page
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <FaSuperpowers className="mx-auto text-blue-500" size={64} />
                <h1 className="text-3xl font-semibold text-center text-gray-800 mt-4">Collab</h1>
                <h4 className="text-lg text-center text-gray-600 mt-2">Paste invitation ROOM ID</h4>
                <div className="mt-6 space-y-4">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={joinRoom}
                    >
                        Join
                    </button>
                    <span className="block text-center text-gray-600">
                        If you don't have an invite, create &nbsp;
                        <a
                            onClick={createNewRoom}
                            href="#"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            new room
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Home;
