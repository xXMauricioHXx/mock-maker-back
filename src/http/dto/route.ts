import { RouteMethod } from '../../enums';

export interface CreateDTO {
  method: RouteMethod;
  uri: string;
  statusCode: number;
  response: JSON;
  projectId: string;
}
