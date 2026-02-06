export type WorkshopStatus = 'Active' | 'Inactive';
export type WorkshopType = 'Service' | 'Dealer';

export interface Workshop {
  id: string;
  workshop_id: string;
  workshop_name: string;
  address: string;
  maps_link: string;
  primary_phone: string;
  status: WorkshopStatus;
  type: WorkshopType;
  zone_id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  last_updated?: string;
}

export interface WorkshopPayload {
  workshop_name: string;
  address: string;
  maps_link: string;
  primary_phone: string;
  status: WorkshopStatus;
  type: WorkshopType;
  zone_id: string;
}

export interface WorkshopResponse {
  status_code: number;
  data: Workshop[];
  message: string;
  message_key: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  timestamp: string;
  request_id: string;
}

export interface WorkshopDetailResponse {
  status_code: number;
  data: Workshop;
  message: string;
  message_key: string;
  timestamp: string;
  request_id: string;
}
