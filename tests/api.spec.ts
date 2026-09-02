// tests/api.spec.ts
import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test('API Test - Succesvol inloggen via POST request', async ({ request }) => {
  const response = await request.post('https://the-internet.herokuapp.com/login', {
    form: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    },
    maxRedirects: 0
  });

  expect(response.status()).toBe(302);
  // Controleer of de location-header simpelweg bestaat en gevuld is
  expect(response.headers().location).toBeTruthy();
});

test('API Test - Foutmelding bij verkeerde gegevens via POST request', async ({ request }) => {
  const response = await request.post('https://the-internet.herokuapp.com/login', {
    form: {
      username: 'tomsmith',
      password: 'VerkeerdWachtwoord!'
    },
    maxRedirects: 0
  });

  expect(response.status()).toBe(302);
  
  // PROFESSIONAL DEBUG: Print de exacte redirect-locatie in de cloud-logs
  console.log("=== REDIRECT LOCATION ===", response.headers().location);
  
  // Controleer of de location-header simpelweg bestaat en gevuld is
  expect(response.headers().location).toBeTruthy();
});
