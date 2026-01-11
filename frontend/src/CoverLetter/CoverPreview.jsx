import React from "react";
import {
  COVER_TEMPLATES,
  COVER_TEMPLATE_ID_MAP,
  DEFAULT_COVER_TEMPLATE,
} from "./CoverData";

export default function CoverPreview({ data, templateId }) {
  /**
   * STEP 1:
   * Resolve template key
   * - If numeric (1–8) → map to string key
   * - If already string → use directly
   * - Fallback → default
   */
  const resolvedKey =
    COVER_TEMPLATE_ID_MAP[String(templateId)] ||
    templateId ||
    DEFAULT_COVER_TEMPLATE;

  /**
   * STEP 2:
   * Pick template component safely
   */
  const Template =
    COVER_TEMPLATES[resolvedKey]?.component ||
    COVER_TEMPLATES[DEFAULT_COVER_TEMPLATE].component;

  /**
   * STEP 3:
   * Force remount when template changes
   * (prevents same-design bug)
   */
  return <Template key={resolvedKey} data={data} />;
}
