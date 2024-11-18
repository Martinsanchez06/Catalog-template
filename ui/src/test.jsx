import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Datos simulados
const items = ['Manzana', 'Banana', 'Cereza', 'Dátil', 'Elderberry', 'Fresa', 'Uva'];

function Test() {
  const [query, setQuery] = useState('');

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    console.log(`La consulta ha cambiado a: ${query}`);
  }, [query]);

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Buscar..." />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
