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

Imaginando o caso hipotético em que eu só tenha a página xpto e eu vou configurar um namespace para traduzir essa página para inglês e português.

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

`fallbackLng` define qual idioma será utilizado caso a tradução procurada não exista.
`escapeValue: false` evita escaping desnecessário de caracteres, já que o React já protege contra XSS automaticamente.
****Para a tradução funcionar corretamente, a chave dentro de `resources.pt` e `resources.en` deve ser a mesma para cada namespace. Que é exatamente o que acontece em:**

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

Cada namespace normalmente é representado por um arquivo JSON de tradução e deve ser configurado em `i18n/config.ts`.
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

# Uso do i18n na StArt

No momento, todas as páginas visíveis na tela já tem arquivo JSON, namespace configurado e o `useTranslation`sendo importado. Além disso, o seletor de linguagem já está feito. 

Assim, a internacionalização fica muito mais simples, apenas 4 passos:
- adicionar o que você quer traduzir aos arquivos de tradução
- importar o `useTranslation` no componente (se ainda não houver) 
- criar a variável `t` com `useTranslation` (se ainda não houver)
- usar a internacionalização que foi criada

---

## Namespaces da StArt

- `"landing/homepage"` -> landing page
- `"user/my-reviews"` -> página inicial, onde aparecem as revisões criadas 
- `"user/profile"` -> página que mostra o perfil do usuário
- `"structure/sidebar"` -> internacionalização da sidebar que é comum à aplicação inteira
- `"review/planning-protocol"` -> esse namespace contém essas páginas:
  
  <img width="196" height="328" alt="image" src="https://github.com/user-attachments/assets/6323aa1e-f7a9-4f65-8011-3ed7c8433d18" />
  
- `"review/execution-identification"` -> página de Identification
- `"review/execution-selection"` -> página de Selection
- `"review/execution-extraction"` -> página de Extraction
- `"review/summarization-graphics"` -> página de Graphics

A construção dos namespaces seguiu o mesmo padrão da arquitetura de pastas da pasta `src/features`.

## Exemplo de Uso

Internacionalização da página inicial para um usuário que não tem nenhum revisão feita ficou assim:

### Arquivos de Tradução

`src/locales/pt/user/my-reviews.json`

```json
{
    "header": "Início",
    "createNewReview": {
        "welcome": "Bem-vindo ao seu espaço de trabalho!",
        "message": "Você ainda não tem nenhuma revisão. Vamos começar criando a sua primeira e iniciar sua jornada de pesquisa!",
        "button": "Criar revisão"
    },
    ...
}
```

`src/locales/en/user/my-reviews.json`

```json
{
    "header": "Home",
    "createNewReview": {
        "welcome": "Welcome to your workspace!",
        "message": "You don’t have any reviews yet. Let’s start by creating your first one and begin your research journey!",
        "button": "Create review"
    },
    ...
}
```

### Página Inicial

`src/features/user/my-reviews/pages/MyReviews/index.tsx` 

```tsx
// External library
import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

// Services
import useGetReviewCard from "../../services/useGetReviewCard";

// Components
import FlexLayout from "@components/structure/Flex/Flex";
import Header from "@components/structure/Header/Header";
import Loader from "@components/feedback/Loader";
import CardDefault from "@components/common/cards";

// Factory
import RenderCards from "../../factory/cards/RenderCards";
import RenderCreateNewReview from "../../factory/cards/RenderCreateNewReview";

// Styles
import { flexStyles } from "./styles";

export default function MyReviews() {
  const { t } = useTranslation("user/my-reviews");
  const { cardData, isLoaded } = useGetReviewCard();

  return (
    <FlexLayout navigationType="Default">
      <Box w="100%" px="1rem" py="1rem" h="fit-content">
        <Flex w="100%" h="2.5rem" alignItems="center" mb="2rem">
          <Header text={t("header")} />
        </Flex>
      </Box>
      <CardDefault backgroundColor="white" borderRadius="1rem">
        <Box w="100%" px="1rem">
          <Flex sx={flexStyles} w={"100%"} align="center" justify="center">
            {!isLoaded && <Loader />}

            {cardData && cardData.length == 0 && isLoaded && (
              <RenderCreateNewReview />
            )}

            {cardData && cardData.length > 0 && isLoaded && (
              <RenderCards data={cardData} />
            )}
          </Flex>
        </Box>
      </CardDefault>
    </FlexLayout>
  );
}
```

Como o usuário no nosso exemplo não tem nenhuma revisão, será carregado o componente `<RenderCreateNewReview />`. A internacionalização dele ficou assim:

### Componente RenderCreateNewReview

`src/features/user/my-reviews/factory/cards/RenderCreateNewReview/index.tsx`

```tsx
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MdSentimentSatisfied } from "react-icons/md";
import NavButton from "@components/common/buttons/NavigationButton";

const container = {
  w: "calc(100% - 2rem)",
  h: "87.5vh",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  bg: "gray.50",
  borderRadius: "1rem",
  boxShadow: "sm",
  gap: ".5rem",
  mr: "2rem",
};

const button = {
  display: "flex",
  borderRadius: ".5rem",
  gap: ".25rem",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  transition: "0.3s ease-in-out",
  boxShadow: "md",
  p: "1rem",
  border: "2px solid white",
  bg: "black",
};

const RenderCreateNewReview = () => {
  const { t } = useTranslation("user/my-reviews");

  return (
    <Flex sx={container}>
      <Icon as={MdSentimentSatisfied} boxSize={"4rem"} color="#263C56" />

      <Text fontSize="xl" fontWeight="bold" color="gray.600">
        {t("createNewReview.welcome")}
      </Text>

      <Text fontSize="md" color="gray.500">
        {t("createNewReview.message")}
      </Text>

      <NavButton
        text={t("createNewReview.button")}
        path="/review/planning/protocol/general-definition"
        sx={button}
        _hover={{
          bg: "white",
          color: "black",
          border: "2px solid black",
        }}
        w="15rem"
        mt={4}
      />
    </Flex>
  );
};

export default RenderCreateNewReview;
```

Dessa forma, toda vez que você for criar algo novo ou atualizar algo já existente que exiba texto na tela, basta você ir aos arquivos de tradução de português e inglês, adicionar os textos em português e em inglês e, por fim, usar `t()` para renderizar os textos traduzidos (verificando antes se `useTranslation` já foi importado e instanciado no componente) garantindo que você crie algo novo já internacionalizado ou não quebre a internacionalização já existente 
