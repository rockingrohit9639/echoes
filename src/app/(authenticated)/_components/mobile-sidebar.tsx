import { MenuIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

type MobileSidebarProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function MobileSidebar({
  className,
  style,
}: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={className}
          style={style}
          icon={<MenuIcon />}
          variant="outline"
        />
      </SheetTrigger>

      <SheetContent>
        <Sidebar className="p-0" />
      </SheetContent>
    </Sheet>
  );
}
