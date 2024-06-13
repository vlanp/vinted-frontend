interface DatasOffers {
  count: number;
  offers: Array<Offer>;
}

interface Offer {
  _id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_details: Array<{
    [Detail in TDetail]?: string;
  }>;
  product_pictures: Array<Picture>;
  owner: Owner;
  product_image: Picture;
  product_date: Date;
}

const Detail = {
  MARQUE: "MARQUE",
  TAILLE: "TAILLE",
  ETAT: "ÉTAT",
  COULEUR: "COULEUR",
  EMPLACEMENT: "EMPLACEMENT",
  PAIEMENT: "MODES DE PAIEMENT",
} as const;

type TDetail = (typeof Detail)[keyof typeof Detail];

interface Picture {
  asset_id: string;
  secure_url: string;
}

interface Owner {
  account: Account;
  _id: string;
}

interface Account {
  username: string;
  avatar: Picture;
}

export default DatasOffers;
export type { Offer };
export { Detail };
