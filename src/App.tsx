import { useState, useEffect } from 'react';

// 1. EL CONTRATO DE DATOS (Acá brilla TypeScript)
// Le explicamos a la app qué forma tiene un producto de la API
interface Producto {
  id: number;
  title: string;
  price: number;
  image: string;
}

function App() {
  // 2. LA MEMORIA (Estado)
  // Creamos una variable 'productos' que arranca como un array vacío [].
  const [productos, setProductos] = useState<Producto[]>([]);

  // 3. LA CONEXIÓN (Efecto)
  // Esto se ejecuta una sola vez cuando la pantalla se carga
  useEffect(() => {
    fetch('https://fakestoreapi.com/products') // Llamamos a la API
      .then(respuesta => respuesta.json())     // Convertimos la respuesta a JSON
      .then(datos => {
        console.log("¡Datos recibidos!", datos); // Imprimimos en consola para chusmear
        setProductos(datos);                     // Guardamos los datos en la memoria
      });
  }, []);

  // 4. LA VISTA (Lo que ve el usuario)
return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Tienda Nube</h1>
      
      {/* Contenedor principal con CSS Grid para que se adapte a celulares y monitores */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '30px' 
      }}>
        
        {/* Recorremos los productos y armamos una "Tarjeta" por cada uno */}
        {productos.map(producto => (
          <div key={producto.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            
            <img 
              src={producto.image} 
              alt={producto.title} 
              style={{ width: '100%', height: '150px', objectFit: 'contain' }} 
            />
            
            <h3 style={{ fontSize: '16px', margin: '15px 0' }}>{producto.title}</h3>
            <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 15px 0' }}>${producto.price}</p>
            
            <button style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Comprar
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;