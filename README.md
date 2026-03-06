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

## Endpoints

### Format de réponse

Toutes les réponses suivent une interface générique :

```typescript
interface SuccessResponseInterface<T, M> {
  data: T;
  meta?: M;
}
```

Les listes incluent un objet `meta` avec les informations de pagination et de filtrage :

```json
{
  "data": [...],
  "meta": {
    "total": 24,
    "filtered": 2,
    "filters_applied": {
      "min_cost": 10,
      "max_cost": 50,
      "category": "Development"
    }
  }
}
```

### Format des erreurs

Les erreurs de validation retournent :

```json
{
  "error": "Validation failed",
  "details": ["monthly_cost must be a number conforming to the specified constraints"]
}
```

## Architecture

```

internal-tools/
├── prisma/                                  # Schéma Prisma et migrations
├── scripts/                                 # Scripts pour la base de données
├── mysql/                                   # Fichier pour init la base de données
├── src/
│   ├── tools/
│   │   ├── dto/
│   │   │   ├── create-tool.dto.ts              # Validation POST
│   │   │   ├── update-tool.dto.ts              # Validation PATCH (PartialType de create)
│   │   │   └── tools-query.dto.ts              # Paramètres de filtrage GET
│   │   ├── entities/
│   │   │   └── tool.entity.ts                  # Classes de réponse Swagger (Tool, ToolsFindOneByIdResponse...)
│   │   ├── tools.examples.ts                   # Exemples centralisés pour Swagger
│   │   ├── tools.controller.ts
│   │   ├── tools.service.ts
│   │   └── tools.service.spec.ts               # Tests unitaires
│   ├── prisma/
│   │   ├── prisma.service.ts                   # Service d'accès à la base de données
│   │   └── prisma.module.ts                    # Module Prisma
│   ├── utils/
│   │   ├── filters/
│   │   │   ├── prisma-exeption.filter.ts       # Filtre pour les erreur prisma
│   │   │   └── validation-exeption.filter.ts   # Filtre pour les erreur de validation
│   │   ├── response.interface.ts               # SuccessResponseInterface<T, M>
│   │   ├── success-responce.factory.ts         # Creation des Classe concrète dynamique pour Swagger
│   │   └── variables.ts
│   ├── app.module.ts
│   └── main.ts
├── docker-compose.yml
└── package.json
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

### 5. Interface de réponse générique

- **Pourquoi** : Normaliser le format de toutes les réponses API.
- **Avantage** : `SuccessResponseInterface<T, M>` sépare clairement `data` (les objets métier) et `meta` (pagination, filtres appliqués). Une `SuccessResponseFactory` contourne la limitation de Swagger sur les generics TypeScript en générant une classe concrète dynamiquement.

---

### 6. Jest pour les tests

- **Pourquoi** : Framework de tests intégré par défaut dans l'écosystème NestJS.
- **Avantage** : Tests unitaires simples à mettre en place. Configuration adaptée pour gérer le client Prisma généré en ESM via `tsconfig.test.json` et `moduleNameMapper`.

---

### 7. Architecture monolithique modulaire

- **Pourquoi** : Organiser l'application en modules fonctionnels dans un seul service.
- **Avantage** : Bonne séparation des responsabilités et maintenance facilitée.
- **Comparatif** : Plus simple qu'une architecture **microservices**, tout en restant mieux structurée qu'un monolithe classique.
