import { GroupUser } from "@/domain/shared/interfaces/passport-service/group-user";
import { ApiGroupUser } from "../interface/api-group-user";
import { fromApiMediaGroup } from "./media-group.mapper";

export const fromApiGroupUser = (data: ApiGroupUser): GroupUser => {
  return {
    id: data.id,
    customerId: Number(data.customer_id),
    groupName: data.group_name,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deletedAt: data.deleted_at,
    pivot: {
      usersId: Number(data.pivot.users_id),
      groupsId: Number(data.pivot.groups_id),
    },
    mediaGroups: data.media_groups.map(fromApiMediaGroup),
  };
};
