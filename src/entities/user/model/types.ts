export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    roles: string[];
    tenant_id: string;
    is_active: boolean;
    hub_list: number[];
    zone_ids: number[];
    created_at: string;
    updated_at: string;
}

export interface UserRequest {
    email: string;
    hub_list: number[];
    name: string;
    password?: string;
    phone: string;
    roles: string[];
    zone_ids: number[];
}

export interface UpdateUserRequest {
    hub_list: number[];
    is_active: boolean;
    name: string;
    phone: string;
    roles: string[];
    zone_ids: number[];
}

export interface UsersResponse {
    users: User[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}
