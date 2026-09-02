// tests/api.spec.ts
import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test('API Test - Succesvol inloggen via POST request', async ({ request }) => {
  // 1. Stuur rechtstreeks een POST-verzoek naar de inlog-API van Heroku
  const response = await request.post('https://herokuapp.com', {
    form: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    }
  });

  // 2. Assertie 1: Controleer of de server antwoordt met status 200 (OK)
  expect(response.status()).toBe(200);

  // 3. Assertie 2: Controleer of de tekst in het antwoord aangeeft dat we op de secure pagina zijn beland
  const responseText = await response.text();
  expect(responseText).toContain('Secure Area');
});

test('API Test - Foutmelding bij verkeerde gegevens via POST request', async ({ request }) => {
  // We sturen nu foute gegevens rechtstreeks naar de API
  const response = await request.post('https://the-internet.herokuapp.com', {
    form: {
      username: 'tomsmith',
      password: 'VerkeerdWachtwoord!'
    }
  });

  // De server geeft bij deze specifieke site nog steeds status 200 (omdat de pagina laadt), 
  // maar de inhoud moet de foutmelding bevatten!
  const responseText = await response.text();
  expect(responseText).toContain('Your password is invalid!');
});
