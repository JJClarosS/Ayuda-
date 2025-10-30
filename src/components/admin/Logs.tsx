// src/components/admin/Logs.tsx
import { Activity, Filter, Search, ShoppingBag, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { logsService } from '../../services/logsService';
import type { HistorialAccion, HistorialCliente, SesionUsuario } from '../../types/api';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Logs() {
  const [sesiones, setSesiones] = useState<SesionUsuario[]>([]);
  const [historialAcciones, setHistorialAcciones] = useState<HistorialAccion[]>([]);
  const [historialClientes, setHistorialClientes] = useState<HistorialCliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccion, setFilterAccion] = useState<string>('all');
  const [filterTipoActividad, setFilterTipoActividad] = useState<string>('all');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const [sesionesData, accionesData, clientesData] = await Promise.all([
        logsService.getAllSesiones(),
        logsService.getHistorialAcciones(),
        logsService.getHistorialClientes(),
      ]);
      setSesiones(sesionesData);
      setHistorialAcciones(accionesData);
      setHistorialClientes(clientesData);
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Estadísticas
  const sesionesActivas = sesiones.filter(s => s.activa).length;
  const totalAcciones = historialAcciones.length;
  const actividadesClientes = historialClientes.length;

  // Filtros aplicados
  const filteredAcciones = historialAcciones.filter(accion => {
    const matchSearch = searchTerm === '' || 
      accion.usuarios.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accion.usuarios.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accion.tabla_afectada.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchFilter = filterAccion === 'all' || accion.accion === filterAccion;
    
    return matchSearch && matchFilter;
  });

  const filteredClientes = historialClientes.filter(actividad => {
    const matchSearch = searchTerm === '' || 
      actividad.clientes.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (actividad.clientes.email && actividad.clientes.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchFilter = filterTipoActividad === 'all' || actividad.tipo_actividad === filterTipoActividad;
    
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando logs del sistema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 bg-background">
      <div>
        <h2 className="text-3xl font-bold text-card-foreground mb-2">Logs del Sistema</h2>
        <p className="text-muted-foreground">Monitoreo de actividad y sesiones de usuarios</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Sesiones Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{sesionesActivas}</div>
                <p className="text-muted-foreground text-sm">usuarios conectados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Acciones Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{totalAcciones}</div>
                <p className="text-muted-foreground text-sm">acciones del sistema</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Actividad de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{actividadesClientes}</div>
                <p className="text-muted-foreground text-sm">actividades registradas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sesiones" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="sesiones">Sesiones de Usuario</TabsTrigger>
          <TabsTrigger value="acciones">Historial de Acciones</TabsTrigger>
          <TabsTrigger value="clientes">Actividad de Clientes</TabsTrigger>
        </TabsList>

        {/* Tab: Sesiones */}
        <TabsContent value="sesiones" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Sesiones de Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-card-foreground">Usuario</TableHead>
                      <TableHead className="text-card-foreground">Email</TableHead>
                      <TableHead className="text-card-foreground">Inicio de Sesión</TableHead>
                      <TableHead className="text-card-foreground">Fin de Sesión</TableHead>
                      <TableHead className="text-card-foreground">IP</TableHead>
                      <TableHead className="text-card-foreground">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sesiones.map((sesion) => (
                      <TableRow key={sesion.id_sesion} className="border-border">
                        <TableCell className="text-card-foreground font-medium">
                          {sesion.usuarios.nombre} {sesion.usuarios.apellido}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {sesion.usuarios.email}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(sesion.fecha_inicio).toLocaleString('es-ES')}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {sesion.activa ? '-' : new Date(sesion.fecha_fin).toLocaleString('es-ES')}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {sesion.ip_address || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={sesion.activa ? 'default' : 'secondary'}
                            className={sesion.activa ? 'bg-green-600' : 'bg-gray-400'}
                          >
                            {sesion.activa ? 'Activa' : 'Cerrada'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Historial de Acciones */}
        <TabsContent value="acciones" className="space-y-4">
          {/* Filtros */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por usuario, email o tabla..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterAccion} onValueChange={(value: string) => setFilterAccion(value)}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por acción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las acciones</SelectItem>
                    <SelectItem value="INSERT">INSERT</SelectItem>
                    <SelectItem value="UPDATE">UPDATE</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="SELECT">SELECT</SelectItem>
                    <SelectItem value="LOGIN">LOGIN</SelectItem>
                    <SelectItem value="LOGOUT">LOGOUT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Historial de Acciones ({filteredAcciones.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-card-foreground">Usuario</TableHead>
                      <TableHead className="text-card-foreground">Acción</TableHead>
                      <TableHead className="text-card-foreground">Tabla</TableHead>
                      <TableHead className="text-card-foreground">Descripción</TableHead>
                      <TableHead className="text-card-foreground">Fecha</TableHead>
                      <TableHead className="text-card-foreground">IP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAcciones.map((accion) => (
                      <TableRow key={accion.id_historial} className="border-border">
                        <TableCell className="text-card-foreground font-medium">
                          {accion.usuarios.nombre} {accion.usuarios.apellido}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            className={
                              accion.accion === 'INSERT' ? 'bg-green-100 text-green-800' :
                              accion.accion === 'UPDATE' ? 'bg-blue-100 text-blue-800' :
                              accion.accion === 'DELETE' ? 'bg-red-100 text-red-800' :
                              accion.accion === 'LOGIN' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {accion.accion}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {accion.tabla_afectada}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-md truncate">
                          {accion.descripcion || '-'}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(accion.fecha_accion).toLocaleString('es-ES')}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {accion.ip_address || 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Actividad de Clientes */}
        <TabsContent value="clientes" className="space-y-4">
          {/* Filtros */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterTipoActividad} onValueChange={(value: string) => setFilterTipoActividad(value)}>
                  <SelectTrigger className="w-56">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las actividades</SelectItem>
                    <SelectItem value="Pedido Creado">Pedido Creado</SelectItem>
                    <SelectItem value="Pedido Cancelado">Pedido Cancelado</SelectItem>
                    <SelectItem value="Pago Realizado">Pago Realizado</SelectItem>
                    <SelectItem value="Comentario">Comentario</SelectItem>
                    <SelectItem value="Login">Login</SelectItem>
                    <SelectItem value="Registro">Registro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Actividad de Clientes ({filteredClientes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-card-foreground">Cliente</TableHead>
                      <TableHead className="text-card-foreground">Tipo de Actividad</TableHead>
                      <TableHead className="text-card-foreground">Descripción</TableHead>
                      <TableHead className="text-card-foreground">Fecha</TableHead>
                      <TableHead className="text-card-foreground">Dispositivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.map((actividad) => (
                      <TableRow key={actividad.id_historial_cliente} className="border-border">
                        <TableCell className="text-card-foreground font-medium">
                          {actividad.clientes.nombre} {actividad.clientes.apellido || ''}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            {actividad.tipo_actividad}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-md truncate">
                          {actividad.descripcion}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(actividad.fecha_actividad).toLocaleString('es-ES')}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {actividad.dispositivo || 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}