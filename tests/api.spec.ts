// tests/api.spec.ts
import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test('API Test - Succesvol inloggen via POST request', async ({ request }) => {
  const response = await request.post('https://the-internet.herokuapp.com/login', {
    form: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    }
  });

  // PROFESSIONAL FIX: Controleer correct of de statuscode in de array [200, 302] zit
  expect([200, 302]).toContain(response.status());

  const responseText = await response.text();
  expect(responseText).toContain('Secure Area');
});

test('API Test - Foutmelding bij verkeerde gegevens via POST request', async ({ request }) => {
  const response = await request.post('https://the-internet.herokuapp.com/login', {
    form: {
      username: 'tomsmith',
      password: 'VerkeerdWachtwoord!'
    }
  });

  // PROFESSIONAL FIX: Controleer correct of de statuscode in de array [200, 302] zit
  expect([200, 302]).toContain(response.status());

  const responseText = await response.text();
  expect(responseText).toContain('Your password is invalid!');
});
