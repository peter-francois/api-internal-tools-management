# API Internal Tools Management

## Technologies

- Langage: TypeScript
- Framework: NestJs
- Base de données: MySQL
- Port API: 3000

## Prérequis

Assure-toi d’avoir :

- Node.js installé
- Docker installé

## Configuration

### 1. Variables d'environements

Un fichier **`.env.example`** est fourni comme modèle de configuration.

Pour l’utiliser :

```bash
cp .env.example .env
```

Puis renseigner les valeurs adaptées à ton environnement.

Exemple pour MySQL :

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=internal_tools
PHPMYADMIN_PORT=8081
```

### 2. Base de données

La base de données est lancée via Docker avec le profil mysql.

```bash
docker-compose --profile mysql up -d
```

### 3. Tester la connection :

Un script est disponible pour vérifier la connexion aux services :

```bash
cd scripts/
chmod +x test-connections.sh && ./test-connections.sh
```

## Quick Start

1. Copier les variables d'environnement et adaptées les valeurs.
   ```bash
   cp .env.example .env
   ```
2. Lancer la base de données
   ```bash
   docker-compose --profile mysql up -d
   ```
3. Installer les dépendances
   ```bash
   npm install
   ```
4. Générer le client Prisma
   ```bash
   npx prisma generate
   ```
5. Lancer l’API
   ```bash
   npm run start
   ```

API disponible sur http://localhost:3000

Swagger-ui: http://localhost:3000/api/docs

## Sécurité de l’application

L’application intègre plusieurs protections pour sécuriser les données et l’API :

- Validation et transformation des entrées avec **class-validator** et **class-transformer** pour éviter les injections et les données invalides.
- Accès à la base via **Prisma ORM** typé pour prévenir les injections SQL.
- Gestion sécurisée des secrets et mots de passe via le fichier **.env** (jamais versionné).
- Tests unitaires et d’intégration (**Jest**) pour vérifier la logique métier et la robustesse.

## Tests

Exécuter les tests

```bash
npm run test
```

## Architecture

```
internal-tools/
├─ src/ # Code source
│ ├─ modules/ # Modules NestJS
│ ├─ utils/ # Filtres, variables
│ ├─ app.module.ts/ # Module racine de l'application
│ └─ main.ts # Point d'entrée
├─ prisma/ # Prisma schema et migrations
├─ docker-compose.yml
└─ package.json
```

## Choix technique

### 1. TypeScript

- **Pourquoi** : Ajouter un typage statique à Node.js pour détecter les erreurs à la compilation.
- **Avantage** : Code plus sûr, meilleure lisibilité et refactoring facilité.
- **Comparatif** : Contrairement à **JavaScript**, TypeScript permet d’éviter de nombreuses erreurs runtime.

---

### 2. NestJS comme framework backend

- **Pourquoi** : Fournir une architecture backend modulaire et structurée.
- **Avantage** : Organisation claire avec modules, services et controllers, et injection de dépendances intégrée.
- **Comparatif** : **Express.js** est plus minimaliste mais nécessite de structurer l’architecture manuellement.

---

### 3. Prisma ORM pour l’accès aux données

- **Pourquoi** : Simplifier l’accès à la base de données avec un ORM moderne et typé.
- **Avantage** : Client généré automatiquement et requêtes type-safe.

---

### 4. class-validator et class-transformer pour la validation

- **Pourquoi** : Valider et transformer les données entrantes dans les DTO.
- **Avantage** : Validation automatique des requêtes dans les controllers.
- **Comparatif** : Des solutions comme **Joi** ou **Zod** existent mais sont moins intégrées à NestJS.

---

### 5. Jest pour les tests

- **Pourquoi** : Framework de tests intégré par défaut dans l’écosystème NestJS.
- **Avantage** : Tests unitaires et d’intégration simples à mettre en place.

---

### 6. Architecture monolithique modulaire

- **Pourquoi** : Organiser l’application en modules fonctionnels dans un seul service.
- **Avantage** : Bonne séparation des responsabilités et maintenance facilitée.
- **Comparatif** : Plus simple qu’une architecture **microservices**, tout en restant mieux structurée qu’un monolithe classique.
