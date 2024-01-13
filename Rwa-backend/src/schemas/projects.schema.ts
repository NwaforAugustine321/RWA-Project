import { JSONSchemaType } from 'ajv';
import { IProjectRequest } from '../interfaces/projects.interface';

export const ProjectSchema: JSONSchemaType<IProjectRequest> = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};
