import React from 'react';
import UploadForm from '../components/UploadForm';

function UploadPage() {
  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>📄 Upload Documents</h2>
        <p>Upload PDF files to add them to your knowledge base. They will be indexed and made searchable.</p>
      </div>
      <div className="upload-form-wrapper">
        <UploadForm />
      </div>
    </div>
  );
}

export default UploadPage;
