"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Phone,
  Globe,
  Mail,
  Printer,
  Navigation2,
  Ticket,
} from "lucide-react";
import { Listing } from "@/lib/types";

export function ListingModal({
  item,
  open,
  onClose,
}: {
  item: Listing;
  open: boolean;
  onClose: () => void;
}) {
  const addressLine = item.address?.replace(/\n/g, ", ").trim();

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, handleEsc]);

  const hasActions =
    item.address ||
    (item.phone && item.phone.length > 0) ||
    item.email ||
    item.website ||
    item.ticketUrl;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-auto z-[101] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[var(--bg)] border border-[var(--rule)] sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 bg-[var(--bg)] border-b border-[var(--rule)]">
              <div className="min-w-0">
                {(item.type || item.section) && (
                  <span className="label-mono text-[var(--terra)] block mb-2">
                    {item.type ||
                      item.section?.replace(
                        /^(Restaurants|Hotels|Bars|Nightclubs)\s*-\s*/i,
                        ""
                      )}
                  </span>
                )}
                <h2 className="heading-display text-2xl md:text-3xl text-[var(--fg)] leading-tight">
                  {item.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-10 h-10 flex items-center justify-center text-[var(--faded)] hover:text-[var(--fg)] transition-colors -mt-1 -mr-1"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Action buttons */}
              {hasActions && (
                <div className="flex flex-wrap gap-2">
                  {item.address && (
                    <ActionButton
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressLine || "")}`}
                      icon={<Navigation2 size={14} />}
                      label="Directions"
                    />
                  )}
                  {item.phone && item.phone.length > 0 && (
                    <ActionButton
                      href={`tel:${item.phone[0].replace(/[^0-9+]/g, "")}`}
                      icon={<Phone size={14} />}
                      label="Call"
                    />
                  )}
                  {item.email && (
                    <ActionButton
                      href={`mailto:${item.email}`}
                      icon={<Mail size={14} />}
                      label="Email"
                    />
                  )}
                  {item.website && (
                    <ActionButton
                      href={
                        item.website.startsWith("http")
                          ? item.website
                          : `http://${item.website}`
                      }
                      icon={<Globe size={14} />}
                      label="Website"
                      external
                    />
                  )}
                  {item.ticketUrl && (
                    <a
                      href={item.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[var(--terra)] text-white text-xs font-[var(--font-display)] font-semibold hover:bg-[#A30D1E] transition-colors min-h-[44px]"
                      style={{ borderRadius: "2px" }}
                    >
                      <Ticket size={14} />
                      Tickets
                    </a>
                  )}
                </div>
              )}

              {item.description && (
                <p className="text-sm text-[var(--faded)] leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Detail rows */}
              <div className="space-y-4">
                {addressLine && (
                  <DetailRow
                    icon={<MapPin size={15} />}
                    label="Address"
                    value={addressLine}
                  />
                )}

                {item.phone && item.phone.length > 0 && (
                  <DetailRow
                    icon={<Phone size={15} />}
                    label="Phone"
                    value={
                      <span className="flex flex-wrap gap-x-4 gap-y-1">
                        {item.phone.map((p, i) => (
                          <a
                            key={i}
                            href={`tel:${p.replace(/[^0-9+]/g, "")}`}
                            className="text-[var(--fg)] hover:text-[var(--terra)] transition-colors"
                          >
                            {p}
                          </a>
                        ))}
                      </span>
                    }
                  />
                )}

                {item.website && (
                  <DetailRow
                    icon={<Globe size={15} />}
                    label="Website"
                    value={
                      <a
                        href={
                          item.website.startsWith("http")
                            ? item.website
                            : `http://${item.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--fg)] hover:text-[var(--terra)] transition-colors underline underline-offset-2"
                      >
                        {item.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    }
                  />
                )}

                {item.email && (
                  <DetailRow
                    icon={<Mail size={15} />}
                    label="Email"
                    value={
                      <a
                        href={`mailto:${item.email}`}
                        className="text-[var(--fg)] hover:text-[var(--terra)] transition-colors underline underline-offset-2"
                      >
                        {item.email}
                      </a>
                    }
                  />
                )}

                {item.fax && item.fax.length > 0 && (
                  <DetailRow
                    icon={<Printer size={15} />}
                    label="Fax"
                    value={item.fax.join(", ")}
                  />
                )}

                {item.island && (
                  <DetailRow
                    icon={<MapPin size={15} />}
                    label="Island"
                    value={item.island}
                  />
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ActionButton({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-[var(--rule)] text-xs font-[var(--font-display)] font-medium text-[var(--faded)] hover:border-[var(--fg)] hover:text-[var(--fg)] transition-colors min-h-[44px]"
      style={{ borderRadius: "2px" }}
    >
      {icon}
      {label}
    </a>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="shrink-0 text-[var(--faded)] mt-0.5">{icon}</span>
      <div className="min-w-0">
        <span className="label-mono text-[var(--faded)] block mb-1">
          {label}
        </span>
        <div className="text-sm text-[var(--fg)] leading-relaxed break-words">
          {value}
        </div>
      </div>
    </div>
  );
}
