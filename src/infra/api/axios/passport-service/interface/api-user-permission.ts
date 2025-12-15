export interface ApiUserPermission {
  id: number;
  name: string;
  label: string;
  application_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  root: string;
  description: string;
}
