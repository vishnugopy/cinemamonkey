
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';


export const parseProperties = (database) =>
  database.results.map((row) => {
    const id = row.id;
    const titleCell = row.properties.Title.title;
    const title = titleCell?.[0].plain_text;
    return { id, title };
  });