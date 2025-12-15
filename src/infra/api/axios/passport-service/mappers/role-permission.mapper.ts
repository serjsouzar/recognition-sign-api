import { ApiUserRolePermission } from "../interface/api-user-roles-permission";
import { UserRolePermission } from "@/domain/shared/interfaces/passport-service/user-roles";
import { fromApiPermission } from "./permission";

export const fromApiRolePermission = (
  role: ApiUserRolePermission
): UserRolePermission => {
  return {
    id: role.id,
    name: role.name,
    deletedAt: role.deleted_at,
    customerId: role.customer_id,
    label: role.label,
    permissions: (role?.permissions ?? [])?.map(fromApiPermission),
  };
};
