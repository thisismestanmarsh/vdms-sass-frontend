import type { Zone } from '@entities/zone/model/types';

export const MOCK_ZONES_DROPDOWN: Zone[] = [
  {
    id: 'z1',
    zone_id: 101,
    zone_name: 'North Zone',
    country: 'India',
    type: 'Logistics',
    city_names: ['Delhi', 'Noida'],
  },
  {
    id: 'z2',
    zone_id: 102,
    zone_name: 'South Zone',
    country: 'India',
    type: 'Logistics',
    city_names: ['Bangalore'],
  },
  {
    id: 'z3',
    zone_id: 103,
    zone_name: 'West Zone',
    country: 'India',
    type: 'Logistics',
    city_names: ['Mumbai'],
  },
];
