const Detail = {
  MARQUE: "MARQUE",
  TAILLE: "TAILLE",
  ETAT: "ÉTAT",
  COULEUR: "COULEUR",
  EMPLACEMENT: "EMPLACEMENT",
  PAIEMENT: "MODES DE PAIEMENT",
} as const;

// const enum Detail {
//   MARQUE = "MARQUE",
//   TAILLE = "TAILLE",
//   ETAT = "ÉTAT",
//   COULEUR = "COULEUR",
//   EMPLACEMENT = "EMPLACEMENT",
//   PAIEMENT = "MODE DE PAIEMENT",
// }

type TDetail = (typeof Detail)[keyof typeof Detail];

export default Detail;
export type { TDetail };
