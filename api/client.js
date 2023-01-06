
import { Client } from '@notionhq/client';

const NOTION_API_KEY = process.env.NOTION_API_KEY ?? '';

console.log(NOTION_API_KEY);

export const notion = new Client({ auth: "secret_OnBAmrotn3DIsTzq2uEjWzLS1ZFJimsckYBPd0N4oA2" });