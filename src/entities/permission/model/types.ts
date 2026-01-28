export interface Permission {
    id: number;
    action: string;
    description: string;
    module: string;
    name: string;
    resource: string;
    scope: string;
    created_at?: string;
    updated_at?: string;
}

export interface PermissionRequest {
    action: string;
    description: string;
    module: string;
    name: string;
    resource: string;
    scope: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: string;
}
