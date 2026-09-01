// pages/SecurePage.ts
import { Page, Locator } from '@playwright/test';

export class SecurePage {
  private readonly page: Page;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // De logout-knop op de secure pagina heeft een klasse '.button' en een 'secondary' subklasse
    this.logoutButton = page.locator('a.button.secondary');
  }

  async logout() {
    await this.logoutButton.click();
  }
}
