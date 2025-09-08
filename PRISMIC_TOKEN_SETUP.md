# 🔑 Configuration Token Prismic pour Upload d'Images

## ❌ Problème détecté
Votre token actuel fonctionne pour **lire** le contenu (Content API) mais n'a pas les permissions pour **uploader** des assets (Asset API).

**Erreur** : `401 {"error":"invalid_token"}` sur l'Asset API

## ✅ Solution - Créer un token avec permissions d'upload

### Étape 1: Dashboard Prismic
1. Allez sur https://alainbphoto.prismic.io/
2. **Settings** → **API & Security**

### Étape 2: Créer un nouveau token
1. Dans la section **"Access Tokens"**
2. Cliquez sur **"Create a Permanent Access Token"**
3. **IMPORTANT** : Sélectionnez les permissions suivantes :
   - ✅ **Write API access** (ou similaire)
   - ✅ **Asset API access** 
   - ✅ **Media Library access**
   - ✅ **Migration API access** (si disponible)

### Étape 3: Remplacer le token
1. Copiez le nouveau token
2. Remplacez dans votre `.env` :
```
PRISMIC_ACCESS_TOKEN=nouveau-token-avec-permissions-upload
```

## 🔍 Vérification

Une fois le nouveau token en place, testez :
```bash
curl http://localhost:3001/api/check-token
```

Vous devriez voir :
- `"contentApiStatus": 200` ✅
- `"assetApiStatus": 200` ✅ (au lieu de 401)

## 📝 Types de tokens Prismic

1. **Read-only token** : Content API uniquement
2. **Write token** : Content + Asset API + Migration
3. **Master API token** : Toutes permissions (recommandé pour dev)

## 🎯 Test après correction

Une fois le token corrigé, vos uploads via `/multiple-photos` devraient fonctionner et vous devriez voir dans les logs :
```
Successfully uploaded image.jpg to Prismic: https://images.prismic.io/...
```

## 🚨 Si le problème persiste

Si vous ne trouvez pas les options de permissions dans votre dashboard :
1. Vérifiez que vous êtes **Owner** ou **Admin** du repository
2. Contactez l'équipe Prismic pour les permissions Asset API
3. Utilisez temporairement la solution "local only" en attendant