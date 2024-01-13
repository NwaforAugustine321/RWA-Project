import { Request, Response } from 'express';
import * as apiUtils from '../utils/utils';
import * as projectServices from '../services/projects.services';
import { DataBaseError, RequestError } from '../utils/errors';
import { get, post } from '../utils/axios';

/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */

export const projectRealTimeUpgrade = async (req: Request, res: Response) => {
  try {
    const response = await get(
      `https://api.airtable.com/v0/appuDRgBH0PhiEgQd/TRWA%20Projects`,
      {
        headers: {
          Authorization: `Bearer pat8Pfu1xHdSXQMCT.ab038230da6c9ef1a91b98a48470e4837caec3392adb3f61ba769e515c3432b8`,
        },
      }
    );

    if (response?.data && response?.data.length > 0) {
      return res.status(400).json(
        apiUtils.buildErrorResponse({
          code: 400,
          message: 'No record available',
          data: [{}],
        })
      );
    }

    const { records } = response?.data;
    const project_response = await projectServices.projectRealTimeChange({
      records,
    });

    res.status(200).json(apiUtils.buildSuccessResponse(project_response));
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};

/**
 * Get handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */

export const getAllProject = async (req: Request, res: Response) => {
  try {
    const project_response = await projectServices.getAllProject();

    res.status(200).json(apiUtils.buildSuccessResponse(project_response));
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};

// const getTablesByBaseId = async (baseId: string) => {
//   try {
//     const response = await get(
//       `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
//       {
//         headers: {
//           Authorization: `Bearer patq5WBfw3LkbO7eG.8e71aae98b9eafd6408a1625520645c81b458a7b535aafafa8e41d4eb937e6d7`,
//         },
//       }
//     );
//     return response?.data?.tables;
//   } catch (error) {}
// };

// const getTableById = async (tableId: string, tables: any[]) => {
//   return tables.filter((table) => {
//     return table?.id === tableId;
//   });
// };

// const getTableFieldById = async (fieldId: string, fields: any[]) => {
//   return fields.filter((field) => {
//     return field?.id === fieldId;
//   });
// };

// const { base, webhook } = req.body;
// const response = await get(
//   `https://api.airtable.com/v0/bases/${base?.id}/webhooks/${webhook?.id}/payloads`,
//   {
//     headers: {
//       Authorization: `Bearer patq5WBfw3LkbO7eG.8e71aae98b9eafd6408a1625520645c81b458a7b535aafafa8e41d4eb937e6d7`,
//     },
//   }
// );
// // console.log(webhook?.id);
// const tables = await getTablesByBaseId(base?.id);
// let processingTable = [];
// let processingField = [];
// let processingRow = [];
// let lastProcessingPayload =
//   response?.data?.payloads[response?.data?.payloads?.length - 1];
// if (lastProcessingPayload.changedTablesById) {
//   processingTable = Object.keys(lastProcessingPayload.changedTablesById);
//   for (let i = 0; i < processingTable.length; i++) {
//     const tableId = processingTable[i] as string;
//     const table = await getTableById(tableId, tables);
//     // console.log(
//     //   lastProcessingPayload.changedTablesById[tableId],
//     //   lastProcessingPayload.changedTablesById[tableId]?.changedFieldsById,
//     //   lastProcessingPayload.changedTablesById[tableId]?.changedRecordsById[
//     //     'recXtUR4CL9h8e6Oz'
//     //   ]?.current
//     // );
//     if (
//       lastProcessingPayload.changedTablesById[tableId]?.changedRecordsById
//     ) {
//       processingRow = Object.keys(
//         lastProcessingPayload.changedTablesById[tableId]?.changedRecordsById
//       );
//       // console.log(
//       //   lastProcessingPayload.changedTablesById[tableId]?.changedRecordsById
//       // );
//       for (let j = 0; j < processingRow.length; j++) {
//         const rowId = processingRow[j] as string;
//         // const currentRowUpdateKeys = Object.keys(
//         //   lastProcessingPayload.changedTablesById[tableId]
//         //     ?.changedRecordsById[rowId]?.current
//         // );
//         console.log(
//           rowId,
//           lastProcessingPayload.changedTablesById[tableId]
//             ?.changedRecordsById[rowId]?.current
//         );
//         //.cellValuesByFieldId
//         // const currentRowUpdateValues = Object.values(
//         //   lastProcessingPayload.changedTablesById[processingTable[i]]
//         //     ?.changedRecordsById[processingRow[j]]?.current
//         //     ?.cellValuesByFieldId
//         // );
//         // console.log(currentRowUpdateKeys, currentRowUpdateValues);
//         // const field = await getTableFieldById(
//         //   processingField[j],
//         //   table[0]?.fields
//         // );
//         // console.log(field, 'field');
//       }
//     }
//   }
// }
// // // response?.data?.payloads[response?.data?.payloads?.length - 1]
// // //   ?.actionMetadata,
// // console.log(
// //   response?.data?.payloads[response?.data?.payloads?.length - 1]
// //     ?.changedTablesById['tblL7061v9hXxgUCJ'],
// //   response?.data?.payloads[response?.data?.payloads?.length - 1]
// //     ?.changedTablesById['tblL7061v9hXxgUCJ']?.changedRecordsById[
// //     'recXtUR4CL9h8e6Oz'
// //   ]?.current
// //   // response?.data?.payloads[response?.data?.payloads?.length - 1]
// //   //   ?.changedTablesById['tblL7061v9hXxgUCJ']?.changedRecordsById[
// //   //   'recXtUR4CL9h8e6Oz'
// //   // ]?.previous,
// //   // response?.data?.payloads[response?.data?.payloads?.length - 1]
// //   //   ?.changedTablesById['tblL7061v9hXxgUCJ']?.changedRecordsById[
// //   //   'recXtUR4CL9h8e6Oz'
// //   // ].unchanged
// // );
// res.status(200).send('ok');
// res
//   .status(200)
//   .json(apiUtils.buildSuccessResponse(registration_information));
