import React, { useState } from 'react';
import { Key } from 'lucide-react';
import type { ApiKeyModalProps } from '../types';

export function ApiKeyModal({ isOpen, onSubmit }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-semibold">Enter OpenAI API Key</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Your API key will be stored locally and never sent to our servers.
        </p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={() => onSubmit(apiKey)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save API Key
        </button>
      </div>
    </div>
  );
}