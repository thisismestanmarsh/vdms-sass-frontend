export interface Driver {
  id: string;
  name: string;
  phoneNo: string;
  alternatePhoneNo?: string;
  address: string;
  city: string;
  hubs: string[];
  driverPhoto?: string;
  driverType: string;
  drivingSide: string;
  dlName: string;
  dlNumber: string;
  dlExpiryDate: string;
  dlPhoto?: string;
  aadhaarNo: string;
  aadhaarFrontPhoto?: string;
  aadhaarBackPhoto?: string;
  status: 'valid' | 'expiring' | 'expired';
  auctionStatus: 'valid' | 'expiring' | 'expired';
  driverStatus: 'valid' | 'expiring' | 'expired';
  createdAt: string;
  updatedAt: string;
}

export type DriverCreateRequest = Omit<
  Driver,
  'id' | 'status' | 'auctionStatus' | 'driverStatus' | 'createdAt' | 'updatedAt'
>;
export type DriverUpdateRequest = Partial<DriverCreateRequest>;
