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

  // Een succesvolle inlog geeft vaak een 200 of een 302 redirect naar het dashboard
  expect([200, 302]).toContain(response.status());

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

  // TI-FIX: De server stuurt bij een fout een 302 redirect terug naar de loginpagina!
  // We controleren hier specifiek of de status 200 óf 302 is.
  expect([200, 302]).toContain(response.status());

  const responseText = await response.text();
  expect(responseText).toContain('Your password is invalid!');
});
