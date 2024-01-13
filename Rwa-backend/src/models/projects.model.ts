import sql from '../utils/db';
import { PendingQuery, Row, RowList } from 'postgres';
import { DataBaseError } from '../utils/errors';

export class ProjectModel {
  static async createNewProject(
    columns: string[],
    project: any
  ): Promise<void> {
    try {
      await sql.begin(async (sql) => {
        await sql`INSERT INTO projects ${sql(project, columns)}`;
      });
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async findProjectById(
    id: string,
    columns: string[]
  ): Promise<RowList<Row[]> | any> {
    try {
      return await sql`SELECT ${sql(columns)} FROM projects WHERE id = ${id}`;
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async findAllProject(
    columns: string[]
  ): Promise<RowList<Row[]> | any> {
    try {
      return await sql`SELECT ${sql(columns)} FROM projects`;
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }
}
