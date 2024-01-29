declare namespace Authen {
  type Request = {
    email: string;
    password: string;
  };
  export interface Response {
    data: Data;
  }
  export interface Data {
    status: string;
    message: string;
    access_token: string;
    id: number;
    role: number;
    department_name: string;
    email: string;
  }
}