import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileCode, AlertCircle, CheckCircle, Folder } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], projectName: string) => Promise<void>;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [projectName, setProjectName] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadMode, setUploadMode] = useState<'files' | 'folder'>('folder');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ext && ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'json', 'vue', 'svelte'].includes(ext);
    });
    setFiles(validFiles);
    setError('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.cs', '.php', '.rb', '.go', '.rs', '.json', '.vue', '.svelte']
    },
    maxSize: 5 * 1024 * 1024, // 5MB per file
    maxFiles: 100
  });

  const handleFolderUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const validFiles = Array.from(fileList).filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext && ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'json', 'vue', 'svelte'].includes(ext);
      });
      setFiles(validFiles);
      setError('');
      
      // Auto-generate project name from folder structure if not set
      if (!projectName && validFiles.length > 0) {
        const firstFile = validFiles[0];
        const pathParts = firstFile.webkitRelativePath?.split('/') || firstFile.name.split('/');
        if (pathParts.length > 1) {
          setProjectName(pathParts[0]);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || files.length === 0) {
      setError('Please provide a project name and select files/folder');
      return;
    }

    setUploading(true);
    setError('');

    try {
      await onUpload(files, projectName.trim());
      onClose();
      setProjectName('');
      setFiles([]);
    } catch (err: any) {
      setError(err.message || 'Failed to upload project');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const resetModal = () => {
    setProjectName('');
    setFiles([]);
    setError('');
    setUploadMode('folder');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Upload Project</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project name"
                required
              />
            </div>

            {/* Upload Mode Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Method
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setUploadMode('folder')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    uploadMode === 'folder'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Folder className="h-4 w-4" />
                  <span>Upload Folder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('files')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    uploadMode === 'files'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileCode className="h-4 w-4" />
                  <span>Select Files</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {uploadMode === 'folder' ? 'Project Folder' : 'Code Files'}
              </label>
              
              {uploadMode === 'folder' ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    onChange={handleFolderUpload}
                    webkitdirectory=""
                    directory=""
                    multiple
                    className="hidden"
                    id="folder-upload"
                  />
                  <label
                    htmlFor="folder-upload"
                    className="cursor-pointer block"
                  >
                    <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Select Project Folder
                    </p>
                    <p className="text-sm text-gray-500">
                      Choose a folder containing your project files
                    </p>
                  </label>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {isDragActive ? 'Drop files here' : 'Drag & drop your code files'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JS, TS, Python, Java, C++, and more (Max 5MB per file, 100 files total)
                  </p>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Files ({files.length})
                </h3>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {files.slice(0, 10).map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileCode className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {file.webkitRelativePath || file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {files.length > 10 && (
                    <div className="text-center py-2 text-sm text-gray-500">
                      ... and {files.length - 10} more files
                    </div>
                  )}
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700 text-sm"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={uploading || !projectName.trim() || files.length === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Start Analysis'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};