import { DeviceContext } from "./DeviceContext";
import { ScreensInteractive } from "./ScreensInteractive";
import { type Deployment, type PreviewData } from "../../types/PreviewData";

interface Props {
  data: PreviewData;
  selectedDevice: "flex" | "stax";
  selectedOperation: string;
}

export const DevicesDemoInteractive = ({
  data,
  selectedDevice,
  selectedOperation,
}: Props) => {
  console.log("🚀 | data:", data);
  // Early return if data is invalid or missing required fields
  if (!data || typeof data !== "object") {
    console.error("Invalid data provided to DevicesDemoInteractive");
    return null;
  }

  const { contract, metadata, operations, type } = data;

  // Validate required fields
  if (!contract?.deployments || !Array.isArray(contract.deployments)) {
    console.error("Invalid or missing contract deployments");
    return null;
  }

  if (!operations || !Array.isArray(operations)) {
    console.error("Invalid or missing operations");
    return null;
  }

  if (!metadata || typeof metadata !== "object") {
    console.error("Invalid or missing metadata");
    return null;
  }

  // Find chosen operation with fallback
  const chosenOperation = operations.find(
    ({ id, intent }) =>
      (id && selectedOperation === id) ||
      (intent && selectedOperation === intent)
  );

  // Use first operation as fallback if selected operation not found
  const finalOperation = chosenOperation || operations[0];

  if (!finalOperation) {
    console.error("No valid operations available");
    return null;
  }

  // Get first deployment with fallback values
  const deployment = contract.deployments[0] || { address: "", chainId: 1 };
  const { address: contractAddress, chainId } = deployment;

  // Ensure metadata fields exist with fallbacks
  const safeMetadata = {
    owner: metadata.owner || "",
    info: metadata.info || {
      legalName: "",
      lastUpdate: new Date().toISOString(),
      url: "",
    },
  };

  return (
    <DeviceContext.Provider value={selectedDevice}>
      <div className="overflow-x-scroll p-16">
        <div className="flex w-fit space-x-10 pe-16 font-inter text-sm">
          <ScreensInteractive
            chainId={chainId}
            contractAddress={contractAddress}
            chosenOperation={finalOperation}
            info={safeMetadata.info}
            owner={safeMetadata.owner}
            operationType={type || "transaction"}
          />
        </div>
      </div>
    </DeviceContext.Provider>
  );
};
