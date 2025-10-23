export const jwtConstants = {
  // ATENCIÓN: En un entorno de producción, esta clave debe cargarse desde variables de entorno.
  secret: 'TPSPIZZERIA',
  // 1 hora de expiración para el token de acceso
  expiresIn: '3600s', 
};

// Enum para roles, basado en el campo 'nombre_rol' de tu tabla 'roles'
export enum Role {
  Admin = 'Administrador',
  Manager = 'Gerente',
  Employee = 'Cajero',
  Chef = 'Cocinero',
  Client = 'Cliente',
}
