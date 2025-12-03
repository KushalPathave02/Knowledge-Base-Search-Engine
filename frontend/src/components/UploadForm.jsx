import React, { useState } from 'react';
import { uploadFile } from '../api/api';
import { Upload } from 'lucide-react';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setMessage('Please provide a title and select a file.');
      return;
    }
    setUploading(true);
    setMessage('');
    try {
      await uploadFile(file, title);
      setMessage('✅ File uploaded successfully!');
      setTitle('');
      setFile(null);
      document.getElementById('file-input').value = '';
    } catch (error) {
      setMessage('❌ File upload failed. Please try again.');
      console.error(error);
    }
    setUploading(false);
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Document Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Company Manual, Research Paper"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file-input">PDF File</label>
          <input
            id="file-input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf"
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={uploading} 
            className="upload-btn"
          >
            <Upload size={16} />
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
        {message && (
          <div className={`form-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadForm;
