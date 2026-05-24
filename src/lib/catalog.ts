import gilgameshImg from "@/assets/char-gilgamesh.jpg";
import aizenImg from "@/assets/char-aizen.jpg";
import cidImg from "@/assets/char-cid.jpg";

export type Variant = {
  label: string;
  price: number;
  desc: string;
  tag?: "Hot" | "Best" | "New" | "+F";
};

export type CharacterGroup = {
  name: string;
  variants: Variant[];
  image?: string;
};

export type ItemProduct = {
  name: string;
  price: number;
  unitSize: number; // e.g. 1000 → harga per 1.000
  unitLabel: string; // e.g. "1.000"
  desc: string;
  tag?: "Hot" | "Best" | "New" | "+F";
};

export type BundleProduct = {
  name: string;
  price: number;
  desc: string;
  tag?: "Hot" | "Best" | "New" | "+F";
};

export const characters: CharacterGroup[] = [
  { name: "Aizen", image: aizenImg, variants: [
    { label: "V1", price: 1100, desc: "Set Aizen V1" },
    { label: "V2", price: 6000, desc: "Set Aizen V2", tag: "Best" },
  ]},
  { name: "Gilgamesh", image: gilgameshImg, variants: [
    { label: "Set", price: 1500, desc: "Set Gilgamesh dasar" },
    { label: "+F", price: 5250, desc: "Set Gilgamesh lengkap + Skill F", tag: "+F" },
  ]},
  { name: "Madara", variants: [
    { label: "Set", price: 3000, desc: "Set Madara" },
  ]},
  { name: "Ice Queen", variants: [
    { label: "Set", price: 1900, desc: "Set Ice Queen dasar" },
    { label: "+F", price: 2200, desc: "Set Ice Queen + Skill F", tag: "+F" },
  ]},
  { name: "Sukuna", variants: [
    { label: "V1", price: 620, desc: "Set Sukuna V1" },
    { label: "V2", price: 1600, desc: "Set Sukuna V2" },
    { label: "+F", price: 8000, desc: "Set Sukuna lengkap + Skill F", tag: "Hot" },
  ]},
  { name: "Alucard", variants: [
    { label: "Set", price: 1100, desc: "Set Alucard" },
  ]},
  { name: "Gojo", variants: [
    { label: "V1", price: 515, desc: "Set Gojo V1" },
    { label: "V2", price: 2000, desc: "Set Gojo V2" },
    { label: "+F", price: 8000, desc: "Set Gojo lengkap + Skill F", tag: "Hot" },
  ]},
  { name: "Qinshi", variants: [
    { label: "Set", price: 1500, desc: "Set Qinshi" },
  ]},
  { name: "Alter Saber", variants: [
    { label: "Set", price: 600, desc: "Set Alter Saber dasar" },
    { label: "+F", price: 4800, desc: "Set Alter Saber + Skill F", tag: "+F" },
  ]},
  { name: "Soul Reaper", variants: [
    { label: "Set", price: 1500, desc: "Set Soul Reaper" },
  ]},
  { name: "Anos", variants: [
    { label: "Set", price: 2000, desc: "Set Anos" },
  ]},
  { name: "Jinwoo", variants: [
    { label: "V1", price: 880, desc: "Set Jinwoo V1" },
    { label: "V2 (Shadow Monarch)", price: 3500, desc: "Set Jinwoo Shadow Monarch", tag: "New" },
  ]},
  { name: "Blessed Maiden", variants: [
    { label: "Set", price: 1500, desc: "Set Blessed Maiden" },
  ]},
  { name: "Great Mage (Frieren)", variants: [
    { label: "Set", price: 3250, desc: "Set Frieren dasar" },
    { label: "+F", price: 5500, desc: "Set Frieren + Skill F", tag: "+F" },
  ]},
  { name: "Yamato", variants: [
    { label: "Set", price: 1750, desc: "Set Yamato" },
  ]},
  { name: "Yuji", variants: [
    { label: "Base", price: 525, desc: "Set Yuji" },
  ]},
  { name: "Garou", variants: [
    { label: "Set", price: 4250, desc: "Set Garou dasar" },
    { label: "+F", price: 5450, desc: "Set Garou + Skill F", tag: "+F" },
  ]},
  { name: "DIO (Za Warudo)", variants: [
    { label: "Set", price: 3000, desc: "Set DIO dasar" },
    { label: "+F", price: 6000, desc: "Set DIO + Skill F", tag: "+F" },
  ]},
  { name: "Cid", image: cidImg, variants: [
    { label: "V1", price: 3000, desc: "Set Cid V1" },
    { label: "V2", price: 3800, desc: "Set Cid V2" },
  ]},
  { name: "Goku", variants: [
    { label: "Base", price: 3000, desc: "Set Goku dasar" },
    { label: "+F", price: 3500, desc: "Set Goku Full Power", tag: "+F" },
  ]},
];

export const items: ItemProduct[] = [
  { name: "Mythical Chest", price: 500, unitSize: 1000, unitLabel: "1.000", desc: "1.000 Mythical Chest per pack" },
  { name: "Clan Reroll", price: 300, unitSize: 1000, unitLabel: "1.000", desc: "1.000 Clan Reroll per pack" },
  { name: "Race Reroll", price: 150, unitSize: 1000, unitLabel: "1.000", desc: "1.000 Race Reroll per pack" },
  { name: "Trait Reroll", price: 150, unitSize: 1000, unitLabel: "1.000", desc: "1.000 Trait Reroll per pack" },
  { name: "Broken Sword", price: 200, unitSize: 1000, unitLabel: "1.000", desc: "1.000 Broken Sword per pack" },
  { name: "Boss Key", price: 2000, unitSize: 10000, unitLabel: "10.000", desc: "10.000 Boss Key per pack" },
  { name: "Boss Ticket", price: 430, unitSize: 1000, unitLabel: "1.000", desc: "1.000 Boss Ticket per pack" },
];

export const bundles: BundleProduct[] = [
  { name: "MLEE SEA 2", price: 10000, desc: "DIO Set + Garou Set + Skill F", tag: "Best" },
];

export type Voucher = { code: string; discount: number; valid: string };

export const vouchers: Voucher[] = [
  { code: "ZAMGG11", discount: 20, valid: "21 Juli 2026" },
  { code: "KHAIBRK12", discount: 20, valid: "21 Juli 2026" },
];

export const formatPrice = (n: number) => new Intl.NumberFormat("id-ID").format(n);

export const WA_NUMBER = "6287793264991";
