import { User } from "@/domain/shared/interfaces/passport-service/user";
import { ApiUser } from "../interface/api-user";
import { fromApiCustomer } from "./customer.mapper";
import { fromApiUnit } from "./unit.mapper";
import { fromApiGroupUser } from "./group-user.mapper";
import { fromApiRolePermission } from "./role-permission.mapper";

export const fromApiUser = (data: ApiUser): User => {
  return {
    id: data.id,
    externalId: parseInt(String(data.external_id)) || null,
    customerId: parseInt(data.customer_id),
    name: data.name,
    email: data.email,
    address: data.address,
    username: data.username,
    usesClientIntegration: parseInt(data.uses_client_integration) === 1,
    customer: data?.customer && fromApiCustomer(data?.customer),
    units: (data.units ?? []).map(fromApiUnit) ?? [],
    userGroups: (data.groups_users ?? []).map(fromApiGroupUser),
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deletedAt: data.deleted_at,
    roles: (data.roles ?? []).map(fromApiRolePermission),
  };
};
