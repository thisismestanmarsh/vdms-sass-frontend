export interface Vehicle {
  category: string;
  chassis_number: string;
  city_code: string;
  country_code: string;
  created_at: string;
  engine_type: string;
  fastag_account: string;
  fastag_number: string;
  financier_name: string;
  fitness: {
    expiry_date: string;
    status: string;
  };
  generation: string;
  hub_id: string;
  id: string;
  insurance: {
    insurance_type: string;
    insurer_broker: string;
    insurer_name: string;
    policy_end_date: string;
    policy_number: string;
    policy_start_date: string;
    premium_amount: number;
  };
  invoice_date: string;
  lease_end_date: string | null;
  lease_start_date: string | null;
  leasing_entity: string | null;
  model: string;
  oem: string;
  ownership_count: number;
  ownership_type: string;
  powertrain_specs: {
    ev?: {
      arai_range_km: number;
      battery_capacity_kwh: number;
      battery_soh_date: string;
      battery_soh_percent: number;
      battery_type: string;
      connector_type: string;
      current_range_km: number;
      fast_charger_rate_kw: number;
      onboard_charger_capacity_kw: number;
      range_on_start_date_km: number;
    };
    ice?: {
      arai_mileage_kmpl: number;
      cng_kit_fitment_type: string;
      cooling_system_type: string;
      current_mileage_kmpl: number;
      emission_control_type: string;
      emission_norm: string;
      engine_displacement_cc: number;
      fuel_tank_capacity_liters: number;
      mileage_on_start_date_kmpl: number;
      number_of_cylinders: number;
      transmission_type: string;
    };
  };
  puc_expiry_date: string;
  registration_date: string;
  service_config: {
    alert_interval_days: number;
    automatic_climate_control: boolean;
    preventive_service_interval_days: number;
    preventive_service_km: number;
    preventive_service_trigger_type: string;
    stepney_count: number;
    stepney_size: string;
    tyre_replacement_km: number;
    tyre_size: string;
    wheel_alignment_km_alert_range: number;
  };
  state_code: string;
  telematics: {
    enabled: boolean;
    type: string;
    name: string;
  };
  toll: {
    amount: number;
    scope: string;
    type: string;
    validity_date: string;
  };
  type_of_vehicle: string;
  updated_at: string;
  variant: string;
  vehicle_number: string;
  warranties: Array<{
    component: string;
    max_distance_km: number;
    warranty_end_date: string;
  }>;
}

export type VehicleRequest = Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>;

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}
