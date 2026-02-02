export const formatPayloadDate = (dateVal: any): string | null => {
  if (!dateVal || dateVal === '') return null;
  if (typeof dateVal === 'string' && dateVal.includes('T')) return dateVal;
  return `${dateVal}T00:00:00Z`;
};

export const toNumber = (val: any): number => {
  if (val === null || val === '' || val === undefined) return 0;
  return Number(val);
};

export const buildVehiclePayload = (formValues: any): any => {
  const payload: any = {
    // Basic vehicle info
    vehicle_number: formValues.vehicle_number || null,
    chassis_number: formValues.chassis_number || null,
    type_of_vehicle: formValues.type_of_vehicle || null,
    engine_type: formValues.engine_type || null,
    oem: formValues.oem || null,
    model: formValues.model || null,
    variant: formValues.variant || null,
    generation: formValues.generation || null,
    category: formValues.category || null,

    // Location
    country_code: formValues.country_code || null,
    state_code: formValues.state_code || null,
    city_code: formValues.city_code || null,
    hub_id: formValues.hub_id || null,

    // Ownership
    ownership_type: formValues.ownership_type || null,
    ownership_count: toNumber(formValues.ownership_count) || 1,

    // Dates
    registration_date: formatPayloadDate(formValues.registration_date),
    invoice_date: formatPayloadDate(formValues.invoice_date),
    lease_start_date: formatPayloadDate(formValues.lease_start_date),
    lease_end_date: formatPayloadDate(formValues.lease_end_date),
    puc_expiry_date: formatPayloadDate(formValues.puc_expiry_date),

    // Financial
    financier_name: formValues.financier_name || null,
    leasing_entity: formValues.leasing_entity || null,

    // Fastag
    fastag_number: formValues.fastag_number || null,
    fastag_account: formValues.fastag_account || null,

    // Fitness
    fitness: formValues.fitness
      ? {
          status: formValues.fitness.status || null,
          expiry_date: formatPayloadDate(formValues.fitness.expiry_date),
        }
      : null,

    // Insurance
    insurance: formValues.insurance
      ? {
          insurance_type: formValues.insurance.insurance_type || null,
          insurer_name: formValues.insurance.insurer_name || null,
          insurer_broker: formValues.insurance.insurer_broker || null,
          policy_number: formValues.insurance.policy_number || null,
          policy_start_date: formatPayloadDate(formValues.insurance.policy_start_date),
          policy_end_date: formatPayloadDate(formValues.insurance.policy_end_date),
          premium_amount: toNumber(formValues.insurance.premium_amount),
        }
      : null,

    // Service Config
    service_config: formValues.service_config
      ? {
          preventive_service_km: toNumber(formValues.service_config.preventive_service_km),
          preventive_service_interval_days: toNumber(
            formValues.service_config.preventive_service_interval_days
          ),
          preventive_service_trigger_type:
            formValues.service_config.preventive_service_trigger_type || null,
          alert_interval_days: toNumber(formValues.service_config.alert_interval_days),
          tyre_size: formValues.service_config.tyre_size || null,
          tyre_replacement_km: toNumber(formValues.service_config.tyre_replacement_km),
          stepney_size: formValues.service_config.stepney_size || null,
          stepney_count: toNumber(formValues.service_config.stepney_count),
          wheel_alignment_km_alert_range: toNumber(
            formValues.service_config.wheel_alignment_km_alert_range
          ),
          automatic_climate_control: formValues.service_config.automatic_climate_control || false,
        }
      : null,

    // Telematics
    telematics: formValues.telematics
      ? {
          enabled: formValues.telematics.enabled || false,
          type: formValues.telematics.type || null,
          name: formValues.telematics.name || null,
        }
      : null,

    // Toll
    toll: formValues.toll
      ? {
          type: formValues.toll.type || null,
          scope: formValues.toll.scope || null,
          amount: toNumber(formValues.toll.amount),
          validity_date: formatPayloadDate(formValues.toll.validity_date),
        }
      : null,

    // Warranties
    warranties:
      formValues.warranties?.map((w: any) => ({
        component: w.component || null,
        max_distance_km: toNumber(w.max_distance_km),
        warranty_end_date: formatPayloadDate(w.warranty_end_date),
      })) || [],
  };

  // Powertrain specs - ONLY include the relevant one
  const engineType = payload.engine_type;
  if (engineType === 'EV' && formValues.powertrain_specs?.ev) {
    payload.powertrain_specs = {
      ev: {
        battery_type: formValues.powertrain_specs.ev.battery_type || null,
        battery_capacity_kwh: toNumber(formValues.powertrain_specs.ev.battery_capacity_kwh),
        battery_soh_percent: toNumber(formValues.powertrain_specs.ev.battery_soh_percent),
        battery_soh_date: formatPayloadDate(formValues.powertrain_specs.ev.battery_soh_date),
        connector_type: formValues.powertrain_specs.ev.connector_type || null,
        onboard_charger_capacity_kw: toNumber(
          formValues.powertrain_specs.ev.onboard_charger_capacity_kw
        ),
        fast_charger_rate_kw: toNumber(formValues.powertrain_specs.ev.fast_charger_rate_kw),
        arai_range_km: toNumber(formValues.powertrain_specs.ev.arai_range_km),
        current_range_km: toNumber(formValues.powertrain_specs.ev.current_range_km),
        range_on_start_date_km: toNumber(formValues.powertrain_specs.ev.range_on_start_date_km),
      },
    };
  } else if (
    (engineType === 'Petrol' || engineType === 'Diesel') &&
    formValues.powertrain_specs?.ice
  ) {
    payload.powertrain_specs = {
      ice: {
        transmission_type: formValues.powertrain_specs.ice.transmission_type || null,
        engine_displacement_cc: toNumber(formValues.powertrain_specs.ice.engine_displacement_cc),
        number_of_cylinders: toNumber(formValues.powertrain_specs.ice.number_of_cylinders),
        fuel_tank_capacity_liters: toNumber(
          formValues.powertrain_specs.ice.fuel_tank_capacity_liters
        ),
        emission_norm: formValues.powertrain_specs.ice.emission_norm || null,
        emission_control_type: formValues.powertrain_specs.ice.emission_control_type || null,
        cooling_system_type: formValues.powertrain_specs.ice.cooling_system_type || null,
        cng_kit_fitment_type: formValues.powertrain_specs.ice.cng_kit_fitment_type || null,
        arai_mileage_kmpl: toNumber(formValues.powertrain_specs.ice.arai_mileage_kmpl),
        current_mileage_kmpl: toNumber(formValues.powertrain_specs.ice.current_mileage_kmpl),
        mileage_on_start_date_kmpl: toNumber(
          formValues.powertrain_specs.ice.mileage_on_start_date_kmpl
        ),
      },
    };
  }

  return payload;
};
