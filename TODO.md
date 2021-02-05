## Must have

1. Traitements en masse d’une même ressource (batch)
1. Traitement asynchrone (les basics) => WWO/SRE : utilisé comme exemple de cookbook
  - Recherche complexe asynchrone (trop de paramètres dans l’URL +  temps de traitement de la requête)
1. [GUE] Panier d’achat
1. [ACH] Mise à jour de plusieurs ressources (transaction)
1. Accept-Language vs différentiation de ressources ou de comportement
1. Cache API (ETag, Cache-Control, Pragma...)
1. [MLM] Ressource complexe VS ressource light (design + ?fields=)
1. Gestion des ID de ressources (quand en faire, ou pas, quoi choisir, quid du cas façade d’un système sous jacent (qui a ses propres ID, ou pas d’IDs...)) => https://matthiasnoback.nl/2018/05/when-and-where-to-determine-the-id-of-an-entity/
1. [KENG] Filtre complexe (trop de paramètres dans l’URL)
1. [KLEI] Versionner une API
1. [MLM] Faire une action dans API sans créer de ressource ? Non-resource scenario
1. Integers vs Strings vs libellés UI-friendly
1. [ARD] Pagination
1. [MLM] Format d'erreur

## Should have

2. Renvoyer autre chose que du json (négociation de contenu, PDF, CSV, fichiers)
2. Comment faire de l’upload de plusieurs binaires, en envoyant en même temps des metadata ?
2. Idempotence en création de ressource => JVI : draft
2. Exemple de HATEOAS (panier)
2. Mets du swagger dans ta doc
2. GET : les limitations (taille de l'URL => POST)
2. Comment gérer l’héritage ?

## Nice to have

3. Récupération de mot de passe
3. Configurateur d’options
3. Onboarding mobile
3. Authentification forte (>= 2 facteurs)
3. Recherche multi ressources
3. API et Machine à états
3. Payload avec metadata

## Articles potentiels

- Calcul d’un prix stateless (paramètres en entrée + logique de calcul côté serveur) :
sans stockage possible (GET /resources?... ou POST /resources + 301 vers /resource/:id)
avec stockage possible (POST /resources?... => 201 Location /resources/:id => GET /resource/:id) -> évite le recalcul
- Spécifications exécutables vs pyramide de tests inversée
- Code first vs Spec first
- REX mise en place tests Newman
- APIM pour les flux sortants (article d'archi)
- APIM pour les appels internes ? Une gateway, deux gateways ? (article d'archi)
- APIs réactives (RTM : Slack, Twitter)

## Tech

- [ ] Add 2 more articles
- [ ] Fix the color of the complexity icon (should change based on the value)
- [ ] Add tags if needed (to be defined)
