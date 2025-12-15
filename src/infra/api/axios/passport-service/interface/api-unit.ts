export interface ApiUnit {
  id: number;
  customer_id: string;
  unit_name: string;
  cnpj: string;
  address: string;
  parent_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  area_id: string;
  number: string;
  complement: string;
  state_id: string;
  city_id: string;
  neighborhood_id: string;
  external_system_code: null | string;
  pivot: {
    user_id: string;
    customer_unit_id: string;
  };
  evasion_points: unknown[];
}
