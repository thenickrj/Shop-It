export const prices = [
  {
    name: "Any",
    min: 0,
    max: 10000,
  },
  {
    name: (
      <>
        <span className="rupee_symbol">₹</span>1 to{" "}
        <span className="rupee_symbol">₹</span>250
      </>
    ),
    min: 1,
    max: 250,
  },
  {
    name: (
      <>
        <span className="rupee_symbol">₹</span>250 to{" "}
        <span className="rupee_symbol">₹</span>500
      </>
    ),
    min: 250,
    max: 500,
  },
  {
    name: (
      <>
        <span className="rupee_symbol">₹</span>500 to{" "}
        <span className="rupee_symbol">₹</span>750
      </>
    ),
    min: 500,
    max: 750,
  },
  {
    name: (
      <>
        <span className="rupee_symbol">₹</span>750 to{" "}
        <span className="rupee_symbol">₹</span>1000
      </>
    ),
    min: 750,
    max: 1000,
  },
  {
    name: (
      <>
        Above <span className="rupee_symbol">₹</span>1000
      </>
    ),
    min: 1000,
    max: 10000,
  },
];

export const ratings = [
  {
    name: "4 stars & up",
    rating: 4,
  },
  {
    name: "3 stars & up",
    rating: 3,
  },
  {
    name: "2 stars & up",
    rating: 2,
  },
  {
    name: "1 stars & up",
    rating: 1,
  },
];
