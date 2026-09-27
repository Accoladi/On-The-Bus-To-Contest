export type RadioPromo = {
  websiteKey?: string;
  websiteName?: string;
  href?: string;
  backgroundImageUrl?: string;
  logoImageUrl?: string;
  heading?: string;
  subheading?: string;
};

export type RadioSong = {
  id: string;
  slug?: string;
  title: string;
  artist?: string;
  audioUrl?: string;
  coverImageUrl?: string;
  durationSeconds?: number;
  status?: string;
  isRestricted?: boolean;
  lyrics?: string;
  promo?: RadioPromo;
};
