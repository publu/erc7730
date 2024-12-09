import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import type { DropZoneProps } from '../types';

export function DropZone({ onFileDrop }: DropZoneProps) {
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      
      if (file && file.name.endsWith('.sol')) {
        const content = await file.text();
        onFileDrop(content);
      }
    },
    [onFileDrop]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-lg text-gray-600">
        Drag and drop your Solidity file here
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Only .sol files are supported
      </p>
    </div>
  );
}