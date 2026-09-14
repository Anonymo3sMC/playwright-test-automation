import { test, expect } from '@playwright/test';

test('API responds controleren', async ({ request }) => {
    const response = await request.post('https://the-internet.herokuapp.com/authenticate', {
        form: {
            username: 'tomsmith',
            password: 'VerkeerdWachtwoord!'
        },
        maxRedirects: 0
    });

    console.log('STATUS:', response.status());
    console.log('URL:', response.url());

    const body = await response.text();
    console.log('BODY:', body);

    expect(response.status()).toBe(302);
    expect(body).toContain('Your password is invalid!');
});