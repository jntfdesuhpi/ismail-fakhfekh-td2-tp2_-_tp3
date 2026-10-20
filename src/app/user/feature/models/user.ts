type Role = "Développeur" | "Designer" | "Chef de projet" | "Testeur";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}
