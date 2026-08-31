# Portfolio BTS SIO — option SISR

Portfolio de compétences pour le BTS Services Informatiques aux Organisations,
option **Solutions d'Infrastructure, Systèmes et Réseaux**, conçu comme support
des épreuves **E4**, **E5** et **E6** et des Projets Personnels Encadrés (PPE).

Site **100 % statique** : HTML, CSS et JavaScript, sans dépendance, sans build,
sans serveur. Il fonctionne par double-clic sur `index.html`, ce qui est pratique
le jour de l'oral si le réseau du centre d'examen fait défaut.

---

## 1. Contenu

| Page | Fichier | Rôle |
|---|---|---|
| Accueil | `index.html` | Présentation, chiffres clés, projets à la une |
| Parcours | `parcours.html` | Formation, stages, certifications |
| Compétences | `competences.html` | Les 3 blocs du référentiel + **tableau de synthèse E5** |
| Projets PPE | `projets.html` | Liste filtrable des 6 projets |
| PPE 01 | `projet-active-directory.html` | Domaine Active Directory, GPO, partages |
| PPE 02 | `projet-vlan-routage.html` | VLAN, routage inter-VLAN, STP, EtherChannel |
| PPE 03 | `projet-pfsense-vpn.html` | pfSense, DMZ, IPsec site à site, OpenVPN |
| PPE 04 | `projet-supervision.html` | Zabbix, GLPI, SNMP v3, seuils et alertes |
| PPE 05 | `projet-virtualisation-sauvegarde.html` | Proxmox VE, sauvegarde 3-2-1, plan de reprise |
| PPE 06 | `projet-serveur-web.html` | Nginx, Docker, TLS, Fail2ban, SPF/DKIM/DMARC |
| Veille | `veille.html` | Démarche, sources et fiches de synthèse |
| Contact | `contact.html` | Coordonnées, CV, formulaire `mailto:` |

Ressources : `assets/css/style.css`, `assets/js/main.js`, `assets/img/`, `assets/docs/`.

---

## 2. À personnaliser avant de rendre le portfolio

> Le jury attend des réalisations **authentiques**. Le contenu fourni est une
> trame complète et cohérente : remplacez-la par vos propres projets, ou
> conservez la structure et réécrivez les faits avec vos données réelles.

### 2.1 Obligatoire

- [ ] **Identité** — remplacer `Mathys`, les initiales `MS` du logo et le
      sous-titre, présents dans l'en-tête et le pied de page de **chaque** page.
- [ ] **Coordonnées** (`contact.html`) — adresse électronique, téléphone, ville,
      LinkedIn, dépôt de code. Penser aussi à l'attribut `data-mailto` du
      formulaire et au lien `mailto:` du pied de page.
- [ ] **Crochets `[...]`** — établissement, ville, entreprises de stage, dates,
      mention du baccalauréat, disponibilité. Ils sont volontairement visibles
      pour ne pas être oubliés.
- [ ] **CV** — déposer votre CV dans `assets/docs/cv.pdf` (le lien y pointe déjà).
- [ ] **Projets** — reprendre chaque fiche PPE avec vos vrais contextes,
      schémas, extraits de configuration, tests et difficultés.
- [ ] **Tableau de synthèse** (`competences.html#synthese`) — il doit
      correspondre exactement au document remis au jury.
- [ ] **Niveaux de compétences** — ajuster les attributs `data-level`
      (0 à 100) et les libellés de maîtrise dans `competences.html`.

Commande utile pour repérer tout ce qui reste à compléter :

```bash
grep -rn "\[.*\]\|exemple.fr\|Sotracom" *.html
```

### 2.2 Recommandé

- [ ] Remplacer les logos SVG par vos propres captures d'écran ou schémas
      (dossier `assets/img/`).
- [ ] Ajouter vos captures de configuration réelles (interface Zabbix, règles
      pfSense, console Proxmox…) : elles crédibilisent fortement le dossier.
- [ ] Adapter les couleurs dans `assets/css/style.css` (bloc `:root`,
      variables `--accent` et `--accent-2`).

---

## 3. Consulter le site en local

Le plus simple : double-cliquer sur `index.html`.

Pour un rendu strictement identique à la mise en ligne, servir le dossier via
un petit serveur local :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

---

## 4. Mettre en ligne

### GitHub Pages (gratuit, recommandé)

```bash
git init && git add . && git commit -m "feat: portfolio BTS SIO SISR"
```

Créer ensuite un dépôt public, y pousser le code, puis activer
**Settings → Pages → Branch: main / root**. Le site est publié sous
`https://<compte>.github.io/<depot>/`.

### Autres hébergements

Netlify, Vercel, GitLab Pages ou un simple hébergement mutualisé conviennent :
il suffit de déposer le contenu du dossier. Aucun script serveur n'est requis.

Héberger le portfolio sur **votre propre serveur web** (le PPE 06 du portfolio)
est un excellent argument à l'oral.

---

## 5. Choix techniques et accessibilité

- **Aucune dépendance** : ni framework, ni CDN, ni police externe — le site
  s'affiche hors ligne et reste lisible dans dix ans.
- **Thème clair / sombre** : bouton dans l'en-tête, préférence système
  respectée par défaut, choix mémorisé dans `localStorage`.
- **Responsive** : grilles fluides, menu repliable sous 940 px, tableaux
  défilables horizontalement.
- **Accessibilité** : navigation au clavier, `aria-label` sur les commandes,
  contrastes conformes, animations désactivées si
  `prefers-reduced-motion` est actif.
- **Impression** : une feuille de style dédiée permet d'imprimer ou d'exporter
  chaque page en PDF proprement (utile pour le dossier papier).
- **Confidentialité** : aucun cookie, aucun traceur, aucune requête externe.
  Le formulaire de contact ouvre le client de messagerie local.

---

## 6. Structure des fichiers

```
.
├── index.html
├── parcours.html
├── competences.html
├── projets.html
├── projet-active-directory.html
├── projet-vlan-routage.html
├── projet-pfsense-vpn.html
├── projet-supervision.html
├── projet-virtualisation-sauvegarde.html
├── projet-serveur-web.html
├── veille.html
├── contact.html
├── README.md
└── assets
    ├── css/style.css
    ├── js/main.js
    ├── img/          (captures d'écran, schémas)
    └── docs/cv.pdf   (à déposer)
```

### Ajouter un septième projet

1. Dupliquer une fiche existante, par exemple `projet-supervision.html`.
2. Adapter `<title>`, la description, le fil d'Ariane et le contenu.
3. Ajouter une carte dans `projets.html` avec l'attribut `data-cat`
   (`systeme`, `reseau`, `securite`, `exploitation` — plusieurs valeurs
   séparées par un espace).
4. Ajouter une ligne dans le tableau de synthèse de `competences.html`
   et référencer le projet dans les compétences concernées.
