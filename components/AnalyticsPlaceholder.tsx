export function AnalyticsPlaceholder() {
  return (
    <div aria-hidden="true">
      {/* Placeholder for analytics providers */}
      <script
        id="analytics-placeholder"
        dangerouslySetInnerHTML={{
          __html: `window.__analytics__ = { initialized: false };`
        }}
      />
    </div>
  );
}
