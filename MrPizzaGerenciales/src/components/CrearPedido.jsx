import { useState } from 'react';
import axios from 'axios';

function CrearPedido() {
  const [formData, setFormData] = useState({
    id_cliente: '',
    tipo_entrega: 'Delivery',
    direccion_entrega: '',
    pizzas: [{ id_pizza: '', cantidad: 1, precio_unitario: 0 }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePizzaChange = (index, field, value) => {
    const newPizzas = [...formData.pizzas];
    newPizzas[index][field] = value;
    setFormData({ ...formData, pizzas: newPizzas });
  };

  const agregarPizza = () => {
    setFormData({
      ...formData,
      pizzas: [...formData.pizzas, { id_pizza: '', cantidad: 1, precio_unitario: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pedido = {
        id_cliente: formData.id_cliente,
        id_usuario: 1, // Ejemplo: usuario autenticado
        tipo_entrega: formData.tipo_entrega,
        direccion_entrega: formData.direccion_entrega,
        detalle_pedidos: formData.pizzas,
      };
      const response = await axios.post('http://localhost:3000/pedidos', pedido);
      alert('Pedido creado con ID: ' + response.data.id_pedido);
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || 'No se pudo crear el pedido'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Pedido</h2>
      <div>
        <label>ID Cliente:</label>
        <input
          type="number"
          name="id_cliente"
          value={formData.id_cliente}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tipo de Entrega:</label>
        <select name="tipo_entrega" value={formData.tipo_entrega} onChange={handleChange}>
          <option value="Delivery">Delivery</option>
          <option value="Recojo en Tienda">Recojo en Tienda</option>
        </select>
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          name="direccion_entrega"
          value={formData.direccion_entrega}
          onChange={handleChange}
        />
      </div>
      <h3>Pizzas</h3>
      {formData.pizzas.map((pizza, index) => (
        <div key={index}>
          <label>ID Pizza:</label>
          <input
            type="number"
            value={pizza.id_pizza}
            onChange={(e) => handlePizzaChange(index, 'id_pizza', e.target.value)}
          />
          <label>Cantidad:</label>
          <input
            type="number"
            value={pizza.cantidad}
            onChange={(e) => handlePizzaChange(index, 'cantidad', e.target.value)}
          />
          <label>Precio Unitario:</label>
          <input
            type="number"
            value={pizza.precio_unitario}
            onChange={(e) => handlePizzaChange(index, 'precio_unitario', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={agregarPizza}>Agregar otra pizza</button>
      <button type="submit">Crear Pedido</button>
    </form>
  );
}

export default CrearPedido;