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

## Quick Start

1. `docker-compose --profile mysql up -d`
2. `npm install`
3. `npx prisma generate`
4. `npm run start`
5. API disponible sur http://localhost:3000
<!-- 5. Documentation: http://localhost:[port]/[chemin_docs] -->

## Configuration

### **1. Variables d'environements**

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

---

### **2. Base de données**

**Introspection d’une DB existante**  
Si la DB contient déjà des données :

```bash
npx prisma db pull       # Récupère la structure existante
npx prisma generate      # Génère le Prisma Client
```

**Préparer Prisma pour les migrations futures**

#### **1. Créer une migration create-only :**

```bash
npx prisma migrate dev --name init --create-only
```

#### **2. Créer une migration create-only :**

```bash
npx prisma migrate resolve --applied <nom_dossier_migration>
```

#### **2. Tester la connection :**

```bash
chmod +x test-connections.sh && ./test-connections.sh
```

<!-- ## Tests

[commande_lancement_tests] - Tests unitaires + intégration

## Architecture

internal-tools/
├─ src/                # Code source
│  ├─ modules/         # Modules NestJS
│  ├─ common/          # DTO, interfaces, pipes, guards
│  └─ main.ts          # Entry point
├─ prisma/             # Prisma schema et migrations
├─ test/               # Tests unitaires et intégration
├─ docker-compose.yml
└─ package.json

- [Justification_choix_tech]
- [Structure_projet_expliquee] -->
