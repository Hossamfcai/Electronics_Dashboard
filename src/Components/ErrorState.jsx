import { CloudOff, RotateCw, Headphones } from "lucide-react";

export default function ErrorState() {
  return (
    <div className="flex min-h-[520px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest p-8 text-center shadow-sm">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-error/20 bg-error-container/60 text-error shadow-sm">
        <CloudOff className="h-9 w-9" />
      </div>

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-error/20 bg-error/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-error">
        <span className="h-2 w-2 rounded-full bg-error" />
        Connection Failure
      </div>

      <h3 className="mb-2 text-2xl font-bold text-on-surface">
        Unable to Connect to Server
      </h3>

      <p className="mb-6 max-w-md text-sm text-on-surface-variant">
        We encountered an issue retrieving your inventory from the database.
        Please check your network connection.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <butto
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90"
        >
          <RotateCw className="h-5 w-5" />
          Retry Connection
        </butto>

        {/* <button className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-6 py-2.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container">
          <Headphones className="h-5 w-5 text-on-surface-variant" />
          Contact Support
        </button> */}
      </div>
    </div>
  );
}
