// tests/api.spec.ts
import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test('API Test - Succesvol inloggen via POST request', async ({ request }) => {
  const response = await request.post('https://herokuapp.com', {
    form: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    }
  });

  expect(response.ok()).toBeTruthy();

  const responseText = await response.text();
  expect(responseText).toContain('Secure Area');
});

test('API Test - Foutmelding bij verkeerde gegevens via POST request', async ({ request }) => {
  const response = await request.post('https://herokuapp.com', {
    form: {
      username: 'tomsmith',
      password: 'VerkeerdWachtwoord!'
    }
  });

  expect(response.ok()).toBeTruthy();

  const responseText = await response.text();
  expect(responseText).toContain('Your password is invalid!');
});
