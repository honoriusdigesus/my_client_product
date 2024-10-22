export interface UserResponse {
  userId:           number;
  fullName:         string;
  lastName:         string;
  email:            string;
  passwordHash:     string;
  identityDocument: string;
  roleId:           number;
  createdAt:        Date;
}
