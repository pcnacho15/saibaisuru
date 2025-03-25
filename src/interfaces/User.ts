export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  password: string;
  role: string;
  image?: string | null;
}
