import bcrypt from "bcryptjs";

const data = {
  users: [],
  products: [
    {
      name: "Men's Solid Regular Shirt Darkblue",
      image: "https://m.media-amazon.com/images/I/91silkm4v5L._UX569_.jpg",
      brand: "Nike",
      category: "Shirts",
      description: "high quality product",
      price: 799,
      countInStock: "10",
      rating: "3.5",
      numReviews: "10",
      __v: 0,
      createdAt: {
        $date: {
          $numberLong: "1643376320842",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1643376320842",
        },
      },
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
    },
    {
      _id: {
        $oid: "61f3eec0a69c48b9f0bddccb",
      },
      name: "Nike Slim Shirt",
      image: "https://m.media-amazon.com/images/I/91silkm4v5L._UX569_.jpg",
      brand: "Nike",
      category: "Shirts",
      description: "high quality product",
      price: 749,
      countInStock: 20,
      rating: 4,
      numReviews: 10,
      __v: 0,
      createdAt: {
        $date: {
          $numberLong: "1643376320843",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1643376320843",
        },
      },
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
    },
    {
      _id: {
        $oid: "61f3eec0a69c48b9f0bddccc",
      },
      name: "Dennis Lingo Men's Black Shirt",
      image: "https://m.media-amazon.com/images/I/61qcnAHZP3L._UX522_.jpg",
      brand: "Dennis Lingo",
      category: "Shirts",
      description: "high quality product",
      price: 499,
      countInStock: "0",
      rating: 4,
      numReviews: "10",
      __v: 0,
      createdAt: {
        $date: {
          $numberLong: "1643376320843",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1643376320843",
        },
      },
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
    },
    {
      _id: {
        $oid: "61f3eec0a69c48b9f0bddccd",
      },
      name: "Men's Cotton Checkered Casual Slim Fit Shirt",
      image: "https://m.media-amazon.com/images/I/61jnRJpgZOS._UX425_.jpg",
      brand: "Bow",
      category: "Shirts",
      description: "high quality product",
      price: 599,
      countInStock: 14,
      rating: 4,
      numReviews: 10,
      __v: 0,
      createdAt: {
        $date: {
          $numberLong: "1643376320843",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1643376320843",
        },
      },
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
    },
    {
      _id: {
        $oid: "61f3eec0a69c48b9f0bddcce",
      },
      name: "Nike Slim Shirt",
      image: "https://m.media-amazon.com/images/I/61DGAlvxRLL._UY741_.jpg",
      brand: "Nike",
      category: "Shirts",
      description: "high quality product",
      price: 120,
      countInStock: 11,
      rating: 4,
      numReviews: 10,
      __v: 0,
      createdAt: {
        $date: {
          $numberLong: "1643376320844",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1643376320844",
        },
      },
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
    },
    {
      _id: {
        $oid: "61f3eec0a69c48b9f0bddccf",
      },
      name: "Nike Slim Shirt",
      image: "https://m.media-amazon.com/images/I/618Wek95laS._UY741_.jpg",
      brand: "Nike",
      category: "Shirts",
      description: "high quality product",
      price: 120,
      countInStock: 12,
      rating: 4,
      numReviews: 10,
      __v: 0,
      createdAt: {
        $date: {
          $numberLong: "1643376320844",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1643376320844",
        },
      },
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
    },
    {
      _id: {
        $oid: "621945bfd17d5d033029abd4",
      },
      name: "Color Block Men Round Neck White T-Shirt",
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
      image:
        "https://rukminim2.flixcart.com/image/750/900/kgfg2vk0-0/t-shirt/p/c/r/l-11533092-roadster-original-imafwnufaufusc2a.jpeg?q=50",
      brand: "Orange",
      category: "T-Shirt",
      description: "10",
      price: 327,
      countInStock: 10,
      rating: 0,
      numReviews: 0,
      createdAt: {
        $date: {
          $numberLong: "1645823423187",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649685162734",
        },
      },
      __v: 1,
      reviews: [],
    },
    {
      _id: {
        $oid: "6219476ee765f7d774108922",
      },
      name: "Striped Round Neck Red T-Shirt",
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
      image:
        "https://rukminim2.flixcart.com/image/750/900/kzzw5u80/t-shirt/o/h/r/m-usts6267-u-s-polo-assn-original-imagbvvha5vwkbpz.jpeg?q=50",
      brand: "Orange",
      category: "T-Shirt",
      description: "10",
      price: 754,
      countInStock: "10",
      rating: 0,
      numReviews: 0,
      createdAt: {
        $date: {
          $numberLong: "1645823855002",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649683527061",
        },
      },
      __v: 1,
      reviews: [],
    },
    {
      _id: {
        $oid: "621bbb48635629c3354439d3",
      },
      name: "Printed Men Round Neck White, Black T-Shirt",
      seller: {
        $oid: "621bbaa4635629c3354439ae",
      },
      image:
        "https://rukminim2.flixcart.com/image/750/900/kflftzk0-0/t-shirt/r/k/m/xxl-udts0549-u-s-polo-assn-original-imafwyfcemhnnhde.jpeg?q=50",
      brand: "Roadster",
      category: "T-Shirt",
      description: "10",
      price: 699,
      countInStock: "10",
      rating: "0",
      numReviews: "0",
      createdAt: {
        $date: {
          $numberLong: "1645984585002",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649683416512",
        },
      },
      __v: 1,
      reviews: [],
    },
    {
      _id: {
        $oid: "621cea97692a4f1df1414a45",
      },
      name: "Shirt",
      seller: {
        $oid: "621bbaa4635629c3354439ae",
      },
      image: "https://m.media-amazon.com/images/I/91silkm4v5L._UX569_.jpg",
      brand: "Sample Brand",
      category: "Shirts",
      description: "Sample Description",
      price: 30,
      countInStock: 10,
      rating: 0,
      numReviews: 0,
      createdAt: {
        $date: {
          $numberLong: "1646062231115",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1646062776758",
        },
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "621d82d99ab97e11267fdfd2",
      },
      name: "Slim Fit Men Light Blue Cotton Blend Trousers",
      seller: {
        $oid: "621bbaa4635629c3354439ae",
      },
      image:
        "https://rukminim2.flixcart.com/image/746/895/kdga1zk0/trouser/m/j/b/30-big-sky-casual-trouser-for-men-fashlook-original-imafucr72pjaxx4a.jpeg?q=50",
      brand: "Roadster",
      category: "Pant",
      description: "20",
      price: 450,
      countInStock: 20,
      rating: 4,
      numReviews: 1,
      createdAt: {
        $date: {
          $numberLong: "1646101209216",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649318971208",
        },
      },
      __v: 1,
      reviews: [
        {
          name: "John",
          comment: "This is nice",
          rating: 4,
          _id: {
            $oid: "621dc3e61982481d78bddcd3",
          },
          createdAt: {
            $date: {
              $numberLong: "1646117862440",
            },
          },
          updatedAt: {
            $date: {
              $numberLong: "1646117862440",
            },
          },
        },
      ],
    },
    {
      _id: {
        $oid: "6234b7e68d4e1921f34729a8",
      },
      name: "Slim Fit Men Khaki Cotton Lycra Blend Trousers",
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
      image:
        "https://rukminim2.flixcart.com/image/750/900/kge0n0w0-0/trouser/f/h/3/44-astfwsrfp20601-allen-solly-original-imafwn8pskeafjt7.jpeg?q=50",
      brand: "Allen Solly",
      category: "Pant",
      description: "11",
      price: 1200,
      countInStock: 11,
      rating: 0,
      numReviews: 0,
      reviews: [],
      createdAt: {
        $date: {
          $numberLong: "1647622118286",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649059767408",
        },
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "623a9e1f722a3eb395d1636f",
      },
      name: "Men Slim Fit Solid Blue Casual Shirt",
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
      image:
        "https://rukminim2.flixcart.com/image/603/724/kfvfwy80-0/shirt/r/l/c/l-c301-peacock-dennis-lingo-original-imafw8fgyuw3dtre.jpeg?q=50",
      brand: "Dennis Lingo",
      price: 500,
      category: "Shirts",
      countInStock: 14,
      description: "14",
      rating: 0,
      numReviews: 0,
      reviews: [],
      createdAt: {
        $date: {
          $numberLong: "1648008736106",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649059209603",
        },
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "62417a4a82a01fa8d39aee44",
      },
      name: "Men Slim Fit Solid Slim Maroon Casual Shirt",
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
      image:
        "https://rukminim2.flixcart.com/image/750/900/kflftzk0-0/shirt/m/3/i/s-c301-burgundy-dennis-lingo-original-imafwyf2pujurzr3.jpeg?q=50",
      brand: "Dennis Lingo",
      price: 500,
      category: "Shirts",
      countInStock: 26,
      description: "26",
      rating: 0,
      numReviews: 0,
      reviews: [],
      createdAt: {
        $date: {
          $numberLong: "1648458314103",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649059122293",
        },
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "624ab4acc12cacdc032fc6e2",
      },
      name: "Striped Men Round Neck White T-Shirt",
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
      image:
        "https://rukminim2.flixcart.com/image/603/724/jr83gy80/t-shirt/k/t/d/l-2215176-roadster-original-imafdfsayjdsgu3z.jpeg?q=50",
      brand: "Roadster",
      price: 399,
      category: "T-Shirt",
      countInStock: 10,
      description: "10",
      rating: 0,
      numReviews: 0,
      reviews: [],
      createdAt: {
        $date: {
          $numberLong: "1649063084887",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649063211773",
        },
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "624b2469c12cacdc032fc757",
      },
      name: "Slim Fit Men Grey Cotton Lycra Blend Trousers",
      seller: {
        $oid: "61ee62d9b18d4f3489e4daf6",
      },
      image:
        "https://rukminim2.flixcart.com/image/746/895/kggviq80-0/trouser/p/k/h/28-ritika-shany-grey-pant-28-freaks-original-imafwpffwrvffdgh.jpeg?q=50",
      brand: "Allen Solly",
      price: 449,
      category: "Pant",
      countInStock: 20,
      description: "20",
      rating: 0,
      numReviews: 0,
      reviews: [],
      createdAt: {
        $date: {
          $numberLong: "1649091689701",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1649318905773",
        },
      },
      __v: 0,
    },
  ],
};
export default data;
