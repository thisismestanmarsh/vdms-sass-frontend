import type { Zone, FlattenedZoneHub } from '@entities/zone/model/types';

export const MOCK_ZONES: Zone[] = [
  {
    id: 'z1',
    zone_id: 101,
    zone_name: 'North Zone',
    country: 'India',
    type: 'Logistics',
    city_names: ['Delhi', 'Noida', 'Gurgaon'],
    hubs: [
      { hub_id: 1, hub_name: 'Delhi North', status: 'Active', type: 'Main', lat: '28.7041', lng: '77.1025', address: 'Delhi' },
      { hub_id: 2, hub_name: 'Noida Hub', status: 'Active', type: 'Sub', lat: '28.5355', lng: '77.3910', address: 'Noida' },
    ],
  },
  {
    id: 'z2',
    zone_id: 102,
    zone_name: 'South Zone',
    country: 'India',
    type: 'Logistics',
    city_names: ['Bangalore', 'Chennai'],
    hubs: [
      { hub_id: 3, hub_name: 'BLR South', status: 'Active', type: 'Main', lat: '12.9716', lng: '77.5946', address: 'Bangalore' },
    ],
  },
];

export const MOCK_FLATTENED_HUBS: FlattenedZoneHub[] = [
  {
    city_name: 'Delhi',
    country: 'India',
    hub_id: 1,
    hub_name: 'Delhi North',
    status: 'Active',
    zone_id: 'z1',
    zone_name: 'North Zone',
  },
  {
    city_name: 'Noida',
    country: 'India',
    hub_id: 2,
    hub_name: 'Noida Hub',
    status: 'Active',
    zone_id: 'z1',
    zone_name: 'North Zone',
  },
  {
    city_name: 'Bangalore',
    country: 'India',
    hub_id: 3,
    hub_name: 'BLR South',
    status: 'Active',
    zone_id: 'z2',
    zone_name: 'South Zone',
  },
];
