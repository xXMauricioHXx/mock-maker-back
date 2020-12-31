import { RouteMethod } from './enums';

export interface FindUserMessage {
  id: string;
}

export interface RabbitMQConfig {
  protocol: string;
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface UserMessage {
  id: string;
  name: string;
  username: string;
  emailAddress: string;
}

export interface JsonPlaceholderConfig {
  baseURL: string;
}
export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  method: RouteMethod;
  uri: string;
  statusCode: number;
  response: object;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Rule {
  id: string;
  code: string;
  rule: object;
  createdAt: string;
  updatedAt: string;
}

export interface Error {
  id: string;
  code: string;
  statusCode: number;
  message: string;
  ruleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RouteError {
  id: string;
  routeId: string;
  errorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContainerConfig {}

export interface WorkerJob {
  running: boolean;
  start(): void;
  stop(): void;
}
