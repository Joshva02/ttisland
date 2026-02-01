import {
  Ship,
  Landmark,
  CalendarCheck,
  Fingerprint,
  Car,
  FileCheck,
} from "lucide-react";
import type { ComponentType } from "react";

export interface Service {
  name: string;
  description: string;
  url: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  category: "transport" | "government" | "driving";
}

export const services: Service[] = [
  {
    name: "TTI Ferry",
    description:
      "Book ferry tickets between Trinidad and Tobago. View schedules and fares.",
    url: "https://booking.ttitferry.com",
    icon: Ship,
    category: "transport",
  },
  {
    name: "TTConnect",
    description:
      "Government services portal — start a business, healthcare, housing, and more.",
    url: "https://www.ttconnect.gov.tt",
    icon: Landmark,
    category: "government",
  },
  {
    name: "eAppointment",
    description:
      "Book appointments for government services online. Skip the lines.",
    url: "https://appointments.gov.tt",
    icon: CalendarCheck,
    category: "government",
  },
  {
    name: "Citizen Digital Portal",
    description:
      "Birth certificates, national ID, passports, driver's licenses, tax filings.",
    url: "https://citizendigitalportal.com",
    icon: Fingerprint,
    category: "government",
  },
  {
    name: "TTRegs",
    description:
      "Driving regulations, license preparation, and road test information.",
    url: "https://www.ttregs.com",
    icon: Car,
    category: "driving",
  },
  {
    name: "Vehicle Registration",
    description:
      "Verify vehicle registration status through the Ministry of Works and Transport.",
    url: "https://apps.mowt.gov.tt/vrv",
    icon: FileCheck,
    category: "driving",
  },
];

export const serviceCategories = [
  { key: "transport" as const, label: "Transport" },
  { key: "government" as const, label: "Government" },
  { key: "driving" as const, label: "Driving & Vehicles" },
];
