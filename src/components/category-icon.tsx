import {
  UtensilsCrossed,
  Bed,
  Compass,
  PartyPopper,
  Music,
  Drum,
  ShoppingBag,
  Waves,
  Car,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  UtensilsCrossed,
  Bed,
  Compass,
  PartyPopper,
  Music,
  Drum,
  ShoppingBag,
  Waves,
  Car,
};

export function CategoryIcon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name] || Compass;
  return <Icon size={size} className={className} />;
}
