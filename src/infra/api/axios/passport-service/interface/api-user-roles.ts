import { ApiUserPermission } from "./api-user-permission";
import { ApiUserPivot } from "./api-user-pivot";

export interface ApiUserRolePermission {
  id: number;
  name: string;
  label: string;
  customer_id: string;
  deleted_at: string | null;
  pivot?: ApiUserPivot;
  permissions?: ApiUserPermission[];
}
