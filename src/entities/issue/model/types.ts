export interface Translation {
    language: string;
    name: string;
}

export interface SubIssue {
    id: string;
    name: string;
    translations?: Translation[];
    vehicleTypes: string[];
    vehicleSegments: string[];
    color: string;
}

export interface Issue {
    id: string;
    name: string;
    translations?: Translation[];
    vehicles: string[];
    segments: string[];
    subIssues: SubIssue[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateIssuePayload {
    name: string;
    translations?: Translation[];
    vehicles?: string[];
    segments?: string[];
    subIssues: Omit<SubIssue, 'id'>[];
}
