export interface ContractData {
  abi: any[];
  natspec: {
    devdoc: any;
    userdoc: any;
  };
}

export interface ApiKeyModalProps {
  isOpen: boolean;
  onSubmit: (apiKey: string) => void;
}

export interface DropZoneProps {
  onFileDrop: (content: string) => void;
}