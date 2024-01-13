/**
 * @file Project repository.
 */

import { IResponse, IProjectRequest } from '../interfaces/projects.interface';
import { ProjectModel } from '../models/projects.model';
import * as utils from '../utils/utils';
import { RequestError } from '../utils/errors';

/**
 * All project
 * @return promise
 */

export const getAllProject = async () => {
  try {
    const columns = [
      'id',
      'name',
      'url',
      'summary',
      'launch_status',
      'product_category',
      'asset_sub_categories',
      'custodial_non_custodial',
      'private_public_blockchain',
      'chain',
      'founded',
      'secondary_product_category',
      'date',
      'twitter',
      'discord',
      'issuer_asset_category',
    ];
    const projects = await ProjectModel.findAllProject(columns);
    return {
      code: 200,
      message: 'Projects',
      data: projects,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Project RealTime Changes
 * @return promise
 */

const projectFields = [
  'Name',
  'URL',
  'Product Category',
  'Asset Sub-categories',
  'Summary',
  'Launch status',
  'Custodial/Non-custodial',
  'Private/public blockchain',
  'Chain',
  'Project tokens (Utility, Stable)',
  'Date added',
  'Twitter',
  'Discord',
  'Issuer/Asset Category',
];

const checkProjectFields = async (record: any) => {
  const recordField = Object.keys(record);
  let status = false;

  for (let i = 0; i < recordField.length; i++) {
    if (!projectFields.includes(recordField[i])) {
      status = false;
      break;
    }
  }
  status = true;

  return status;
};

export const projectRealTimeChange = async (
  payload: IProjectRequest
): Promise<IResponse> => {
  try {
    const { records } = payload;

    for (let i = 0; i < records.length; i++) {
      const record = records[i];

      const alreadyExistProject = await ProjectModel.findProjectById(
        record?.id,
        ['id', 'name']
      );

      // check if record already exist
      if (alreadyExistProject.length === 0) {
        const { fields } = record;
        const recordId = record?.id;
        // check if there is missing field in the record
        if (await checkProjectFields(fields)) {
          const projectFields = [
            'Name',
            'URL',
            'Product Category',
            'Asset Sub-categories',
            'Summary',
            'Launch status',
            'Custodial/Non-custodial',
            'Private/public blockchain',
            'Chain',
            'Project tokens (Utility, Stable)',
            'Date added',
            'Twitter',
            'Discord',
            'Issuer/Asset Category',
          ];
          const payload = {
            id: recordId,
            name: fields[projectFields[0]] ?? '',
            url: fields[projectFields[1]] ?? '',
            summary: fields[projectFields[4]] ?? '',
            launch_status: fields[projectFields[5]] ?? [],
            product_category: fields[projectFields[2]] ?? [],
            asset_sub_categories: fields[projectFields[3]] ?? [],
            custodial_non_custodial: fields[projectFields[6]] ?? [],
            private_public_blockchain: fields[projectFields[7]] ?? [],
            chain: fields[projectFields[8]] ?? [],
            founded: '',
            secondary_product_category: [],
            date: fields[projectFields[10]] ?? '',
            twitter: fields[projectFields[11]] ?? '',
            discord: fields[projectFields[12]] ?? '',
            issuer_asset_category: fields[projectFields[13]] ?? [],
          };
          const columns = [
            'id',
            'name',
            'url',
            'summary',
            'launch_status',
            'product_category',
            'asset_sub_categories',
            'custodial_non_custodial',
            'private_public_blockchain',
            'chain',
            'founded',
            'secondary_product_category',
            'date',
            'twitter',
            'discord',
            'issuer_asset_category',
          ];
          await ProjectModel.createNewProject(columns, payload);
        }
      }
    }
    return {
      code: 200,
      message: 'Project upgraded successfully',
      data: [{}],
    };
  } catch (error) {
    throw error;
  }
};
