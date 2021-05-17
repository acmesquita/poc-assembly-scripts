(async () => {
  const importObject = {
    env: {
      abort(_msg, _file, line, column) {
        console.error("abort called at index.ts:" + line + ":" + column);
      }
    }
  };
  const module = await WebAssembly.instantiateStreaming(
    fetch("build/optimized.wasm"),
    importObject
  );
  const mult = module.instance.exports.mult;

  const result = document.querySelector("#result");
  document.querySelector("#prime-checker").addEventListener("submit", event => {
    event.preventDefault();
    result.innerText = "";
    const number1 = event.target.elements.number1.value;
    const number2 = event.target.elements.number2.value;
    result.innerText = `${number1} x ${number2} = ${mult(number1, number2)}`;
  });
})();