import React, { useState } from 'react';
import { Upload, FileText, Tag, Database, Brain, X, Sparkles, CheckCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    usage_instructions: '',
    mac_instructions: '',
    windows_instructions: '',
    linux_instructions: '',
    framework: '',
    format: '',
    tags: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { user } = useAuth();
  const { uploadModel } = useModels();

  const resetForm = () => {
    setFile(null);
    setFormData({
      name: '',
      description: '',
      usage_instructions: '',
      mac_instructions: '',
      windows_instructions: '',
      linux_instructions: '',
      framework: '',
      format: '',
      tags: ''
    });
    setError('');
  };

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`File too large. Maximum size is 10 MB. Your file is ${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`);
      return;
    }
    
    setFile(selectedFile);
    setError('');
    
    // Auto-fill name if empty
    if (!formData.name.trim()) {
      const fileName = selectedFile.name.replace(/\.[^/.]+$/, '');
      setFormData(prev => ({ ...prev, name: fileName }));
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

  const validateForm = () => {
    if (!file) {
      setError('Please select a file to upload');
      return false;
    }

    if (!user) {
      setError('You must be signed in to upload models');
      return false;
    }

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      setError('Model name is required');
      return false;
    }

    if (trimmedName.length > 100) {
      setError('Model name must be 100 characters or less');
      return false;
    }

    if (formData.description.length > 500) {
      setError('Description must be 500 characters or less');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setUploading(true);
    setError('');
    setUploadSuccess(false);
    
    const progressInterval = simulateProgress();

    try {
      // Prepare tags array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Prepare metadata
      const metadata = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        usage_instructions: formData.usage_instructions.trim() || undefined,
        mac_instructions: formData.mac_instructions.trim() || undefined,
        windows_instructions: formData.windows_instructions.trim() || undefined,
        linux_instructions: formData.linux_instructions.trim() || undefined,
        framework: formData.framework || undefined,
        format: formData.format.trim() || undefined,
        tags: tagsArray.length > 0 ? tagsArray : undefined,
      };

      console.log('Starting upload with:', {
        file: file!.name,
        size: file!.size,
        user: user!.id,
        metadata
      });

      setUploadProgress(95);
      const result = await uploadModel(file!, metadata, user!.id);

      if (result.error) {
        throw new Error(result.error);
      }

      console.log('Upload successful!');
      setUploadProgress(100);
      setUploadSuccess(true);
      
      // Show success animation for 2 seconds
      setTimeout(() => {
        resetForm();
        setUploadSuccess(false);
        setUploadProgress(0);
        onSuccess?.();
      }, 2000);
      resetForm();
      onSuccess?.();
      
    } catch (err) {
      console.error('Upload failed:', err);
      clearInterval(progressInterval);
      setUploadProgress(0);
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-50" />
      
      {/* Success Overlay */}
      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center z-50 rounded-2xl"
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold mb-2"
              >
                Upload Successful! 🎉
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-green-100"
              >
                Your model is now available to the community
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-900 flex items-center"
          >
            <motion.div
              animate={{ rotate: uploading ? 360 : 0 }}
              transition={{ duration: 2, repeat: uploading ? Infinity : 0, ease: "linear" }}
            >
              <Upload className="w-6 h-6 mr-3 text-purple-600" />
            </motion.div>
            Upload New Model
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </motion.div>
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetForm}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            title="Clear form"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Progress Bar */}
          <AnimatePresence>
            {uploading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full relative"
                  >
                    <motion.div
                      animate={{ x: [-20, 100] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-white/30 w-5 skew-x-12"
                    />
                  </motion.div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Uploading your model...</span>
                  <span className="text-sm font-semibold text-purple-600">{Math.round(uploadProgress)}%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Model File <span className="text-red-500">*</span>
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                dragOver 
                  ? 'border-purple-400 bg-purple-50 scale-105' 
                  : file 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
              }`}
            >
              {/* Animated Border */}
              {dragOver && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-purple-400 rounded-xl"
                />
              )}
              
              <input
                type="file"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".h5,.pb,.pth,.onnx,.tflite,.mlmodel,.pkl,.bin,.safetensors"
              />
              
              {file ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-3"
                >
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FileText className="w-12 h-12 text-green-600 mx-auto" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-green-700">{file.name}</p>
                    <p className="text-xs text-green-600">{formatFileSize(file.size)}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-xs text-green-600 hover:text-green-700 underline font-medium"
                  >
                    Remove file
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ y: dragOver ? [-10, 10, -10] : 0 }}
                  transition={{ duration: 1, repeat: dragOver ? Infinity : 0 }}
                  className="space-y-3"
                >
                  <motion.div
                    animate={{ 
                      scale: dragOver ? [1, 1.2, 1] : 1,
                      rotate: dragOver ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Drop your model file here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum file size: 10 MB
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Model Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              placeholder="Enter a descriptive name for your model"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.name.length}/100 characters
            </p>
          </div>

          {/* Usage Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              General Usage Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.usage_instructions}
              onChange={(e) => handleInputChange('usage_instructions', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none font-mono text-sm"
              placeholder="Provide usage instructions or sample code:

```python
import tensorflow as tf

# Load the model
model = tf.keras.models.load_model('your_model.h5')

# Make predictions
predictions = model.predict(your_data)
```"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide general instructions on how to use your model. Include sample code if possible.
            </p>
          </div>

          {/* OS-Specific Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="mr-2">💻</span>
              OS-Specific Instructions (Optional)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Provide platform-specific setup and usage instructions for different operating systems.
            </p>

            {/* macOS Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🍎 macOS Instructions
              </label>
              <textarea
                value={formData.mac_instructions}
                onChange={(e) => handleInputChange('mac_instructions', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none font-mono text-sm"
                placeholder="# macOS Setup
brew install python
pip install tensorflow

# Usage
python your_script.py"
              />
            </div>

            {/* Windows Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🪟 Windows Instructions
              </label>
              <textarea
                value={formData.windows_instructions}
                onChange={(e) => handleInputChange('windows_instructions', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none font-mono text-sm"
                placeholder="# Windows Setup
pip install tensorflow

# Usage
python your_script.py"
              />
            </div>

            {/* Linux Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🐧 Linux Instructions
              </label>
              <textarea
                value={formData.linux_instructions}
                onChange={(e) => handleInputChange('linux_instructions', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none font-mono text-sm"
                placeholder="# Linux Setup
sudo apt-get install python3-pip
pip3 install tensorflow

# Usage
python3 your_script.py"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
              placeholder="Additional details about your model, capabilities, and use cases..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Framework and Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Framework
              </label>
              <select
                value={formData.framework}
                onChange={(e) => handleInputChange('framework', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              >
                <option value="">Select framework (optional)</option>
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
                value={formData.format}
                onChange={(e) => handleInputChange('format', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="e.g., SavedModel, .pth, .onnx"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              placeholder="computer-vision, nlp, classification (comma-separated)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={uploading || !file || !formData.name.trim() || !formData.usage_instructions.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg relative overflow-hidden"
            >
              {/* Button Background Animation */}
              <motion.div
                animate={{ x: uploading ? ['-100%', '100%'] : '-100%' }}
                transition={{ duration: 1.5, repeat: uploading ? Infinity : 0, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              
              {uploading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="w-6 h-6" />
                  </motion.div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Brain className="w-6 h-6" />
                  </motion.div>
                  <span>Upload Model</span>
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}