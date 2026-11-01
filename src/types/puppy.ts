export type PuppyStatus = 'available' | 'gone_home';
export type PuppyGender = 'Boy' | 'Girl';
export type PuppyOrigin = 'Everywhere' | 'Imported' | 'Korean Teacup';

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  breed: string;
  breedCategory?: string;
  gender: PuppyGender;
  age?: string;
  status: PuppyStatus;
  origin: PuppyOrigin;
  washColor: string;
  tilt?: string;
  image: string;
  galleryImages?: string[];
  description: string;
  // Health records
  vaccinated: boolean;
  dewormed: boolean;
  microchipped: boolean;
  vetChecked: boolean;
  healthCertificate: boolean;
  // Gone home specific ticket data
  destination?: string;
  route?: string;
}

export interface HappyFamilyMoment {
  id: string;
  index: number;
  caption: string;
  tilt: string;
  tape: string;
  image: string;
  rawImage?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
