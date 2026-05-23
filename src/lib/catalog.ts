export type Product = {
  name: string;
  price: number;
  desc: string;
  unit?: string;
  tag?: "Hot" | "Best" | "New" | "+F";
};

export const characters: Product[] = [
  { name: "Aizen V1", price: 1100, desc: "Set Aizen V1" },
  { name: "Aizen V2", price: 6000, desc: "Set Aizen V2", tag: "Best" },
  { name: "Gilgamesh Set", price: 1500, desc: "Set Gilgamesh dasar" },
  { name: "Gilgamesh +F", price: 5250, desc: "Set Gilgamesh lengkap + Skill F", tag: "+F" },
  { name: "Madara Set", price: 3000, desc: "Set Madara" },
  { name: "Ice Queen Set", price: 1900, desc: "Set Ice Queen dasar" },
  { name: "Ice Queen +F", price: 2200, desc: "Set Ice Queen + Skill F", tag: "+F" },
  { name: "Sukuna V1", price: 620, desc: "Set Sukuna V1" },
  { name: "Sukuna V2", price: 1600, desc: "Set Sukuna V2" },
  { name: "Sukuna +F", price: 8000, desc: "Set Sukuna lengkap + Skill F", tag: "Hot" },
  { name: "Alucard Set", price: 1100, desc: "Set Alucard" },
  { name: "Gojo V1", price: 515, desc: "Set Gojo V1" },
  { name: "Gojo V2", price: 2000, desc: "Set Gojo V2" },
  { name: "Gojo +F", price: 8000, desc: "Set Gojo lengkap + Skill F", tag: "Hot" },
  { name: "Qinshi Set", price: 1500, desc: "Set Qinshi" },
  { name: "Alter Saber Set", price: 600, desc: "Set Alter Saber dasar" },
  { name: "Alter Saber +F", price: 4800, desc: "Set Alter Saber + Skill F", tag: "+F" },
  { name: "Soul Reaper Set", price: 1500, desc: "Set Soul Reaper" },
  { name: "Anos Set", price: 2000, desc: "Set Anos" },
  { name: "Jinwoo V1", price: 880, desc: "Set Jinwoo V1" },
  { name: "Jinwoo V2 (Shadow Monarch)", price: 3500, desc: "Set Jinwoo Shadow Monarch", tag: "New" },
  { name: "Blessed Maiden Set", price: 1500, desc: "Set Blessed Maiden" },
  { name: "Great Mage (Frieren) Set", price: 3250, desc: "Set Frieren dasar" },
  { name: "Great Mage (Frieren) +F", price: 5500, desc: "Set Frieren + Skill F", tag: "+F" },
  { name: "Yamato Set", price: 1750, desc: "Set Yamato" },
  { name: "Yuji Base", price: 525, desc: "Set Yuji" },
  { name: "Garou Set", price: 4250, desc: "Set Garou dasar" },
  { name: "Garou +F", price: 5450, desc: "Set Garou + Skill F", tag: "+F" },
  { name: "DIO (Za Warudo) Set", price: 3000, desc: "Set DIO dasar" },
  { name: "DIO (Za Warudo) +F", price: 6000, desc: "Set DIO + Skill F", tag: "+F" },
  { name: "Cid V1", price: 3000, desc: "Set Cid V1" },
  { name: "Cid V2", price: 3800, desc: "Set Cid V2" },
  { name: "Goku Base", price: 3000, desc: "Set Goku dasar" },
  { name: "Goku +F", price: 3500, desc: "Set Goku Full Power", tag: "+F" },
];

export const items: Product[] = [
  { name: "Mythical Chest", price: 500, unit: "/ 1.000", desc: "1.000 Mythical Chest" },
  { name: "Clan Reroll", price: 300, unit: "/ 1.000", desc: "1.000 Clan Reroll" },
  { name: "Race Reroll", price: 150, unit: "/ 1.000", desc: "1.000 Race Reroll" },
  { name: "Trait Reroll", price: 150, unit: "/ 1.000", desc: "1.000 Trait Reroll" },
  { name: "Broken Sword", price: 200, unit: "/ 1.000", desc: "1.000 Broken Sword" },
  { name: "Boss Key", price: 2000, unit: "/ 10.000", desc: "10.000 Boss Key" },
  { name: "Boss Ticket", price: 430, unit: "/ 1.000", desc: "1.000 Boss Ticket" },
];

export const bundles: Product[] = [
  { name: "MLEE SEA 2", price: 10000, desc: "DIO Set + Garou Set + Skill F", tag: "Best" },
];

export const vouchers = [
  { code: "ZAMGG11", discount: "20%", valid: "21 Juli 2026" },
  { code: "KHAIBRK12", discount: "20%", valid: "21 Juli 2026" },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("id-ID").format(n);
