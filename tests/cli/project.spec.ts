import { test } from '@playwright/test';
import { prepareEnvironment } from '@shimkiv/cli-testing-library';
import crypto from 'node:crypto';
import { generateProject } from '../utils/cli-utils.mjs';
import { Constants } from '../utils/common-utils.mjs';
import { checkProjectGenerationResults } from '../utils/validation-utils.mjs';

test.describe('zkApp-CLI', () => {
  // Tests for project generation of each UI type
  for (const uiType of Constants.uiTypes) {
    test(`should generate zkApp project with ${uiType.toUpperCase()} UI type, @parallel @smoke @project @${uiType}-ui`, async () => {
      for (const skipUiTypeSelection of Constants.skipUiTypeSelectionOptions) {
        await test.step(`Project generation and results validation ("skipUiTypeSelection=${skipUiTypeSelection}")`, async () => {
          const projectName = crypto.randomUUID();
          const { spawn, cleanup, path } = await prepareEnvironment();
          console.info(`[Test Execution] Path: ${path}`);

          try {
            let { exitCode, stdOut } = await generateProject(
              projectName,
              uiType,
              skipUiTypeSelection,
              spawn
            );
            checkProjectGenerationResults(exitCode, stdOut);
          } finally {
            await cleanup();
          }
        });
      }
    });
  }
});
