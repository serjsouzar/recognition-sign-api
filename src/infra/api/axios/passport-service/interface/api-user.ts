import { ApiCustomer } from "./api-customer";
import { ApiGroupUser } from "./api-group-user";
import { ApiUnit } from "./api-unit";
import { ApiUserRolePermission } from "./api-user-roles";

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  customer_id: string;
  external_id: string | null;
  uses_client_integration: string;
  customer: ApiCustomer;
  units?: ApiUnit[];
  groups_users?: ApiGroupUser[];
  roles?: ApiUserRolePermission[];
}
