import React, { useState } from 'react';
import UploadPage from './pages/UploadPage';
import LoadingPage from './pages/LoadingPage';
import NotesPage from './pages/NotesPage';

function App() {
  const [page, setPage] = useState('upload');
  const [notes, setNotes] = useState(null);
  const [style, setStyle] = useState('concise');
  const [file, setFile] = useState(null);

  const handleGenerate = async (uploadedFile, selectedStyle) => {
    const fileToUse = uploadedFile || file;
    const styleToUse = selectedStyle || style;
    setPage('loading');

    const formData = new FormData();
    formData.append('pdf', fileToUse);
    formData.append('style', styleToUse);

    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
        setFile(fileToUse);
        setStyle(styleToUse);
        setPage('notes');
      } else {
        alert('Something went wrong: ' + data.error);
        setPage('upload');
      }
    } catch (err) {
      alert('Could not connect to server');
      setPage('upload');
    }
  };

  return (
    <div>
      {page === 'upload' && (
        <UploadPage style={style} setStyle={setStyle} onGenerate={handleGenerate} />
      )}
      {page === 'loading' && <LoadingPage />}
      {page === 'notes' && (
        <NotesPage
          notes={notes}
          style={style}
          onStyleChange={(newStyle) => handleGenerate(file, newStyle)}
          onBack={() => setPage('upload')}
        />
      )}
    </div>
  );
}

export default App;