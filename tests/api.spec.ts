// tests/api.spec.ts
import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test('API Test - Succesvol inloggen via POST request', async ({ request }) => {
  const response = await request.post('https://the-internet.herokuapp.com/login', {
    form: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    },
    maxRedirects: 0 // TI-FIX: Volg de redirect niet! Pak direct de statuscode.
  });

  // Een succesvolle inlog stuurt je direct door (HTTP 302) naar de beveiligde pagina
  expect(response.status()).toBe(302);
  
  // Controleer of de server in de headers aangeeft dat hij je naar /secure stuurt
  expect(response.headers().location).toContain('/secure');
});

test('API Test - Foutmelding bij verkeerde gegevens via POST request', async ({ request }) => {
  const response = await request.post('https://the-internet.herokuapp.com/login', {
    form: {
      username: 'tomsmith',
      password: 'VerkeerdWachtwoord!'
    },
    maxRedirects: 0 // TI-FIX: Volg de redirect niet!
  });

  // Een mislukte inlog stuurt je direct door (HTTP 302) terug naar de login-pagina
  expect(response.status()).toBe(302);
  
  // Controleer of de server je terugstuurt naar de login-pagina
  expect(response.headers().location).toContain('/login');
});
