import { Package, Search, Plus, Upload } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex min-h-[520px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest p-8 text-center shadow-sm">
      {/* Icon Badge */}
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Package className="h-9 w-9" />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-primary text-on-primary shadow-sm">
          <Search className="h-4 w-4" />
        </div>
      </div>

      {/* Headline & Subtitle */}
      <h3 className="mb-2 text-2xl font-bold text-on-surface">
        No products in inventory yet
      </h3>

      <p className="mb-8 max-w-md text-sm text-on-surface-variant">
        Your inventory is currently empty. Get started by adding your first
        electronic product or adjust your filters.
      </p>

      {/* Actions */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
        <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90">
          <Plus className="h-5 w-5" />
          Add First Product
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container">
          <Upload className="h-5 w-5 text-on-surface-variant" />
          Import CSV
        </button>
      </div>

      {/* Category Tags */}
      <div className="flex w-full max-w-md flex-col items-center gap-3 border-t border-surface-variant pt-6">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant/60">
          Supported Product Categories
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Hardware", "Peripherals", "Accessories", "Software"].map(
            (category) => (
              <span
                key={category}
                className="rounded bg-surface-container-high px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant"
              >
                {category}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
