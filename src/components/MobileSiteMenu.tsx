import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/useTranslation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type MobileSiteMenuLink = {
  label: string;
  href: string;
};

type MobileSiteMenuProps = {
  links: MobileSiteMenuLink[];
  onLeadClick: () => void;
};

export function MobileSiteMenu({ links, onLeadClick }: MobileSiteMenuProps) {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full border-border bg-background text-foreground transition-transform active:scale-[0.96] lg:hidden"
          aria-label={t.common.openMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[86vw] max-w-sm flex-col p-0">
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="font-display text-2xl">{t.common.menu}</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col px-3 py-4" aria-label={t.common.menu}>
          {links.map((link) => {
            const className = "rounded-2xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary";

            return (
              <SheetClose asChild key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link to={link.href} className={className}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className={className}>
                    {link.label}
                  </a>
                )}
              </SheetClose>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-border p-4">
          <LanguageSwitcher className="w-full justify-center" />
          <SheetClose asChild>
            <Button
              type="button"
              className="h-12 w-full rounded-full bg-foreground text-sm font-semibold text-background transition-transform hover:bg-primary hover:text-background active:scale-[0.96]"
              onClick={onLeadClick}
            >
              {t.common.bookCall}
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
