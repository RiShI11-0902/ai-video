import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [textInput, setTextInput] = useState('');
    const [message, setMessage] = useState('');
    const [generatedVideo, setGeneratedVideo] = useState('');

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleGenerateVideo = async () => {
        if (!textInput) {
            setMessage('Please enter some text');
            return;
        }

        try {
            setMessage('Generating video...');
            const response = await axios.post('/api/videos/generate', { text: textInput });

            setMessage(response.data.message);
            setGeneratedVideo(response.data.videoPath);
        } catch (error) {
            setMessage('Video generation failed');
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center ">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">AI-Powered Video Generator</h1>
                <div className="mb-4">
                    <textarea
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter text to generate a 15-second video"
                        value={textInput}
                        onChange={handleTextChange}
                        rows="5"
                    />
                </div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    onClick={handleGenerateVideo}
                >
                    Generate Video
                </button>
                <p className="mt-4 text-center text-sm">{message}</p>
                {generatedVideo && (
                    <div className="mt-6 text-center">
                        <h3 className="text-lg font-semibold mb-2">Generated Video:</h3>
                        <a
                            href={`http://localhost:5000/${generatedVideo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            Download Generated Video
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
