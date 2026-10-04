import { Footer } from "@/components/features/footer";

/**
 * Everything that is not the home.
 *
 * These pages scroll like documents, so they get what the rail refuses: a `<main>` below the
 * 94px of fixed chrome, and a footer at the end. The home has neither — it ends in its own
 * contact panel.
 */
export default function PagesLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="flex min-h-svh flex-col bg-paper">
      <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
