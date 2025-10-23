import { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pizzas');
        setPizzas(response.data);
      } catch (error) {
        console.error('Error al cargar pizzas:', error);
      }
    };
    fetchPizzas();
  }, []);

  return (
    <div>
      <h1>Menú de Pizzería</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id_pizza}>
            {pizza.nombre} - ${pizza.precio} ({pizza.tamanio})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;