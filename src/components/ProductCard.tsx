import { useMemo, useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon, ShoppingCart, Minus, Plus, MessageCircle, Tag, Check } from "lucide-react";
import {
  CharacterGroup, ItemProduct, BundleProduct, Variant,
  vouchers, formatPrice, WA_NUMBER,
} from "@/lib/catalog";

type Mode =
  | { kind: "character"; group: CharacterGroup }
  | { kind: "item"; item: ItemProduct }
  | { kind: "bundle"; bundle: BundleProduct };

function previewPrice(mode: Mode): { price: number; tag?: string; sublabel?: string } {
  if (mode.kind === "character") {
    const v = mode.group.variants[0];
    return { price: v.price, tag: v.tag, sublabel: mode.group.variants.length > 1 ? `${mode.group.variants.length} varian` : v.label };
  }
  if (mode.kind === "item") return { price: mode.item.price, tag: mode.item.tag, sublabel: `/ ${mode.item.unitLabel}` };
  return { price: mode.bundle.price, tag: mode.bundle.tag };
}

function title(mode: Mode): string {
  if (mode.kind === "character") return mode.group.name;
  if (mode.kind === "item") return mode.item.name;
  return mode.bundle.name;
}

function description(mode: Mode): string {
  if (mode.kind === "character") return mode.group.variants.map((v) => v.label).join(" · ");
  if (mode.kind === "item") return mode.item.desc;
  return mode.bundle.desc;
}

const tagColor: Record<string, string> = {
  Hot: "bg-destructive text-destructive-foreground",
  Best: "bg-[var(--gold)] text-primary-foreground",
  New: "bg-[var(--neon)] text-primary-foreground",
  "+F": "bg-accent text-accent-foreground",
};

export function ProductCard({ mode }: { mode: Mode }) {
  const [open, setOpen] = useState(false);
  const pv = previewPrice(mode);

  return (
    <div className="group card-glow hover:card-glow-hover relative flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-muted">
        {mode.kind === "character" && mode.group.image ? (
          <img src={mode.group.image} alt={mode.group.name} className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="h-10 w-10 opacity-40" />
            <span className="text-xs">Gambar menyusul</span>
          </div>
        )}
        {pv.tag && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagColor[pv.tag]}`}>
            {pv.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold leading-tight text-foreground">{title(mode)}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{description(mode)}</p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {mode.kind === "character" && mode.group.variants.length > 1 ? "Mulai dari" : "Harga"}
            </div>
            <div className="text-lg font-bold text-gradient">
              Rp {formatPrice(pv.price)}
              {pv.sublabel && mode.kind === "item" && (
                <span className="ml-1 text-xs font-normal text-muted-foreground">{pv.sublabel}</span>
              )}
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                aria-label={`Beli ${title(mode)}`}
              >
                <ShoppingCart className="h-3.5 w-3.5" /> Beli
              </button>
            </DialogTrigger>
            <CheckoutDialog mode={mode} onDone={() => setOpen(false)} />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

function CheckoutDialog({ mode, onDone }: { mode: Mode; onDone: () => void }) {
  const initialVariant: Variant =
    mode.kind === "character"
      ? mode.group.variants[0]
      : mode.kind === "item"
      ? { label: mode.item.unitLabel, price: mode.item.price, desc: mode.item.desc }
      : { label: "Bundle", price: mode.bundle.price, desc: mode.bundle.desc };

  const [variant, setVariant] = useState<Variant>(initialVariant);
  const [qty, setQty] = useState(1);
  const [voucher, setVoucher] = useState<string>("");

  const v = mode.kind === "character" ? variant : initialVariant;
  const subtotal = v.price * qty;
  const discountPct = vouchers.find((x) => x.code === voucher)?.discount ?? 0;
  const discount = Math.round((subtotal * discountPct) / 100);
  const total = subtotal - discount;

  const qtyLabel = useMemo(() => {
    if (mode.kind === "item") return `${qty} pack (${formatPrice(qty * mode.item.unitSize)} ${mode.item.name})`;
    return `${qty}x`;
  }, [qty, mode]);

  const orderText = useMemo(() => {
    const lines = [
      `Halo zhamkhai.point, saya mau order:`,
      mode.kind === "character"
        ? `• ${mode.group.name} — ${v.label}`
        : mode.kind === "item"
        ? `• ${mode.item.name} (per ${mode.item.unitLabel})`
        : `• ${mode.bundle.name}`,
      `• Jumlah: ${qtyLabel}`,
      `• Subtotal: Rp ${formatPrice(subtotal)}`,
      voucher ? `• Voucher: ${voucher} (-${discountPct}% = Rp ${formatPrice(discount)})` : null,
      `• Total: Rp ${formatPrice(total)}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [mode, v, qtyLabel, subtotal, voucher, discountPct, discount, total]);

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(orderText)}`;

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl">{title(mode)}</DialogTitle>
        <DialogDescription>{description(mode)}</DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        {mode.kind === "character" && mode.group.variants.length > 1 && (
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pilih Varian</div>
            <div className="flex flex-wrap gap-2">
              {mode.group.variants.map((opt) => {
                const active = opt.label === variant.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setVariant(opt)}
                    className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                      active
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card hover:border-primary/60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      {active && <Check className="h-3 w-3" />}
                      {opt.label}
                      {opt.tag && <span className={`rounded px-1.5 py-0.5 text-[9px] ${tagColor[opt.tag]}`}>{opt.tag}</span>}
                    </div>
                    <div className="mt-0.5 text-muted-foreground">Rp {formatPrice(opt.price)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Kuantitas {mode.kind === "item" && `(per pack ${mode.item.unitLabel})`}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border bg-card">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-foreground"
                aria-label="Kurang"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
                className="h-10 w-14 bg-transparent text-center text-sm font-semibold outline-none"
              />
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-foreground"
                aria-label="Tambah"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {mode.kind === "item" && (
              <div className="text-xs text-muted-foreground">
                = {formatPrice(qty * mode.item.unitSize)} {mode.item.name}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Tag className="h-3.5 w-3.5" /> Voucher
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setVoucher("")}
              className={`rounded-lg border px-3 py-2 text-xs transition ${
                voucher === "" ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"
              }`}
            >
              Tanpa voucher
            </button>
            {vouchers.map((vc) => {
              const active = voucher === vc.code;
              return (
                <button
                  key={vc.code}
                  onClick={() => setVoucher(vc.code)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                    active ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono font-semibold">
                    {active && <Check className="h-3 w-3" />} {vc.code}
                  </div>
                  <div className="text-[10px] text-[var(--neon)]">-{vc.discount}%</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4 text-sm">
          <Row label="Subtotal" value={`Rp ${formatPrice(subtotal)}`} />
          {discount > 0 && (
            <Row label={`Diskon (${voucher} -${discountPct}%)`} value={`- Rp ${formatPrice(discount)}`} accent />
          )}
          <div className="my-2 border-t border-border" />
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-gradient">Rp {formatPrice(total)}</span>
          </div>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          onClick={onDone}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" /> Lanjut order via WhatsApp
        </a>
        <p className="text-center text-[10px] text-muted-foreground">
          Pembayaran & pengiriman dikonfirmasi via WhatsApp.
        </p>
      </div>
    </DialogContent>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-[var(--neon)]" : "text-foreground"}>{value}</span>
    </div>
  );
}
