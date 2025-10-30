// src/components/admin/AddIngredientForm.tsx
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AddIngredientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const UNIDADES_MEDIDA = [
  'kg',
  'g',
  'l',
  'ml',
  'unidades',
  'paquete',
  'caja',
];

export function AddIngredientForm({ onSuccess, onCancel }: AddIngredientFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [nombre, setNombre] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [costoUnitario, setCostoUnitario] = useState('');
  const [proveedor, setProveedor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!nombre || !unidadMedida || !stockMinimo || !costoUnitario || !proveedor) {
        setError('Por favor completa todos los campos');
        setLoading(false);
        return;
      }

      const data = {
        nombre,
        unidad_medida: unidadMedida,
        stock_minimo: parseFloat(stockMinimo),
        costo_unitario: parseFloat(costoUnitario),
        proveedor,
        activo: true,
      };

      const { inventarioService } = await import('@/services/inventarioService');
      await inventarioService.createIngrediente(data);

      onSuccess();
    } catch (err: any) {
      console.error('Error creating ingredient:', err);
      setError(err.response?.data?.message || 'Error al crear el ingrediente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre del ingrediente *</Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Harina de trigo"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unidad">Unidad de medida *</Label>
        <Select value={unidadMedida} onValueChange={(value: string) => setUnidadMedida(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una unidad" />
          </SelectTrigger>
          <SelectContent>
            {UNIDADES_MEDIDA.map((unidad) => (
              <SelectItem key={unidad} value={unidad}>
                {unidad}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stockMinimo">Stock mínimo *</Label>
          <Input
            id="stockMinimo"
            type="number"
            step="0.01"
            min="0"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="costoUnitario">Costo unitario (€) *</Label>
          <Input
            id="costoUnitario"
            type="number"
            step="0.01"
            min="0"
            value={costoUnitario}
            onChange={(e) => setCostoUnitario(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="proveedor">Proveedor *</Label>
        <Input
          id="proveedor"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          placeholder="Nombre del proveedor"
          required
        />
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          className="bg-orange-600 hover:bg-orange-700"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Ingrediente'}
        </Button>
      </div>
    </form>
  );
}