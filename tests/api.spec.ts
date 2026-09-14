test('API - verkeerde login geeft redirect', async ({ request }) => {
    const response = await request.post(
        'https://the-internet.herokuapp.com/authenticate',
        {
            form: {
                username: 'tomsmith',
                password: 'VerkeerdWachtwoord!'
            },
            maxRedirects: 0
        }
    );

    expect(response.status()).toBe(303);

    expect(response.headers().location).toBe(
        'https://the-internet.herokuapp.com/login'
    );
});