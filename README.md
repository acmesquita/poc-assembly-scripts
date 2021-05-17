## POC AssemblyScript

Essa POC tem o objetivo de validar o funcionamento da ferramenta AssemblyScript e validar o uso efetivo.

## Cenários de validações

Nessa sessão seram colocados os cenários que essa POC estará validando.

### Cenário 1: Comunicação entre html e carregar um modulo criado pelo AssemblyScript

Criar uma função de adicionar e multiplicar no arquivo `assembly/index.ts` e utilizar dentro da página index.html

**Processo**

1. Foi criado um formulário no arquivo `index.html` que recebe dois números e ao submeter, a `div#result` é preenchida com o resultado
2. Criamos um arquivo `demo.js` que irá concentrar as importações e manupular os número enviados pelo formulário.
2.1. Dentro de uma função assíncrona foi feito a importação do WebAssembly para o arquivo, possibilitando ter acesso aos métodos criados na pasta `assembly`

```js
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
```

2.2. Em seguida, foi atribuida a uma constante a função exportada `mult`

```js
  const mult = module.instance.exports.mult;
```

2.3. Com a função armazenada, basta buscar as informações da submissão do formulário e utilizar a função.

```js
  const result = document.querySelector("#result");
  document.querySelector("#form").addEventListener("submit", event => {
    event.preventDefault();
    result.innerText = "";
    const number1 = event.target.elements.number1.value;
    const number2 = event.target.elements.number2.value;
    result.innerText = `${number1} x ${number2} = ${mult(number1, number2)}`;
  });
```