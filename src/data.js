// ✏️ Modifie ici ton contenu : tout le site se met à jour.
export const profile = {
  firstName: 'Wassila', lastName: 'Et-toumi',
  role: 'Développeuse Full Stack',
  headline: 'Je conçois des sites et applications web modernes, du back-end jusqu’à l’interface.',
  sub: 'Étudiante en Développement Digital (option Web Full Stack) à l’ISTA Benslimane, à la recherche d’un stage.',
  about: 'Je suis Wassila, technicienne spécialisée en développement digital. Passionnée par les nouvelles technologies, j’aime transformer une idée en application web claire, rapide et agréable à utiliser. Je cherche un stage pour mettre en pratique mes connaissances en développement full stack.',
  email: 'wassilaettoumi70@gmail.com', phone: '+212 6 18 63 78 56',
  whatsapp: 'https://wa.me/212618637856',
  linkedin: 'https://www.linkedin.com/in/wassila-et-toumi-2b0b2a38a',
  github: 'https://github.com/wassilaettoumi70-cmd',
  city: 'Benslimane, Maroc', cv: '/CV_Wassila_Et-toumi.pdf', photo: '/photo.png',
}
export const tools = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'PHP', 'Laravel', 'Node.js', 'Express.js', 'Python', 'MySQL', 'MongoDB', 'Git', 'Jira', 'Postman']
export const stats = [{ v: '3', l: 'Projets' }, { v: '1', l: 'Stage' }, { v: '2027', l: 'Diplôme ISTA' }]
export const projects = [
  { cat: 'Full-Stack', title: 'Site e-commerce', desc: 'Boutique en ligne avec catalogue, panier et gestion des commandes.', stack: ['PHP', 'JavaScript', 'MySQL'], github: '', demo: '',image: '/projects/ecommerce.png' },
  { cat: 'Full-Stack', title: 'Réservation hôtelière', desc: 'Application de réservation de chambres avec gestion des disponibilités.', stack: ['PHP', 'JavaScript', 'MySQL'], github: '', demo: ''  , image: '/projects/hotel.png'},
  { cat: 'Python / React', title: 'Détection des maladies', desc: 'Application web qui aide à détecter des maladies à partir de données saisies.', stack: ['Python', 'Flask', 'React', 'MySQL'], github: '', demo: '' , image: '/projects/maladies.png' },
]
export const experience = [
  { kind: 'Stage', title: 'Stage en développement web', place: 'C2M, Casablanca', date: '1 mois', points: ['Découverte de l’environnement professionnel.', 'Initiation au développement web.', 'Réalisation d’un projet personnel pour approfondir mes connaissances.'] },
  { kind: 'Formation', title: 'Technicien Spécialisé en Développement Digital – Web Full Stack', place: 'ISTA Benslimane', date: '2027', points: ['Développement front-end et back-end.', 'Projets académiques : e-commerce, réservation, application IA.'] },
  { kind: 'Formation', title: 'Baccalauréat Sciences Physiques – option Français', place: 'Lycée Qualifiant Laghnimiyine, Berrechid', date: '2025', points: [] },
]
export const services = [
  ['Développement Full Stack', 'Applications web complètes, de la base de données à l’interface.'],
  ['Développement Front-end', 'Interfaces React rapides, responsives et soignées.'],
  ['Développement Back-end', 'APIs et logique serveur avec PHP, Laravel et Node.js.'],
  ['Sites responsives', 'Un affichage propre du téléphone au grand écran.'],
  ['Bases de données', 'Conception et gestion avec MySQL et MongoDB.'],
  ['Travail en équipe', 'Git, GitHub et Jira pour collaborer efficacement.'],
]
