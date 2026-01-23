export interface ApiResponse<T> {
    status_code: number;
    data: T;
    message: string;
    message_key: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
    timestamp: string;
    request_id: string;
}

export interface Hub {
    hub_id: number;
    hub_name: string;
    status: string;
    type: string;
    lat: string;
    lng: string;
    address: string;
}

export interface Zone {
    id: string;
    zone_id: number;
    zone_name: string;
    country: string;
    type: string;
    city_names: string[];
    hubs?: Hub[];
    created_at?: string;
    updated_at?: string;
}

export interface HubRequest {
    address: string;
    hub_name: string;
    lat: string;
    lng: string;
    status: string;
    type: string;
}

export interface ZoneRequest {
    zone_id?: number;
    zone_name: string;
    country: string;
    type: string;
    city_names: string[];
}
