# Uso do i18n

Esse é um guia de como usar o i18n e no final tem a explicação de **como ele está sendo usado na StArt**.

---
## Instalação
O primeiro passo para usar o i18n é instalar suas dependências com:
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```
Esse comando vai instalar: 
- i18next
- react-i18next
- i18next-browser-languagedetector

## Uso
Após ter instalado as dependências do i18n, para usá-lo, basta seguir esses passos:
- criar uma pasta chamada `i18n` com o arquivo de configuração `config.ts` e uma pasta `locales` com as pastas dos idiomas que estarão disponíveis no site 
- adicionar algum botão/menu para alterar o idioma com `i18n.changeLanguage(idioma)` (se ainda não existir)
- adicionar o namespace no arquivo `i18n/config.ts` (se ainda não existir)
- criar os arquivos de tradução em `locales/pt` e `locales/en` (ou adicionar informações novas aos arquivos já existentes)
- importar a hook `useTranslation()` no componente que você vai usar da seguinte forma:
  
  ```ts
  import { useTranslation } from "react-i18next";
  ```
- instanciar a varíavel `t` que trará as traduções do namespace da seguinte forma:

  ```ts
  const { t } = useTranslation(namespace);
  ```
- usar a tradução no componente com `t()`, dessa maneira:
  
  ```ts
  t("caminho.dentro.do.json")
  ```

---

## Configuração do i18n

Imaginando o caso hipotético em que eu só tenha a página xpto e eu vou configurar um namaspace para traduzir essa página para inglês e português.

### `src/i18n/config.ts`

```ts
import i18n from "i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";

import ptNamespace1 from "@/locales/pt/xpto/xpto.json";

import enNamespace1 from "@/locales/en/xpto/xpto.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        "xpto": ptNamespace1,
      },

      en: {
        "xpto": enNamespace1,
      },
    },

    fallbackLng: "en",

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

****Para a tradução dar certo é necessário que a chave dentro de resources.pt e resources.en deve ser a mesma para cada namespace que é exatamente o que acontece em:**

```ts
resources: {
  pt: {
    "xpto": ptNamespace1,
  },

  en: {
    "xpto": enNamespace1,
  },
}
```

Para cada novo arquivo de tradução criado, é necessário importá-lo e adicioná-lo nesse arquivo de configuração antes de usá-lo.

---

### Inicializando o i18n

Importe a configuração uma única vez no `main.tsx`.

```ts
import "./i18n/config";
```

---

## Alterando o Idioma

Deve haver algum botão ou menu para permitir a escolha de idiomas. 
O estilo/comportamento do botão não tem interferência na internacionalização.
O importante é usar o `i18n.changeLanguage()`

### Exemplo de uso para tradução entre português e inglês:

```ts
i18n.changeLanguage("pt");
```

```ts
i18n.changeLanguage("en");
```

---

## Arquivos de Tradução

### Usando o exemplo acima:

### `src/locales/pt/xpto/xpto.json`

```json
{
  "title": "Início",
  "description": "Esse é um uso básico do i18n"
}
```

---

### `src/locales/en/xpto/xpto.json`

```json
{
  "title": "Home",
  "description": "This is a basic use of i18n"
}
```

---

## Utilizando Traduções

```tsx
import { Text } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

export function Xpto() {
  const { t } = useTranslation("xpto");

  return (
    <>
      <Text>{t("title")}</Text>

      <Text>{t("description")}</Text>
    </>
  );
}
```

---

## Organização por Namespace

Cada arquivo JSON de tradução é um namespace e deve ser configurado em `i18n/config.ts`.
Ao invés de criar um arquivo de tradução para cada página, prefira organizar as traduções por domínio.
Por exemplo, nesse projeto há 3 domínios, são eles: home, section1 e section2, e 5 páginas, são elas: home, section1/pageA, section1/pageB, section2/pageA e section2/pageB 

Desse modo, para traduzir as páginas A e B da Seção 1, por exemplo, a arquitetura de pastas ao invés de ficar assim:

```txt
locales/pt/Sections/section1/pageA.json
locales/en/Sections/section1/pageA.json
locales/pt/Sections/section1/pageB.json
locales/en/Sections/section1/pageB.json
```

Fica assim:

```txt
locales/pt/Sections/section1.json
locales/en/Sections/section1.json
```

E as traduções para pageA e pageB ficam dentro do JSON section1
Isso evita fragmentação excessiva, criação de diversos arquivos de tradução para traduzir cada uma das páginas e configuração de diversos namespaces.

### Exemplo do Namespace section1

#### `src/locales/pt/Sections/section1.json`

```json
{
  "pageA": {
    "title": "Esse é a Página A da Seção 1",
    "description": "A tradução dessa página não é um arquivo separado, é apenas parte do arquivo de tradução da Seção 1, a outra parte é a tradução da Página B dessa mesma Seção. Como as Páginas A e B estão no domínio da Seção 1, a tradução dessas duas páginas ficam no mesmo arquivo"
  },
  "pageB": {
    "title": "Esse é a Página B da Seção 1",
    "description": "A tradução dessa página não é um arquivo separado, é apenas parte do arquivo de tradução da Seção 1, a outra parte é a tradução da Página A dessa mesma Seção. Como as Páginas A e B estão no domínio da Seção 1, a tradução dessas duas páginas ficam no mesmo arquivo"
  }
}
```

---

## Acessando Chaves Aninhadas

Vendo o exemplo de namespace acima (`src/locales/pt/Sections/section1.json`), é possível notar que há chaves aninhadas. Para acessá-las, basta usar a notação de objetos em JavaScript, por exemplo:

```js
objeto: {
  objetoDentroDoObjeto: {
    objetoDentroDoObjetoDentroDoObjeto: {
      chave: "xyz"
    }
  }
}
```

Para acessar a chave eu preciso fazer `objeto.objetoDentroDoObjeto.objetoDentroDoObjetoDentroDoObjeto.chave`, então para usar o título da Página A, por exemplo, do JSON de tradução, seria preciso fazer:

```tsx
// Chama o namespace "sections/section1"
const { t } = useTranslation("sections/section1");
...
<Text>{t("pageA.title")}</Text>
...
```
