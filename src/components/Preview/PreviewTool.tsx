"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type PreviewData } from "../../types/PreviewData";
import { getPreviewData } from "../../lib/getPreviewData";
import { type ERC7730Schema } from "../../types/ERC7730Schema";
import { DevicesDemoInteractive } from "./DevicesDemoInteractive";

interface Props {
  json: ERC7730Schema;
}

export default function PreviewTool({ json }: Props) {
  const [mounted, setMounted] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<"flex" | "stax">("flex");
  const [selectedOperation, setSelectedOperation] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);

    const operation =
      localStorage.getItem("selectedOperation") ??
      previewData?.operations[0]?.id ??
      "";

    setSelectedOperation(operation);

    const storedDevice = localStorage.getItem("selectedDevice");
    if (storedDevice === "flex" || storedDevice === "stax") {
      setSelectedDevice(storedDevice);
    }
    setFileKey(
      localStorage.getItem("selectedFileKey") ?? "calldata-PoapBridge.json"
    );
  }, [previewData?.operations]);

  useEffect(() => {
    fetchPreviewData(json, setPreviewData, setErrorMessage);
  }, [json]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {previewData && (
        <div className="relative flex h-full w-full items-center justify-center bg-tool-background">
          <DevicesDemoInteractive
            data={previewData}
            selectedDevice={selectedDevice}
            selectedOperation={selectedOperation}
          />

          {/* Device Selector */}
          <div className="absolute bottom-6 right-6 flex items-center gap-4">
            <label className="text-sm font-medium text-white">Device:</label>
            <select
              value={selectedDevice}
              onChange={(e) => {
                const newDevice = e.target.value as "flex" | "stax";
                setSelectedDevice(newDevice);
                localStorage.setItem("selectedDevice", newDevice);
              }}
              className="rounded-md border border-white/10 bg-black/20 px-4 py-2 text-sm text-white outline-none transition-colors hover:bg-black/30 focus:border-white/20"
            >
              <option value="flex">Ledger Flex</option>
              <option value="stax">Ledger Stax</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}

function fetchPreviewData(
  json: ERC7730Schema,
  setPreviewData: Dispatch<SetStateAction<PreviewData | null>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
) {
  const { data, error } = getPreviewData(json);
  if (error) {
    setPreviewData(null);
    setErrorMessage(error);
  } else {
    setErrorMessage("");
    setPreviewData(data);
  }
}
