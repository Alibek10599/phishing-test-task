export interface RequestOptions extends RequestInit {
    body?: any;
  }
  
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  async function requestClient(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const { body, ...customOptions } = options;
  
    const token = localStorage.getItem('token');

    const headers = new Headers({
        'Content-Type': 'application/json',
      });
      
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }

    const config: RequestInit = {
      ...customOptions,
      headers,
      credentials: 'include',
    };
  
    if (body) {
      config.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error during fetching ${endpoint}:`, error);
      throw error;
    }
  }
  
  export default requestClient;
  