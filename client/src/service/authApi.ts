import requestClient from './requestClient';

export async function loginRequest(email: string, password: string): Promise<any> {
  return requestClient('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function registrationRequest(username: string, email: string, password: string): Promise<any> {
  return requestClient('/auth/register', {
    method: 'POST',
    body: { username, email, password },
  });
}
