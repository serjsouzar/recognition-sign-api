import { ApiUserPermission } from "../interface/api-user-permission";
import { UserPermission } from "@/domain/shared/interfaces/passport-service/user-permission";

export const fromApiPermission = (
  permission: ApiUserPermission
): UserPermission => {
  return {
    applicationId: permission.application_id,
    createdAt: permission.created_at,
    deletedAt: permission.deleted_at,
    description: permission.description,
    id: permission.id,
    label: permission.label,
    name: permission.name,
    root: permission.name,
    updatedAt: permission.updated_at,
  };
};
