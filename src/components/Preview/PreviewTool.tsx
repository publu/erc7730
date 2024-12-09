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
      <div className="border-b border-[#fff2] bg-[#fff1] text-tool-neutral-70 antialiased">
        <header className="p-5 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-[#fff1] p-3">
              <img
                src="/assets/Ledger-favicon.svg"
                width={20}
                height={17.5}
                alt="Logo"
                className="w-5 h-auto"
              />
            </div>
            <h1 className="text-lg font-medium">
              Open Clear Signing Format preview
            </h1>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/LedgerHQ/clear-signing-erc7730-registry/blob/master/specs/erc-7730.md"
              target="_blank"
              className="rounded-[76px] bg-[#fff1] p-3 px-5 text-sm font-medium text-white"
            >
              Whitepaper
            </a>
            <a
              href="https://developers.ledger.com/docs/clear-signing/erc7730"
              target="_blank"
              className="rounded-[76px] bg-[#fff1] p-3 px-5 text-sm font-medium text-white"
            >
              View documentation
            </a>
          </div>
        </header>

        <div className="p-5 grid grid-cols-3 gap-3">
          {errorMessage && (
            <div className="col-span-2 row-start-2">
              <div className="rounded-md border border-[#fff1] px-3 py-2 text-sm text-red-400">
                {errorMessage}
              </div>
            </div>
          )}

          {previewData && <></>}
        </div>
      </div>

      {previewData && (
        <>
          <div className="bg-tool-background">
            <DevicesDemoInteractive
              data={previewData}
              selectedDevice={selectedDevice}
              selectedOperation={selectedOperation}
            />
          </div>
        </>
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
