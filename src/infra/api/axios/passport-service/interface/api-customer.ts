export interface ApiCustomer {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  parent_id: string | null;
  external_id: string | null;
  logo_background: string;
  integration_id: string | null;
  small_logo_white: string;
  parent: string | null;
  childs: string[];
  poc: boolean;
  expiration_date: string | null;
}
