import type { Issue } from '@entities/issue/model/types';

export const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    name: 'Engine Problems',
    vehicles: ['Car', 'Truck'],
    segments: ['Luxury', 'Standard'],
    subIssues: [
      { id: 's1', name: 'Overheating', color: '#ff4d4f', vehicleTypes: ['Car'], vehicleSegments: ['Standard'] },
      { id: 's2', name: 'Strange Noise', color: '#faad14', vehicleTypes: ['Truck'], vehicleSegments: ['Heavy'] },
    ],
  },
  {
    id: '2',
    name: 'Brake Issues',
    vehicles: ['Bike', 'Scooter'],
    segments: ['Economy'],
    subIssues: [
      { id: 's3', name: 'Brake Pad Wear', color: '#ff4d4f', vehicleTypes: ['Bike'], vehicleSegments: ['Economy'] },
    ],
  },
];
