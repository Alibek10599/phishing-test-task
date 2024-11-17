import requestClient from "./requestClient";

export async function getPhishingAttempts(): Promise<any> {
    return requestClient('/phishing/attempts', {
      method: 'GET',
    });
  }

  export async function sendPhishingEmail(email:string) {
    return requestClient('/phishing/send', {
        method: 'POST',
        body: {
            email
        }
      });
  }