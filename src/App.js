import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Editor from './pages/Home';
import Room from './pages/Room';

function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Room />}></Route>
                    <Route
                        path="/editor/:roomId"
                        element={<Editor />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
