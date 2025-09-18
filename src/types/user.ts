export interface User {
  phone: string;
  name?: {
    first: string;
    last: string;
  };
  email?: string;
  picture?: string;
}
