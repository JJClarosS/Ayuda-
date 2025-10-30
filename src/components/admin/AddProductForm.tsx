// src/components/admin/AddProductForm.tsx
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

interface ProductSize {
  id_tamano: number;
  precio: string;
}

interface AddProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIAS = [
  { id: 1, nombre: 'Pizzas' },
  { id: 2, nombre: 'Bebidas' },
  { id: 3, nombre: 'Postres' },
];

const TAMANOS = [
  { id: 1, nombre: 'Personal', abreviatura: 'P' },
  { id: 2, nombre: 'Mediana', abreviatura: 'M' },
  { id: 3, nombre: 'Familiar', abreviatura: 'F' },
  { id: 4, nombre: 'Único', abreviatura: 'U' },
];

export function AddProductForm({ onSuccess, onCancel }: AddProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [imagenUrl, setImagenUrl] = useState('');
  const [disponible, setDisponible] = useState(true);
  
  // Prices for sizes
  const [sizes, setSizes] = useState<ProductSize[]>([
    { id_tamano: 1, precio: '' },
    { id_tamano: 2, precio: '' },
    { id_tamano: 3, precio: '' },
  ]);
  
  const [uniquePrice, setUniquePrice] = useState('');

  const isPizza = idCategoria === 1;
  const requiresMultipleSizes = isPizza;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validaciones
      if (!nombre || !idCategoria) {
        setError('Por favor completa todos los campos obligatorios');
        setLoading(false);
        return;
      }

      // Preparar payload
      const productData = {
        nombre,
        descripcion,
        id_categoria: idCategoria,
        imagen_url: imagenUrl || undefined,
        disponible,
        activo: true,
      };

      // Preparar tamaños
      let tamanosData;
      if (requiresMultipleSizes) {
        // Pizzas con múltiples tamaños
        tamanosData = sizes
          .filter(s => s.precio && parseFloat(s.precio) > 0)
          .map(s => ({
            id_tamano: s.id_tamano,
            precio: parseFloat(s.precio),
            disponible: true,
            activo: true,
          }));
        
        if (tamanosData.length === 0) {
          setError('Por favor ingresa al menos un precio para los tamaños');
          setLoading(false);
          return;
        }
      } else {
        // Bebidas y postres con tamaño único
        if (!uniquePrice || parseFloat(uniquePrice) <= 0) {
          setError('Por favor ingresa un precio válido');
          setLoading(false);
          return;
        }
        
        tamanosData = [{
          id_tamano: 4, // Tamaño "Único"
          precio: parseFloat(uniquePrice),
          disponible: true,
          activo: true,
        }];
      }

      // Importar y usar el servicio
      const { productosService } = await import('../../services/productosService');
      await productosService.createWithSizes(productData, tamanosData);

      onSuccess();
    } catch (err: any) {
      console.error('Error creating product:', err);
      setError(err.response?.data?.message || 'Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleSizePrice = (id_tamano: number, precio: string) => {
    setSizes(sizes.map(s => 
      s.id_tamano === id_tamano ? { ...s, precio } : s
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoría *</Label>
<Select 
  value={idCategoria?.toString()} 
  onValueChange={(value: string) => setIdCategoria(parseInt(value))}
>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIAS.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre del producto *</Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Pizza Margarita"
          required
        />
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe el producto..."
          rows={3}
        />
      </div>

      {/* URL de imagen */}
      <div className="space-y-2">
        <Label htmlFor="imagen">URL de la imagen</Label>
        <Input
          id="imagen"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          type="url"
        />
        {imagenUrl && (
          <div className="mt-2">
            <img 
              src={imagenUrl} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded border"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.jpg';
              }}
            />
          </div>
        )}
      </div>

      {/* Precios según categoría */}
      <div className="space-y-4">
        <Label>Precios *</Label>
        
        {requiresMultipleSizes ? (
          // Múltiples tamaños (Pizzas)
          <div className="space-y-3 border rounded-lg p-4 bg-muted/50">
            {sizes.map((size) => {
              const tamano = TAMANOS.find(t => t.id === size.id_tamano);
              return (
                <div key={size.id_tamano} className="flex items-center gap-3">
                  <Label className="w-24">{tamano?.nombre}</Label>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-muted-foreground">€</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={size.precio}
                      onChange={(e) => handleSizePrice(size.id_tamano, e.target.value)}
                      placeholder="0.00"
                      className="max-w-32"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Tamaño único (Bebidas y Postres)
          <div className="flex items-center gap-3">
            <Label>Precio</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">€</span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={uniquePrice}
                onChange={(e) => setUniquePrice(e.target.value)}
                placeholder="0.00"
                className="max-w-32"
                required
              />
            </div>
          </div>
        )}
      </div>

      {/* Disponible */}
      <div className="flex items-center justify-between">
        <Label htmlFor="disponible">¿Producto disponible?</Label>
        <Switch
          id="disponible"
          checked={disponible}
          onCheckedChange={setDisponible}
        />
      </div>

      {/* Botones */}
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
          {loading ? 'Creando...' : 'Crear Producto'}
        </Button>
      </div>
    </form>
  );
}