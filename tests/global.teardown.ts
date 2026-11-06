import { rm } from 'node:fs/promises'; //deletes the auth file 
import { resolve } from 'node:path'; //builds the path to the file 
import { test as teardown } from '@playwright/test';

const memberAuthFile = resolve(process.cwd(), 'playwright/.auth/member.json');
const adminAuthFile = resolve(process.cwd(), 'playwright/.auth/admin.json');

teardown('remove member authentication state', async () => {
  await rm(memberAuthFile, { force: true });
});

teardown ('remove admin authenticaiton state', async () => {
    await rm(adminAuthFile, { force: true });
});
