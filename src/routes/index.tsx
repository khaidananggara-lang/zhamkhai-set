import { createFileRoute } from "@tanstack/react-router";
import { characters, items, bundles, vouchers } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, Shield, Zap, Ticket, MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "zhamkhai.point — Jual Set & Item Sailor Piece Roblox Murah" },
      {
        name: "description",
        content:
          "Toko terpercaya zhamkhai.point. Jual set karakter, item, dan bundling Sailor Piece Roblox: Aizen, Gojo, Sukuna, DIO, Goku, Jinwoo dan lainnya dengan harga terbaik.",
      },
      { property: "og:title", content: "zhamkhai.point — Sailor Piece Shop" },
      { property: "og:description", content: "Set karakter & item Sailor Piece Roblox harga terbaik." },
    ],
  }),
});

function Index() {
  const [q, setQ] = useState("");

  const match = (name: string) => name.toLowerCase().includes(q.toLowerCase());
  const filteredChars = useMemo(() => characters.filter((p) => match(p.name)), [q]);
  const filteredItems = useMemo(() => items.filter((p) => match(p.name)), [q]);
  const filteredBundles = useMemo(() => bundles.filter((p) => match(p.name)), [q]);

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <img src={logo} alt="Logo zhamkhai.point" className="h-10 w-10 rounded-lg object-cover ring-1 ring-border" />
            <div className="leading-tight">
              <div className="font-bold tracking-tight">zhamkhai<span className="text-gradient">.point</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sailor Piece Shop</div>
            </div>
          </a>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="#karakter" className="hover:text-foreground">Karakter</a>
            <a href="#item" className="hover:text-foreground">Item</a>
            <a href="#bundling" className="hover:text-foreground">Bundling</a>
            <a href="#voucher" className="hover:text-foreground">Voucher</a>
          </nav>
          <a
href="https://wa.me/6287793264991"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Order
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="bg-hero relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <img
              src={logo}
              alt="Logo zhamkhai.point"
              className="mx-auto mb-6 h-28 w-28 rounded-full object-cover shadow-2xl ring-2 ring-primary/40 md:h-36 md:w-36"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" /> Roblox · Sailor Piece
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Set Karakter & Item <span className="text-gradient">Sailor Piece</span> Termurah
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground">
              Toko resmi <strong className="text-foreground">zhamkhai.point</strong>. Aizen, Gojo, Sukuna, DIO, Goku, Jinwoo & lainnya — proses cepat, aman, dan terpercaya.
            </p>

            <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2 backdrop-blur">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari karakter atau item…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Cari produk"
              />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 text-left md:gap-6">
              {[
                { icon: Zap, t: "Proses Cepat", d: "Pengiriman in-game ≤ 10 menit" },
                { icon: Shield, t: "100% Aman", d: "Garansi & bukti transaksi" },
                { icon: Ticket, t: "Voucher Aktif", d: "Diskon hingga 20%" },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
                  <Icon className="h-5 w-5 text-accent" />
                  <div className="mt-2 text-sm font-semibold">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Voucher */}
      <section id="voucher" className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle eyebrow="Promo" title="Voucher Aktif" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {vouchers.map((v) => (
            <div
              key={v.code}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 card-glow"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Kode Voucher</div>
                  <div className="mt-1 font-mono text-2xl font-bold text-gradient">{v.code}</div>
                  <div className="mt-2 text-xs text-muted-foreground">Berlaku sampai {v.valid}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Diskon</div>
                  <div className="text-3xl font-extrabold text-[var(--neon)]">{v.discount}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bundling */}
      <section id="bundling" className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle eyebrow="Hemat" title="Bundling Spesial" />
        <Grid>
          {filteredBundles.map((p) => <ProductCard key={p.name} mode={{ kind: "bundle", bundle: p }} />)}
        </Grid>
        {filteredBundles.length === 0 && <Empty />}
      </section>

      {/* Karakter */}
      <section id="karakter" className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle eyebrow="Katalog" title="Set Karakter" count={filteredChars.length} />
        <Grid>
          {filteredChars.map((p) => <ProductCard key={p.name} mode={{ kind: "character", group: p }} />)}
        </Grid>
        {filteredChars.length === 0 && <Empty />}
      </section>

      {/* Item */}
      <section id="item" className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle eyebrow="In-Game" title="Item & Reroll" count={filteredItems.length} />
        <Grid>
          {filteredItems.map((p) => <ProductCard key={p.name} mode={{ kind: "item", item: p }} />)}
        </Grid>
        {filteredItems.length === 0 && <Empty />}
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-base font-bold text-foreground">zhamkhai<span className="text-gradient">.point</span></div>
              <p className="mt-1 max-w-md text-xs">
                Toko jual beli set karakter & item game Sailor Piece (Roblox). Bukan afiliasi resmi Roblox / Sailor Piece.
              </p>
            </div>
            <a
              href="https://wa.me/6287793264991"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Hubungi via WhatsApp
            </a>
          </div>
          <div className="mt-6 text-center text-xs">© {new Date().getFullYear()} zhamkhai.point — All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}

function SectionTitle({ eyebrow, title, count }: { eyebrow: string; title: string; count?: number }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</div>
        <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      </div>
      {typeof count === "number" && (
        <div className="text-sm text-muted-foreground">{count} produk</div>
      )}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{children}</div>
  );
}

function Empty() {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
      Tidak ada produk yang cocok dengan pencarian.
    </div>
  );
}
