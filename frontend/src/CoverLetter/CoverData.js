import Cov1 from "./Cov1";
import Cov2 from "./Cov2";
import Cov3 from "./Cov3";
import Cov4 from "./Cov4";
import Cov5 from "./Cov5";
import Cov6 from "./Cov6";
import Cov7 from "./Cov7";
import Cov8 from "./Cov8";

/**
 * SINGLE SOURCE OF TRUTH
 * 🔥 All cover letter templates defined here
 * 🔥 Numeric + string IDs supported
 */

/* ================================
   TEMPLATE REGISTRY (8/8)
================================ */

export const COVER_TEMPLATES = {
  "cov-classic": {
    id: "1",
    component: Cov1,
    label: "Classic Professional",
    category: "classic",
  },
  "cov-modern": {
    id: "2",
    component: Cov2,
    label: "Modern Clean",
    category: "modern",
  },
  "cov-editorial": {
    id: "3",
    component: Cov3,
    label: "Editorial / Content",
    category: "editorial",
  },
  "cov-executive": {
    id: "4",
    component: Cov4,
    label: "Executive Minimal",
    category: "executive",
  },
  "cov-ats": {
    id: "5",
    component: Cov5,
    label: "ATS Safe (Plain)",
    category: "ats",
  },
  "cov-creative": {
    id: "6",
    component: Cov6,
    label: "Creative Professional",
    category: "creative",
  },
  "cov-startup": {
    id: "7",
    component: Cov7,
    label: "Startup / Tech",
    category: "startup",
  },
  "cov-bold": {
    id: "8",
    component: Cov8,
    label: "Bold Statement",
    category: "bold",
  },
};

/* ================================
   NUMERIC → STRING MAP
   (for /cover/builder/1..8)
================================ */

export const COVER_TEMPLATE_ID_MAP = {
  "1": "cov-classic",
  "2": "cov-modern",
  "3": "cov-editorial",
  "4": "cov-executive",
  "5": "cov-ats",
  "6": "cov-creative",
  "7": "cov-startup",
  "8": "cov-bold",
};

/* ================================
   DEFAULT
================================ */

export const DEFAULT_COVER_TEMPLATE = "cov-classic";
