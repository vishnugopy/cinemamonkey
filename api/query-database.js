
import { notion } from './client';

export const queryDatabase = async () =>
  await notion.databases.query({
    database_id:"c1cde305e8664930b3971c144eaa3107" ?? '',
  });