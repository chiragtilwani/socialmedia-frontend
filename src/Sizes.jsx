const SIZES = {
  down(size) {
    const sizes = {
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1199.98px",
      xl: "1920px",
    };
    return `@media (max-width:${sizes[size]})`;
  },
  up(size) {
    const sizes = {
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1199.98px",
      xl: "1920px",
    };
    return `@media (min-width:${sizes[size]})`;
  },
};

export default SIZES;
