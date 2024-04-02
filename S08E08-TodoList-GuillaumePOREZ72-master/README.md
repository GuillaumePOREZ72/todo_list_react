# S08E08 - TodoList

Nous avons une TodoList déjà créée dans notre projet. Ses composants comportent des informations statiques. Nous allons les remplacer par des informations dynamiques et mettre en place quelques actions utilisateur.

## :zero: Analyse

Analyse le code de l'application. 

Une Todolist contient une liste de tâches (Tasks) qui contient des tâches (Task). 

Un compteur des tâches en cours est affiché.

Un composant Form existe mais n'est pas utilisé pour le moment.

## :one: Données dynamiques

Un tableau de tâches est disponible dans `src/data/tasks.js`. 

- Récupère les données du tableau et remplace les données statiques par les données dynamiques extraites de celui-ci.

## :two: Évènement

- Dans le composant `Task`, mets en place un écouteur d'évènement qui appelle un handler
- Ce handler affiche un `console.log` quand l'utilisateur coche ou décoche la checkbox.

<details>
<summary>Indices</summary>

- Sur une checkbox, l'évènement qui nous intéresse est `onChange`.

```js
const handleChange = () => {
  console.log("La checkbox a été cochée ou décochée");
};

return (
  <div>
    <input type="checkbox" onChange={handleChange} />
  </div>
);
```

</details>

Si le console.log s'affiche au clic sur la checkbox, c'est que l'évènement est bien déclenché.

Cependant, la case ne change jamais de statut, elle ne se coche pas et ne se décoche pas.

## :three: State

La raison pour laquelle la checkbox ne se coche/décoche pas, c'est qu'on a déclaré sa valeur au chargement de la page, mais, cette valeur reste toujours la même.

C'est ici que le state intervient. Celui-ci permet de stocker des informations qui peuvent changer dans le temps et qui vont être répercutées dans l'affichage.

L'information qui nous intéresse pour l'instant, c'est le statut de la tâche.

### 3.1 Déclaration du state

- Dans le composant `TodoList`, déclare un nouveau state en utilisant le hook `useState`.
  - Ce state contient la liste des tâches

⚠️ Attention a bien importer `{ useState }` avant de l'utiliser

<details>
<summary>Rappel useState</summary>

Pour déclarer un state en utilisant `useState`, on utilise la syntaxe suivante :

```js
// Ici on déclare un state qui s'appelle "state" 
// Au moment de son initialisation, il prend la valeur de "initialState"
// On peut le modifier en appelant la fonction "setState"
const [state, setState] = useState(initialState);
```

</details>

### 3.2 Transmission du state

Le but est qu'à chaque fois qu'on modifie le statut d'une tâche, cette modification soit répercutée dans le state.

On a donc besoin de notre state qui est déclaré dans `TodoList`.

- Au lieu de transmettre directement le tableau à `Tasks`, transmets lui plutôt le tableau stocké dans le state.

### 3.3 Modification du state

- Dans le composant `TodoList`, crée une fonction qui change le statut d'une tâche en utilisant la fonction de modification du state.
  - Si `done` est vrai, on le passe à faux et si `done` est faux, on le passe à vrai. 
  - Cette fonction prend en paramètre l'id de la tâche à modifier.

<details>
<summary>Indices</summary>

- Pour modifier le state, on utilise la fonction de modification du state qui est retournée par le hook `useState`.

```js
const [chaine, setChaine] = useState("Ma valeur initiale");

const nouvelleValeur = (nouvelleChaine) => {
  setChaine(nouvelleChaine);
};
```

- Dans notre cas, on travaille sur un tableau. On transmet un id en paramètre. Il va donc falloir trouver l'id de la tâche à modifier dans le tableau et modifier la valeur de `done` de cette tâche uniquement.

Un exemple:

```js
// Notre state est un tableau d'objets qui contient un id et un contenu
const [tasks, setTasks] = useState([
  { id: 1, content: "Faire la vaisselle" },
  { id: 2, content: "Faire le ménage" },
  { id: 3, content: "Faire la cuisine" },
]);

// On crée une fonction qui prend en paramètre l'id de la tâche à modifier et le nouveau contenu pour cette tâche
const changeContent(id, newContent) {
  // On utilise la fonction map pour parcourir le tableau
  const newTasks = tasks.map((task) => {
    // Si l'id de la tâche correspond à l'id passé en paramètre
    if (task.id === id) {
      // On retourne un nouvel objet qui contient le contenu modifié
      return {
        ...task,
        content: newContent,
      };
    }
    // Sinon on retourne la tâche telle quelle
    return task;
  });

  // On met à jour le state avec le nouveau tableau
  setTasks(newTasks);
}

```

</details>

### 3.4 Transmission de la fonction de modification du state

- Passe cette fonction en props au composant `Tasks` pour qu'il puisse la transmettre à son tour au composant `Task`.
- Dans le handler créé précédemment (qui affichait un console.log), appelle la fonction de modification du state en lui passant l'id de la tâche à modifier.

<details>
<summary>Indices</summary>

- Pour passer une fonction en props, on utilise la même syntaxe que pour passer une variable en props.

```js
const maFonction = () => {
  console.log("Ma fonction");
};

<MonComposant maFonction={maFonction} />
```

- Pour appeler une fonction passée en props, on utilise la même syntaxe que pour appeler une fonction.

```js
const maFonction = () => {
  console.log("Ma fonction");
};

const MonComposant = ({ maFonction }) => {
  return (
    <div>
      <button onClick={maFonction}>Appeler ma fonction</button>
    </div>
  );
};
```

</details>

## :star: Bonus - Counter dynamique

Pour le moment, le compteur de tâches en cours est statique. Il affiche toujours la même valeur.

Comme on dispose d'un state sur les tâches, on peut compter le nombre de tâches dont le statut est `done: false`.

Grâce au state, le compteur se mettra à jour à chaque fois qu'on modifiera le statut d'une tâche.

- Remplace la valeur statique par la valeur dynamique du nombre de tâches en cours.

<details>
<summary>Indices</summary>

- Pour compter le nombre de tâches en cours, on peut utiliser la fonction `filter` sur le tableau des tâches. Cette fonction permet de filtrer un tableau en fonction d'une condition.
- Ensuite on peut compter le nombre d'entrées dans ce nouveau tableau avec la fonction `length`.

```js

// On a un tableau de produits avec un id, un nom et un prix
const produits = [
  { id: 1, nom: "Banane", prix: 1 },
  { id: 2, nom: "Pomme", prix: 2 },
  { id: 3, nom: "Poire", prix: 3 },
  { id: 4, nom: "Orange", prix: 4 },
];

// On compte le nombre de produits dont le prix est supérieur à 2
const produitsChers = produits.filter((produit) => produit.prix > 2).length;

```

</details>

## :star: Méga Bonus - Ajout d'une tâche

Un composant `Form` est disponible dans le projet. Il n'est pas utilisé pour le moment.

Il sert à ajouter une tache à la liste.

### 1 - Affichage du composant `Form`

- Affiche le composant form au dessus du composant `Counter`
- Dans le composant `TodoList`, crée un state pour stocker la valeur du champ de saisie (sa valeur initiale est une chaîne vide)
- Transmets ce state et sa fonction d'édition au composant `Form` 
- Dans le composant `Form`, utilise ce state comme valeur de l'input

### 2 - Composant contrôlé

Maintenant qu'on a défini une valeur pour l'input, on ne peut plus écrire dedans. C'est normal, quoi qu'on fasse, la valeur de l'input sera toujours la même.

Il faut donc mettre en place un handler qui va modifier la valeur du state à chaque fois qu'on écrit dans l'input. C'est ce qu'on appelle un composant contrôlé.

- Dans le composant `Form`, crée un handler qui modifie la valeur du state à chaque fois qu'on écrit dans l'input
  - Ainsi, à chaque fois qu'on écrit dans l'input, la valeur du state est mise à jour, donc le texte dans l'input correspond exactement au contenu du state.

### 3 - Ajout d'une tâche

Notre composant `Form` contient un formulaire. Lorsqu'un utilisateur valide le formulaire, en appuyant sur la touche entrée, on veut ajouter une tâche à la liste.

- Dans le composant `TodoList`, crée une fonction qui ajoute une tâche à la liste. 

<details>
<summary>Indices</summary>

- Elle ajoute la nouvelle tâche à la liste des tâches en cours.
- Son id vaut l'id maximum de la liste + 1.
- Une tache sera toujours créée avec `done` à `false`.
- Une fois la tâche ajoutée, on vide le champ de saisie.

Exemple:

```js
// State de notre input
const [inputValue, setInputValue] = useState("");

// Notre state contient un tableau de produits avec un id et un nom
const [products, setProducts] = useState([
  { id: 1, nom: "Banane" },
  { id: 2, nom: "Pomme" },
  { id: 3, nom: "Poire" },
  { id: 4, nom: "Orange" },
]);

const addProduct = () => {
  // On récupère les ids des produits
  const productsIds = products.map(product => product.id);

  // On récupère l'id maximum et on ajoute 1
  const newProductId = Math.max(...productsIds) + 1;

  // On créé le nouveau produit
  const newProduct = {
    id: newProductId,
    nom: inputValue,
  };

  // On ajoute le nouveau produit à la liste des produits
  setProducts([...products, newProduct]);

  // On vide le champ de saisie
  setInputValue("");
};

```

</details>

- Transmets cette fonction au composant `Form`
- Dans le composant `Form`, crée un handler qui appelle la fonction d'ajout d'une tâche en lui passant le contenu de la tâche à ajouter.
  - Ce handler est appelé lorsqu'on valide le formulaire.

<details>
<summary>Indices</summary>

- On peut utiliser `onSubmit` sur le formulaire pour appeler le handler lorsqu'on valide le formulaire avec la touche entrée.

</details>
