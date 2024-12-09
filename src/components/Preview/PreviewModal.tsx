import React from "react";
import { X } from "lucide-react";
import PreviewTool from "./PreviewTool";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  if (!isOpen) return null;

  let previewData;
  try {
    previewData = JSON.parse(content);
  } catch (_) {
    previewData = { error: "Invalid JSON content" };
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-7xl rounded-lg bg-white shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="h-[90vh] overflow-y-auto">
            <PreviewTool json={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
};
