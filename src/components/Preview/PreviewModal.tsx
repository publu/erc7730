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
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    previewData = { error: "Invalid JSON content" };
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative flex h-screen items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="relative h-[90vh] w-[90vw] max-w-[1400px] overflow-y-auto">
          <PreviewTool json={previewData} />
        </div>
      </div>
    </div>
  );
};
