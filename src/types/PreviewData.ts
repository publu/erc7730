export type Deployment = {
    address: string;
    chainId: number;
};

export interface DisplayItem {
    label: string;
    displayValue: string;
}

export interface Operation {
    id: string;
    intent: string;
    displays: DisplayItem[];
}

export type PreviewData = {
    type: "transaction" | "message";
    contract: {
        name: string;
        deployments: Deployment[];
    };
    metadata: {
        owner: string;
        info?: {
            legalName: string;
            lastUpdate?: string;
            url: string;
        };
    };
    operations: Operation[];
}; 