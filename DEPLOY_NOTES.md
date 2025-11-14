# Guide de Déploiement

## Vercel (Recommandé pour Next.js)

### Étape 1 : Préparer le repo Git
```powershell
git add .
git commit -m "Prêt pour déploiement"
git push origin main
```

### Étape 2 : Créer un compte Vercel
- Allez sur https://vercel.com
- Cliquez sur "Sign Up" et connectez-vous avec GitHub (ou GitLab/Bitbucket)

### Étape 3 : Importer le projet
1. Sur Vercel, cliquez "New Project"
2. Sélectionnez votre repo GitHub `testOuiActive`
3. Vercel détecte automatiquement que c'est un projet Next.js
4. Cliquez "Deploy" — Vercel lance le build automatiquement

### Étape 4 : Accéder à l'application
- Une fois le build terminé (2-5 min), Vercel fournit un lien `*.vercel.app`
- Exemple : `https://test-oui-active.vercel.app`

### Déploiements futurs
- À chaque push sur `main`, Vercel redéploie automatiquement

## Troubleshooting

### Erreur "Cannot find module" au build
```powershell
npm ci
npm run build
```
Copiez le message d'erreur complet et partagez-le.

### Erreur version Node
Ajoutez dans `package.json` :
```json
"engines": { "node": ">=20.9.0" }
```

## Alternatives

### Render
1. Allez sur https://render.com
2. Créez un "Web Service", connectez le repo
3. Build Command: `npm run build`
4. Start Command: `npm run start`

### Netlify
1. Allez sur https://netlify.com
2. Connectez votre repo, Netlify détecte Next.js
3. Déployez — peut demander une config supplémentaire pour app router
