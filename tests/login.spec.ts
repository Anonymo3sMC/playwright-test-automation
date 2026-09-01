// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage'; // Importeer de nieuwe pagina

test.use({ ignoreHTTPSErrors: true });

// We definiëren de variabelen bovenin zodat elke test erbij kan
let loginPage: LoginPage;
let securePage: SecurePage;

// STAP B: Dit blok runt AUTOMATISCH vóór elke test die hieronder staat
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  securePage = new SecurePage(page);
  
  // Elke test begint altijd op de loginpagina, dus dit automatiseren we hier
  await loginPage.navigateTo();
});

test('Succesvol inloggen en weer uitloggen', async ({ page }) => {
  // Inloggen via het LoginPage object
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');

  // STAP A: Uitloggen via het gloednieuwe SecurePage object!
  await securePage.logout();
  
  // Controleer of we na het uitloggen weer netjes op de login-pagina staan
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
});

test('Foutmelding bij verkeerd wachtwoord', async ({ page }) => {
  // Deze test start dankzij beforeEach ook automatisch op de juiste URL!
  await loginPage.login('tomsmith', 'VerkeerdWachtwoord!');

  const errorMessage = page.locator('#flash');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Your password is invalid!');
});
