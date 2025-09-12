import React, { useState } from 'react';
import { Upload, FileText, Tag, Database, Brain } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useModels } from '../hooks/useModels';

interface UploadFormProps {
  onSuccess?: () => void;
}

const FRAMEWORKS = [
  'TensorFlow',
  'PyTorch',
  'ONNX',
  'TensorFlow Lite',
  'Core ML',
  'Other'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export function UploadForm({ onSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [framework, setFramework] = useState('');
  const [format, setFormat] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const { user } = useAuth();
  const { uploadModel } = useModels();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`File size must be ≤10 MB. Selected file is ${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`);
      return;
    }
    setFile(selectedFile);
    setError('');
    if (!name.trim()) {
      setName(selectedFile.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form validation check:');
    console.log('File:', file ? file.name : 'No file');
    console.log('User:', user ? user.id : 'No user');
    console.log('Name:', `"${name}"`, 'Trimmed:', `"${name.trim()}"`, 'Length:', name.trim().length);
    
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    if (!user) {
      setError('Please sign in to upload models');
      return;
    }
    
    if (!name || name.trim().length === 0) {
      setError('Please provide a model name');
      return;
    }

    console.log('Form submission started');
    console.log('User:', user.id);
    console.log('File:', file.name, file.size);
    console.log('Name:', name.trim());
    
    setUploading(true);
    setError('');

    const tagsArray = tags 
      ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    const metadata = {
      name: name.trim(),
      description: description.trim() || undefined,
      framework: framework || undefined,
      format: format.trim() || undefined,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
    };
    
    console.log('Upload metadata:', metadata);
    const { data, error: uploadError } = await uploadModel(
      file,
      metadata,
      user.id
    );

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      setError(uploadError);
    } else {
      console.log('Upload successful:', data);
      // Reset form
      setFile(null);
      setName('');
      setDescription('');
      setFramework('');
      setFormat('');
      setTags('');
      onSuccess?.();
    }

    setUploading(false);
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Upload className="w-5 h-5 mr-2 text-blue-600" />
          Upload Model
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model File (≤10 MB)
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : file 
                  ? 'border-emerald-400 bg-emerald-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {file ? (
                <div className="space-y-2">
                  <FileText className="w-12 h-12 text-emerald-600 mx-auto" />
                  <p className="text-sm font-medium text-emerald-700">{file.name}</p>
                  <p className="text-xs text-emerald-600">{formatSize(file.size)}</p>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-xs text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Drop your model file here or click to browse</p>
                  <p className="text-xs text-gray-500">Maximum file size: 10 MB</p>
                </div>
              )}
              <input
                type="file"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".h5,.pb,.pth,.onnx,.tflite,.mlmodel,.pkl,.bin,.safetensors"
                required
              />
            </div>
          </div>

          {/* Model Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter model name"
              maxLength={100}
              onBlur={() => console.log('Name field blur:', `"${name}"`)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {name.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe your model and its capabilities"
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/500 characters
            </p>
          </div>

          {/* Framework & Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Select framework</option>
                {FRAMEWORKS.map(fw => (
                  <option key={fw} value={fw}>{fw}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g., SavedModel, .pth, .onnx"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., computer-vision, nlp, classification"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file || !name.trim() || uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
          >
            {uploading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span>Upload Model</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}