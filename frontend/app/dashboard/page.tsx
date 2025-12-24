'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function DashboardPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-heading text-[#008080]">
              Fotopainter
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/pricing" className="text-gray-700 hover:text-[#008080] transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#008080] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-heading text-gray-900 mb-4">
            Create Your Paint-by-Number Art
          </h1>
          <p className="text-lg text-gray-600">
            Upload your photo and let our AI transform it into a beautiful paint-by-number template
          </p>
        </div>

        <Card>
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-[#008080] bg-[#008080]/5'
                  : 'border-[#008080] hover:border-[#006666]'
              }`}
            >
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-[#008080]"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-heading">
                Drag and drop your photo here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse from your device
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports JPEG, PNG, WebP (Max 10MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="inline-block">
                <Button variant="primary" size="md" type="button">
                  Choose File
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-heading">Image Uploaded</h3>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Uploaded"
                    className="max-h-64 rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">{uploadedFile.name}</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => setUploadedFile(null)}
                  >
                    Upload Different Image
                  </Button>
                  <Button variant="primary">
                    Process Image
                  </Button>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Image processing functionality will be available once the backend API is connected.
                  This is a preview of the upload interface.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

