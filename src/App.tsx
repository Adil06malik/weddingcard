import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { IndexPage } from "@/pages/IndexPage";
import { WeddingPage } from "@/pages/WeddingPage";
import { NotFound } from "@/pages/NotFound";
import { defaultWeddingSlug } from "@/data/weddingData";

/** Reset scroll position on route change (hash links aside). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route
          path="/wedding"
          element={<Navigate to={`/wedding/${defaultWeddingSlug}`} replace />}
        />
        <Route path="/wedding/:slug" element={<WeddingPage />} />
        <Route path="*" element={<IndexPage />} />
      </Routes>
    </>
  );
}
