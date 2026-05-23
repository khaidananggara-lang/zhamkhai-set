import { Product, formatPrice } from "@/lib/catalog";
import { ImageIcon, ShoppingCart } from "lucide-react";

const WA_NUMBER = "6281234567890"; // placeholder

export function ProductCard({ p }: { p: Product }) {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo zhamkhai.point, saya mau order: ${p.name} (Rp ${formatPrice(p.price)}${p.unit ?? ""})`
  )}`;

  const tagColor: Record<string, string> = {
    Hot: "bg-destructive text-destructive-foreground",
    Best: "bg-[var(--gold)] text-primary-foreground",
    New: "bg-[var(--neon)] text-primary-foreground",
    "+F": "bg-accent text-accent-foreground",
  };

  return (
    <div className="group card-glow hover:card-glow-hover relative flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-muted">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageIcon className="h-10 w-10 opacity-40" />
          <span className="text-xs">Gambar menyusul</span>
        </div>
        {p.tag && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagColor[p.tag]}`}
          >
            {p.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold leading-tight text-foreground">{p.name}</h3>
        <p className="text-xs text-muted-foreground">{p.desc}</p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Harga</div>
            <div className="text-lg font-bold text-gradient">
              Rp {formatPrice(p.price)}
              {p.unit && <span className="ml-1 text-xs font-normal text-muted-foreground">{p.unit}</span>}
            </div>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            aria-label={`Beli ${p.name}`}
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Beli
          </a>
        </div>
      </div>
    </div>
  );
}
