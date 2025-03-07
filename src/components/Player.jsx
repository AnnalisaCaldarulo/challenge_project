import { useState, useRef } from "react";
export default function Player() {
  const [name, setName] = useState('');

  const input = useRef();
  function handleClicked() {
    setName(input.current.value)
    input.current.value = '';
  }
  return (
    <section id="player">
      <h2>Welcome
        {name ? ` ${name}` : ' unknown entity'}
      </h2>
      <p>
        <input ref={input} type="text" />
        <button onClick={handleClicked}>Set Name</button>
      </p>
    </section>
  );
}
