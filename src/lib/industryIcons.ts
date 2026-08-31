import {
  Heart, Landmark, ShieldHalf, GraduationCap, Plane, ShoppingBag, Building2, Truck,
} from 'lucide-react';

/**
 * Industry cards store their icon as a name, so the admin can pick one for a new
 * sector without a code change. These are the icons the section already
 * imported; anything unrecognised falls back to the neutral building mark.
 */
export const INDUSTRY_ICONS = {
  Heart, ShieldHalf, Plane, GraduationCap, Landmark, ShoppingBag, Building2, Truck,
} as const;

export type IndustryIconName = keyof typeof INDUSTRY_ICONS;

export const INDUSTRY_ICON_NAMES = Object.keys(INDUSTRY_ICONS) as IndustryIconName[];

export const industryIcon = (name?: string) =>
  INDUSTRY_ICONS[(name ?? '') as IndustryIconName] ?? Building2;

export type Industry = {
  id: string;
  slug: string;
  name: string;
  sub: string;
  icon: string;
  desc: string;
  useCases: string[];
  content: string[];
};
