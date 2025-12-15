import { MediaGroup } from "@/domain/shared/interfaces/passport-service/media-group";
import { ApiMediaGroup } from "../interface/api-media-group";

export const fromApiMediaGroup = (data: ApiMediaGroup): MediaGroup => {
  return {
    groupId: Number(data.groups_id),
    mediaGroupId: Number(data.media_group_id),
  };
};
