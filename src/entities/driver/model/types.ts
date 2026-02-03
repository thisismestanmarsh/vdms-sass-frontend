export interface Driver {
  id: string;
  company_id: string;
  driver_id: string;
  driver_full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  alternate_phone: string;
  address: string;
  city: string;
  hub_id: string;
  hub_name: string;
  driver_type: string;
  driver_status: string;
  joining_date: string;
  dl_number: string;
  dl_expiry_date: string;
  dl_issue_date: string;
  dl_photo_front_url?: string;
  dl_photo_back_url?: string;
  dl_status: string;
  license_no: string;
  license_type: string;
  aadhaar_number: string;
  aadhaar_photo_url?: string;
  aadhaar_status: string;
  driver_photo_url?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export type DriverCreateRequest = Omit<Driver, 'id' | 'company_id' | 'created_at' | 'updated_at'>;
export type DriverUpdateRequest = Partial<Omit<DriverCreateRequest, 'driver_id'>>;
