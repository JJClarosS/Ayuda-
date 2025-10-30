// src/components/admin/Inventory.tsx
import { AlertTriangle, Package, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { inventarioService } from '@/services/inventarioService';
import type { InventarioAlmacen, StockCritico } from '../../types/api';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { AddIngredientForm } from './AddIngredientForm';

export function Inventory() {
  const [inventarios, setInventarios] = useState<InventarioAlmacen[]>([]);
  const [stockCritico, setStockCritico] = useState<StockCritico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const [inventariosData, stockCriticoData] = await Promise.all([
        inventarioService.getAllInventarios(),
        inventarioService.getStockCritico(),
      ]);
      setInventarios(inventariosData);
      setStockCritico(stockCriticoData);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando inventario...</p>
        </div>
      </div>
    );
  }

  const lowStockCount = stockCritico.length;
  const totalItems = inventarios.length;
  const optimalStockCount = totalItems - lowStockCount;

  return (
    <div className="p-8 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground mb-2">Gestión de Inventario</h2>
          <p className="text-muted-foreground">Control de ingredientes y stock</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Ingrediente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Ingrediente</DialogTitle>
            </DialogHeader>
            <AddIngredientForm 
              onSuccess={() => {
                setIsDialogOpen(false);
                loadInventory();
              }}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Alertas de Stock Crítico */}
      {stockCritico.length > 0 && (
        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Alertas de Stock Crítico ({stockCritico.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stockCritico.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div>
                    <p className="text-red-900 font-semibold">{item.ingrediente}</p>
                    <p className="text-red-600 text-sm">
                      {item.almacen} - Stock: {Number(item.stock_actual).toFixed(2)}{item.unidad_medida} 
                      (Mínimo: {Number(item.stock_minimo).toFixed(2)}{item.unidad_medida})
                    </p>
                    <p className="text-red-500 text-xs">Proveedor: {item.proveedor}</p>
                  </div>
                  <Badge variant="destructive">
                    {Number(item.porcentaje_faltante).toFixed(0)}% bajo
                  </Badge>
                </div>
              ))}
              {stockCritico.length > 5 && (
                <p className="text-center text-sm text-muted-foreground pt-2">
                  Y {stockCritico.length - 5} ingredientes más...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{totalItems}</div>
                <p className="text-muted-foreground text-sm">ingredientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Stock Crítico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{lowStockCount}</div>
                <p className="text-muted-foreground text-sm">requieren atención</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Stock Óptimo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-3xl font-bold text-card-foreground">{optimalStockCount}</div>
                <p className="text-muted-foreground text-sm">en buen estado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Inventario */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Inventario Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-card-foreground">Almacén</TableHead>
                  <TableHead className="text-card-foreground">Ingrediente</TableHead>
                  <TableHead className="text-card-foreground">Stock Actual</TableHead>
                  <TableHead className="text-card-foreground">Stock Mínimo</TableHead>
                  <TableHead className="text-card-foreground">Nivel</TableHead>
                  <TableHead className="text-card-foreground">Proveedor</TableHead>
                  <TableHead className="text-card-foreground">Última Actualización</TableHead>
                  <TableHead className="text-card-foreground">Estado</TableHead>
                  <TableHead className="text-card-foreground">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventarios.map((item) => {
                  const stockPercentage = (Number(item.stock_actual) / Number(item.ingredientes.stock_minimo)) * 100;
                  const isLowStock = Number(item.stock_actual) < Number(item.ingredientes.stock_minimo);

                  return (
                    <TableRow key={item.id_inventario} className="border-border">
                      <TableCell className="text-card-foreground font-medium">
                        {item.almacenes.nombre}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {item.ingredientes.nombre}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {Number(item.stock_actual).toFixed(2)} {item.ingredientes.unidad_medida}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {Number(item.ingredientes.stock_minimo).toFixed(2)} {item.ingredientes.unidad_medida}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 w-32">
                          <Progress 
                            value={Math.min(stockPercentage, 100)} 
                            className="h-2"
                          />
                          <p className="text-xs text-muted-foreground">{stockPercentage.toFixed(0)}%</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.ingredientes.proveedor}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(item.fecha_actualizacion).toLocaleDateString('es-ES')}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={
                            isLowStock
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : stockPercentage < 150
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : 'bg-green-100 text-green-800 border-green-200'
                          }
                        >
                          {isLowStock ? 'Crítico' : stockPercentage < 150 ? 'Bajo' : 'Óptimo'}
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
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}