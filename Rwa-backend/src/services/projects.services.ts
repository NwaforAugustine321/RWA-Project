/**
 * @file project service.
 */

import { IProjectRequest, IResponse } from '../interfaces/projects.interface';
import * as repo from '../repositories/projects.repositories';

/**
 * Update RealTime Project Change.
 *
 * @returns Promise
 */
export const projectRealTimeChange = async (
  payload: IProjectRequest
): Promise<IResponse | []> => {
  return await repo.projectRealTimeChange(payload);
};

/**
 * Get all projects
 *
 * @returns Promise
 */
export const getAllProject = async (): Promise<IResponse | []> => {
  return await repo.getAllProject();
};
