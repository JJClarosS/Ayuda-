// src/components/admin/UserManagement.tsx
import { AlertCircle, Pencil, Plus, Search, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import userService from '@/services/userService';
import type { Rol, Usuario } from '../../types/api';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function UserManagement() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [selectedRole, setSelectedRole] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    id_rol: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, rolesData] = await Promise.all([
        userService.getAll(),
        userService.getRoles(),
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (!newUser.nombre || !newUser.email || !newUser.password || newUser.id_rol === 0) {
        setError('Por favor completa todos los campos obligatorios');
        return;
      }

      await userService.create({
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
        telefono: newUser.telefono,
        password: newUser.password,
        id_rol: newUser.id_rol,
      });
      
      await loadData();
      setIsDialogOpen(false);
      setNewUser({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        id_rol: 0,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear usuario');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      await userService.delete(id);
      setUsers(users.filter((u) => u.id_usuario !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar usuario');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.nombre.toLowerCase().includes(search.toLowerCase()) ||
       user.email.toLowerCase().includes(search.toLowerCase())) &&
      (selectedRole === 0 || user.id_rol === selectedRole)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground mb-2">Gestión de Usuarios</h2>
          <p className="text-muted-foreground">Administra usuarios y sus roles</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleCreate} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={newUser.nombre}
                    onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    value={newUser.apellido}
                    onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={newUser.telefono}
                    onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rol">Rol *</Label>
                  <Select 
                    value={newUser.id_rol.toString()} 
                    onValueChange={(value: string) => setNewUser({ ...newUser, id_rol: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.id_rol} value={r.id_rol.toString()}>
                          {r.nombre_rol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Crear Usuario
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{users.length}</div>
                <p className="text-muted-foreground text-sm">usuarios registrados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Usuarios Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">
                  {users.filter(u => u.activo).length}
                </div>
                <p className="text-muted-foreground text-sm">activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{roles.length}</div>
                <p className="text-muted-foreground text-sm">roles disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select 
              value={selectedRole.toString()} 
              onValueChange={(value: string) => setSelectedRole(parseInt(value))}
            >
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Todos los roles</SelectItem>
                {roles.map((r) => (
                  <SelectItem key={r.id_rol} value={r.id_rol.toString()}>
                    {r.nombre_rol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Usuarios ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-card-foreground">ID</TableHead>
                  <TableHead className="text-card-foreground">Nombre</TableHead>
                  <TableHead className="text-card-foreground">Email</TableHead>
                  <TableHead className="text-card-foreground">Teléfono</TableHead>
                  <TableHead className="text-card-foreground">Rol</TableHead>
                  <TableHead className="text-card-foreground">Estado</TableHead>
                  <TableHead className="text-card-foreground">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id_usuario} className="border-border">
                    <TableCell className="text-card-foreground">{u.id_usuario}</TableCell>
                    <TableCell className="text-card-foreground font-medium">
                      {u.nombre} {u.apellido}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell className="text-muted-foreground">{u.telefono || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {roles.find((r) => r.id_rol === u.id_rol)?.nombre_rol || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={u.activo ? 'default' : 'secondary'}
                        className={u.activo ? 'bg-green-600' : 'bg-gray-400'}
                      >
                        {u.activo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" title="Editar">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(u.id_usuario)}
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No se encontraron usuarios.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserManagement;