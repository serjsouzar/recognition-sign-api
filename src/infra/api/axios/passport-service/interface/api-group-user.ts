import { ApiMediaGroup } from "./api-media-group";

export interface ApiGroupUser {
  id: number;
  customer_id: string;
  group_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  pivot: {
    users_id: string;
    groups_id: string;
  };
  media_groups: ApiMediaGroup[];
}
