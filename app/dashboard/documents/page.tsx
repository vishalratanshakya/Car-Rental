'use client';

import { FileText, Upload, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const DOCUMENTS = [
  { id: 1, name: 'Driver License', status: 'verified', expiry: '2025-12-31', uploaded: '2024-01-15' },
  { id: 2, name: 'Insurance Policy', status: 'verified', expiry: '2025-06-30', uploaded: '2024-01-20' },
  { id: 3, name: 'ID Proof', status: 'pending', expiry: null, uploaded: '2024-07-10' },
];

import { useAuth } from '@/lib/auth-context';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(DOCUMENTS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user, updateProfile } = useAuth();

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Documents</h1>
          <p className="text-muted-foreground">Upload and manage your verification documents</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">Uploaded: {doc.uploaded}</p>
                {doc.expiry && (
                  <p className="text-sm text-muted-foreground">Expiry: {doc.expiry}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {doc.status === 'verified' ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={20} />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">Pending</span>
                </div>
              )}
              {doc.status !== 'verified' ? (
                <Button variant="outline" size="sm" onClick={() => setShowUploadModal(true)}>
                  <Upload size={16} className="mr-1" />
                  Upload
                </Button>
              ) : (
                <a 
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(`Document Details:\nName: ${doc.name}\nStatus: ${doc.status}\nUploaded: ${doc.uploaded}`)}`} 
                  download={`${doc.name.replace(/\s+/g, '_')}.txt`}
                >
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-1" />
                    Download
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-foreground mb-4">Upload Document</h3>
            <label className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6 hover:border-primary transition-colors cursor-pointer block relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept="image/*,.pdf" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }} 
              />
              <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="font-medium text-foreground mb-1">
                {selectedFile ? selectedFile.name : 'Click to upload'}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedFile ? 'Click to change file' : 'or drag and drop'}
              </p>
            </label>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => {
                setShowUploadModal(false);
                setSelectedFile(null);
              }} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1" disabled={!selectedFile} onClick={() => {
                if (user) {
                  updateProfile({ verified: true });
                }
                setShowUploadModal(false);
                setSelectedFile(null);
              }}>
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
