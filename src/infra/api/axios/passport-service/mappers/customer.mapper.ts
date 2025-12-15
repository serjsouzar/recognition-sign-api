import { Customer } from "@/domain/shared/interfaces/passport-service/customer";
import { ApiCustomer } from "../interface/api-customer";

export const fromApiCustomer = (data: ApiCustomer): Customer => {
  return {
    id: data.id,
    cnpj: data.cnpj,
    address: data.address,
    name: data.name,
    integrationId: data.integration_id ? Number(data.integration_id) : null,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deletedAt: data.deleted_at,
    externalId: data.external_id ? Number(data.external_id) : null,
    parent: data.parent,
    images: {
      logo: {
        normal: data.logo_url,
        small: data.small_logo_white,
      },
      background: data.logo_background,
    },
    parentId: data.parent_id ? Number(data.parent_id) : null,
    childs: data.childs,
    poc: data.poc,
    expirationDate: data.expiration_date,
  };
};
