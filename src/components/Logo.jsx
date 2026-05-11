/**
 * Logo LexNova.
 * - `monoColor` se usa para wordmark y monograma.
 * - `taglineColor` para "Un nuevo inicio sin deudas".
 * - `size` controla el alto del logo en px (responsive friendly).
 */
export default function Logo({
  monoColor = "#5BA478",
  taglineColor = "#5BA478",
  size = 44,
  withTagline = true,
  className = "",
}) {
  const height = size;
  return (
    <a
      href="#top"
      aria-label="LexNova — Un nuevo inicio sin deudas"
      className={`inline-flex items-center gap-3 group ${className}`}
    >
      {/* Monograma: hoja/circulo abierto evocando renacer */}
      <svg
        height={height}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M28 6c12.15 0 22 9.85 22 22 0 12.15-9.85 22-22 22S6 40.15 6 28C6 15.85 15.85 6 28 6zm0 4.5c-9.665 0-17.5 7.835-17.5 17.5S18.335 45.5 28 45.5c5.7 0 10.762-2.726 13.951-6.946H22.5a3 3 0 010-6h22.83A17.5 17.5 0 0028 10.5z"
          fill={monoColor}
        />
      </svg>

      {/* Wordmark + tagline */}
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-bold tracking-tight"
          style={{
            fontSize: `${height * 0.62}px`,
            color: monoColor,
            lineHeight: 1,
          }}
        >
          LexNova
        </span>
        {withTagline && (
          <span
            className="font-sans mt-1.5 tracking-wide"
            style={{
              fontSize: `${Math.max(height * 0.21, 10)}px`,
              color: taglineColor,
              opacity: 0.9,
              lineHeight: 1.1,
            }}
          >
            Un nuevo inicio sin deudas
          </span>
        )}
      </span>
    </a>
  );
}
