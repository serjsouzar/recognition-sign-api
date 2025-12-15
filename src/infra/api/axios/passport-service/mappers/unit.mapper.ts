import { Unit } from "@/domain/shared/interfaces/passport-service/unit";
import { ApiUnit } from "../interface/api-unit";

export const fromApiUnit = (data: ApiUnit): Unit => {
  return {
    id: data.id,
    customerId: Number(data.customer_id),
    unitName: data.unit_name,
    cnpj: data.cnpj,
    address: data.address,
    parentId: Number(data.parent_id),
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deletedAt: data.deleted_at,
    areaId: Number(data.area_id),
    number: data.number,
    complement: data.complement,
    stateId: Number(data.state_id),
    cityId: Number(data.city_id),
    neighborhoodId: Number(data.neighborhood_id),
    externalSystemCode: data.external_system_code,
    pivot: {
      userId: Number(data.pivot.user_id),
      customerUnitId: Number(data.pivot.customer_unit_id),
    },
    evasionPoints: data.evasion_points,
  };
};
