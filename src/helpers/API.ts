export const BASE_URL = 'https://reqres.in';

interface UserData {
  email: string;
  password: string;
}

export async function register(values: UserData) {
  try {
    const token = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    return await token.json();
  } catch (error) {
    if (error) {
      throw new Error();
    }
  }
}
