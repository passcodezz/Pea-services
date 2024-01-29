declare namespace Profile {
  type Request = {
    username: string;
    password: string;
  };
  type Response = {
    data: Data;
  };

  export interface Data {
    id: number;
    role: number;
    department_name: string;
    email: string;
  }
}