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

  expect(response.status()).toBe(200);

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

  const responseText = await response.text();
  
  // PROFESSIONAL DEBUGGING: Print de exacte HTML-body in de console-logs
  console.log("=== DEBUG: START BACKEND RESPONSE ===");
  console.log(responseText);
  console.log("=== DEBUG: END BACKEND RESPONSE ===");

  //expect(errorMessage).toBeVisible(); // Dit kan weg, we focussen op de tekst
  expect(responseText).toContain('Your password is invalid!');
});
