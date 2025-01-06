import { useEffect, useState } from "react";

function Main() {
  const [item, setItem] = useState(['placeholder']);

 const addItem = e => {
    const input = document.querySelector('input[name="add-item"]');
    setItem([...item, input.value]);
    input.value = "";
 }
  
  

  useEffect(() => {
    fetch("http://localhost:8080/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item[item.length-1] }),
    }).then((response) => {
      if (response.ok) {
        console.log("items added");
        return response.json();
      }
    });
  }, [item]);

  return (
    <div>
      <h1>add to list</h1>
      <input type="text" name="add-item" placeholder="list item" />
      <button onClick={addItem}>add</button>
      <ul>
        {item.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
export default Main;
