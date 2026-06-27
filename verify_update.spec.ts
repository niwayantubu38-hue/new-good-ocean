import { test, expect } from '@playwright/test';

test('Verify Mission Response Modal and Status Update', async ({ page }) => {
  await page.goto('http://localhost:3000/Vanguard_Marine_Logistics_Official_(dibuatolehNiwayanTubuAliyaMahira).html');

  // Wait for the mission intelligence to appear
  await page.waitForSelector('#mission-intel', { state: 'visible', timeout: 15000 });

  // Click on EKSEKUSI RESPON LAPANGAN
  await page.click('button:has-text("EKSEKUSI RESPON LAPANGAN")');

  // Check for the new fields in the modal
  await expect(page.locator('#vesselId')).toBeVisible();
  await expect(page.locator('#commanderName')).toBeVisible();
  await expect(page.locator('#etaTime')).toBeVisible();

  // Submit the action
  await page.click('button:has-text("Kirim Permintaan Aksi")');

  // Verify status update in Intelligence Panel
  const statusEl = page.locator('#intel-status');
  await expect(statusEl).toHaveText('SEDANG DIEKSEKUSI...');
  await expect(statusEl).toHaveClass(/animate-pulse/);

  // Take a screenshot of the active execution
  await page.screenshot({ path: '/home/jules/verification/active_execution.png' });

  // Wait for success status
  await expect(statusEl).toHaveText('OPERASI SUKSES', { timeout: 10000 });
  await page.screenshot({ path: '/home/jules/verification/success_execution.png' });
});
