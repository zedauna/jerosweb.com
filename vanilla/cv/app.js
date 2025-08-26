const colorsTablo = [
  "#63b598",
  "#ce7d78",
  "#ea9e70",
  "#a48a9e",
  "#c6e1e8",
  "#648177",
  "#0d5ac1",

  "#f205e6",
  "#1c0365",
  "#14a9ad",
  "#4ca2f9",
  "#a4e43f",
  "#d298e2",
  "#6119d0",

  "#d2737d",
  "#c0a43c",
  "#f2510e",
  "#651be6",
  "#79806e",
  "#61da5e",
  "#cd2f00",

  "#9348af",
  "#01ac53",
  "#c5a4fb",
  "#996635",
  "#b11573",
  "#4bb473",
  "#75d89e",

  "#2f3f94",
  "#2f7b99",
  "#da967d",
  "#34891f",
  "#b0d87b",
  "#ca4751",
  "#7e50a8",

  "#c4d647",
  "#e0eeb8",
  "#11dec1",
  "#289812",
  "#566ca0",
  "#ffdbe1",
  "#2f1179",

  "#935b6d",
  "#916988",
  "#513d98",
  "#aead3a",
  "#9e6d71",
  "#4b5bdc",
  "#0cd36d",

  "#250662",
  "#cb5bea",
  "#228916",
  "#ac3e1b",
  "#df514a",
  "#539397",
  "#880977",

  "#f697c1",
  "#ba96ce",
  "#679c9d",
  "#c6c42c",
  "#5d2c52",
  "#48b41b",
  "#e1cf3b",

  "#5be4f0",
  "#57c4d8",
  "#a4d17a",
  "#225b8",
  "#be608b",
  "#96b00c",
  "#088baf",

  "#f158bf",
  "#e145ba",
  "#ee91e3",
  "#05d371",
  "#5426e0",
  "#4834d0",
  "#802234",

  "#6749e8",
  "#0971f0",
  "#8fb413",
  "#b2b4f0",
  "#c3c89d",
  "#c9a941",
  "#41d158",

  "#fb21a3",
  "#51aed9",
  "#5bb32d",
  "#807fb",
  "#21538e",
  "#89d534",
  "#d36647",

  "#7fb411",
  "#0023b8",
  "#3b8c2a",
  "#986b53",
  "#f50422",
  "#983f7a",
  "#ea24a3",

  "#79352c",
  "#521250",
  "#c79ed2",
  "#d6dd92",
  "#e33e52",
  "#b2be57",
  "#fa06ec",

  "#1bb699",
  "#6b2e5f",
  "#64820f",
  "#1c271",
  "#21538e",
  "#89d534",
  "#d36647",

  "#7fb411",
  "#0023b8",
  "#3b8c2a",
  "#986b53",
  "#f50422",
  "#983f7a",
  "#ea24a3",

  "#79352c",
  "#521250",
  "#c79ed2",
  "#d6dd92",
  "#e33e52",
  "#b2be57",
  "#fa06ec",

  "#1bb699",
  "#6b2e5f",
  "#64820f",
  "#1c271",
  "#9cb64a",
  "#996c48",
  "#9ab9b7",

  "#06e052",
  "#e3a481",
  "#0eb621",
  "#fc458e",
  "#b2db15",
  "#aa226d",
  "#792ed8",

  "#73872a",
  "#520d3a",
  "#cefcb8",
  "#a5b3d9",
  "#7d1d85",
  "#c4fd57",
  "#f1ae16",

  "#8fe22a",
  "#ef6e3c",
  "#243eeb",
  "#1dc18",
  "#dd93fd",
  "#3f8473",
  "#e7dbce",

  "#421f79",
  "#7a3d93",
  "#635f6d",
  "#93f2d7",
  "#9b5c2a",
  "#15b9ee",
  "#0f5997",

  "#409188",
  "#911e20",
  "#1350ce",
  "#10e5b1",
  "#fff4d7",
  "#cb2582",
  "#ce00be",

  "#32d5d6",
  "#17232",
  "#608572",
  "#c79bc2",
  "#00f87c",
  "#77772a",
  "#6995ba",

  "#fc6b57",
  "#f07815",
  "#8fd883",
  "#060e27",
  "#96e591",
  "#21d52e",
  "#d00043",

  "#b47162",
  "#1ec227",
  "#4f0f6f",
  "#1d1d58",
  "#947002",
  "#bde052",
  "#e08c56",

  "#28fcfd",
  "#bb09b",
  "#36486a",
  "#d02e29",
  "#1ae6db",
  "#3e464c",
  "#a84a8f",

  "#911e7e",
  "#3f16d9",
  "#0f525f",
  "#ac7c0a",
  "#b4c086",
  "#c9d730",
  "#30cc49",

  "#3d6751",
  "#fb4c03",
  "#640fc1",
  "#62c03e",
  "#d3493a",
  "#88aa0b",
  "#406df9",

  "#615af0",
  "#4be47",
  "#2a3434",
  "#4a543f",
  "#79bca0",
  "#a8b8d4",
  "#00efd4",

  "#7ad236",
  "#7260d8",
  "#1deaa7",
  "#06f43a",
  "#823c59",
  "#e3d94c",
  "#dc1c06",

  "#f53b2a",
  "#b46238",
  "#2dfff6",
  "#a82b89",
  "#1a8011",
  "#436a9f",
  "#1a806a",

  "#4cf09d",
  "#c188a2",
  "#67eb4b",
  "#b308d3",
  "#fc7e41",
  "#af3101",
  "#ff065",

  "#71b1f4",
  "#a2f8a5",
  "#e23dd0",
  "#d3486d",
  "#00f7f9",
  "#474893",
  "#3cec35",

  "#1c65cb",
  "#5d1d0c",
  "#2d7d2a",
  "#ff3420",
  "#5cdd87",
  "#a259a4",
  "#e4ac44",

  "#1bede6",
  "#8798a4",
  "#d7790f",
  "#b2c24f",
  "#de73c2",
  "#d70a9c",
  "#25b67",

  "#88e9b8",
  "#c2b0e2",
  "#86e98f",
  "#ae90e2",
  "#1a806b",
  "#436a9e",
  "#0ec0ff",

  "#f812b3",
  "#b17fc9",
  "#8d6c2f",
  "#d3277a",
  "#2ca1ae",
  "#9685eb",
  "#8a96c6",

  "#dba2e6",
  "#76fc1b",
  "#608fa4",
  "#20f6ba",
  "#07d7f6",
  "#dce77a",
  "#77ecca",

  "AliceBlue",

  "AntiqueWhite",

  "Aqua",

  "Aquamarine",

  "Azure",

  "Beige",

  "Bisque",

  "Black",

  "BlanchedAlmond",

  "Blue",

  "BlueViolet",

  "Brown",

  "BurlyWood",

  "CadetBlue",

  "Chartreuse",

  "Chocolate",

  "Coral",

  "CornflowerBlue",

  "Cornsilk",

  "Crimson",

  "Cyan",

  "DarkBlue",

  "DarkCyan",

  "DarkGoldenRod",

  "DarkGray",

  "DarkGrey",

  "DarkGreen",

  "DarkKhaki",

  "DarkMagenta",

  "DarkOliveGreen",

  "DarkOrange",

  "DarkOrchid",

  "DarkRed",

  "DarkSalmon",

  "DarkSeaGreen",

  "DarkSlateBlue",

  "DarkSlateGray",

  "DarkSlateGrey",

  "DarkTurquoise",

  "DarkViolet",

  "DeepPink",

  "DeepSkyBlue",

  "DimGray",

  "DimGrey",

  "DodgerBlue",

  "FireBrick",

  "FloralWhite",

  "ForestGreen",

  "Fuchsia",

  "Gainsboro",

  "GhostWhite",

  "Gold",

  "GoldenRod",

  "Gray",

  "Grey",

  "Green",

  "GreenYellow",

  "HoneyDew",

  "HotPink",

  "IndianRed",

  "Indigo",

  "Ivory",

  "Khaki",

  "Lavender",

  "LavenderBlush",

  "LawnGreen",

  "LemonChiffon",

  "LightBlue",

  "LightCoral",

  "LightCyan",

  "LightGoldenRodYellow",

  "LightGray",

  "LightGrey",

  "LightGreen",

  "LightPink",

  "LightSalmon",

  "LightSeaGreen",

  "LightSkyBlue",

  "LightSlateGray",

  "LightSlateGrey",

  "LightSteelBlue",

  "LightYellow",

  "Lime",

  "LimeGreen",

  "Linen",

  "Magenta",

  "Maroon",

  "MediumAquaMarine",

  "MediumBlue",

  "MediumOrchid",

  "MediumPurple",

  "MediumSeaGreen",

  "MediumSlateBlue",

  "MediumSpringGreen",

  "MediumTurquoise",

  "MediumVioletRed",

  "MidnightBlue",

  "MintCream",

  "MistyRose",

  "Moccasin",

  "NavajoWhite",

  "Navy",

  "OldLace",

  "Olive",

  "OliveDrab",

  "Orange",

  "OrangeRed",

  "Orchid",

  "PaleGoldenRod",

  "PaleGreen",

  "PaleTurquoise",

  "PaleVioletRed",

  "PapayaWhip",

  "PeachPuff",

  "Peru",

  "Pink",

  "Plum",

  "PowderBlue",

  "Purple",

  "RebeccaPurple",

  "Red",

  "RosyBrown",

  "RoyalBlue",

  "SaddleBrown",

  "Salmon",

  "SandyBrown",

  "SeaGreen",

  "SeaShell",

  "Sienna",

  "Silver",

  "SkyBlue",

  "SlateBlue",

  "SlateGray",

  "SlateGrey",

  "Snow",

  "SpringGreen",

  "SteelBlue",

  "Tan",

  "Teal",

  "Thistle",

  "Tomato",

  "Turquoise",

  "Violet",

  "Wheat",

  "White",

  "WhiteSmoke",

  "Yellow",

  "YellowGreen",
];

//Generateur d'index aléatoire

function getRandomInteger(min, max) {
  min = Math.ceil(min);

  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

changeColorRandom = (id = "#colorChange", duration = 1000) => {
  return window.setInterval(function () {
    var color = colorsTablo[getRandomInteger(0, colorsTablo.length)];

    document.querySelector(id).style.color = color;
  }, duration);
};

changeColorRandom((id = ".ChangeColor1"), (duration = 1000));
changeColorRandom((id = ".ChangeColor2"), (duration = 1000));
changeColorRandom((id = ".ChangeColor3"), (duration = 1000));
changeColorRandom((id = ".ChangeColor4"), (duration = 1000));
changeColorRandom((id = ".ChangeColor5"), (duration = 1000));
changeColorRandom((id = ".ChangeColor6"), (duration = 1000));
changeColorRandom((id = ".ChangeColor7"), (duration = 1000));
changeColorRandom((id = ".ChangeColor8"), (duration = 1000));
changeColorRandom((id = ".ChangeColor9"), (duration = 1000));
changeColorRandom((id = ".ChangeColor10"), (duration = 1000));
// changeColorRandom((id = ".ChangeColor10"), (duration = 1000));

//calcul annee_experience
const d = new Date();
let year = d.getFullYear();
document.querySelector(".annee_experience").textContent = year - 2019;
document.querySelector(".year").textContent = year;
// console.log(year-2019);

//ramdom image
(function () {
  let list_images = [
    "wordcloud.svg",
    "wordcloud1.svg",
    "wordcloud2.svg",
    "wordcloud3.svg",
    "wordcloud4.svg",

    "wordcloud5.svg",
    "wordcloud6.svg",
    "wordcloud7.svg",
    "wordcloud8.svg",
    "wordcloud9.svg",
  ];

  let target = document.querySelector("#image_nuage");

  setInterval(function () {
    if (target.className == "animation_image_entre") {
      target.classList.remove("animation_image_entre");

      target.classList.add("animation_image_sortie");
    } else {
      target.classList.add("animation_image_entre");

      target.classList.remove("animation_image_sortie");
    }

    let image = list_images[getRandomInteger(0, list_images.length)];

    target.src = "./cv/img/nuages_mots/" + image;
  }, 1000);
})();

// particles

const moule_particles = (id = "tsparticles") => {
  return tsParticles.load(id, {
    fullScreen: {
      enable: true,
    },

    fpsLimit: 60,

    particles: {
      groups: {
        z5000: {
          number: {
            value: 70,
          },

          zIndex: {
            value: 5000,
          },
        },

        z7500: {
          number: {
            value: 30,
          },

          zIndex: {
            value: 7500,
          },
        },

        z2500: {
          number: {
            value: 50,
          },

          zIndex: {
            value: 2500,
          },
        },

        z1000: {
          number: {
            value: 40,
          },

          zIndex: {
            value: 1000,
          },
        },
      },

      number: {
        value: 200,

        density: {
          enable: false,

          value_area: 800,
        },
      },

      color: {
        value: "#fff",

        animation: {
          enable: false,

          speed: 20,

          sync: true,
        },
      },

      shape: {
        type: "circle",
      },

      opacity: {
        value: 1,

        random: false,

        animation: {
          enable: false,

          speed: 3,

          minimumValue: 0.1,

          sync: false,
        },
      },

      size: {
        value: 3,
      },

      links: {
        enable: false,

        distance: 100,

        color: "#ffffff",

        opacity: 0.4,

        width: 1,
      },

      move: {
        angle: {
          value: 10,

          offset: 0,
        },

        enable: true,

        speed: {
          min: 3,

          max: 5,
        },

        direction: "right",

        random: false,

        straight: false,

        outModes: {
          default: "out",
        },

        attract: {
          enable: false,

          rotateX: 600,

          rotateY: 1200,
        },
      },

      zIndex: {
        value: 500,

        opacityRate: 0.5,
      },
    },

    interactivity: {
      detectsOn: "canvas",

      events: {
        onHover: {
          enable: false,

          mode: "repulse",
        },

        onClick: {
          enable: true,

          mode: "push",
        },

        resize: true,
      },

      modes: {
        grab: {
          distance: 400,

          links: {
            opacity: 1,
          },
        },

        bubble: {
          distance: 400,

          size: 40,

          duration: 2,

          opacity: 0.8,
        },

        repulse: {
          distance: 200,
        },

        push: {
          quantity: 4,

          groups: ["z5000", "z7500", "z2500", "z1000"],
        },

        remove: {
          quantity: 2,
        },
      },
    },

    detectRetina: true,

    background: {
      color: "#000000",

      image: "",

      position: "50% 50%",

      repeat: "no-repeat",

      size: "cover",
    },
  });
};

moule_particles((id = "tsparticles_head"));

//typerwriter
const typewriter = new Typewriter("#typewriter", {
  loop: true,

  deleteSpeed: 20,
});

typewriter
  .changeDelay(30)

  .typeString('Mon <span style="color: #27ae60"> Portfolio </span>!')

  .pauseFor(2500)

  .deleteAll()

  .pauseFor(2500)

  .changeCursor("📊 📈 📉")

  .typeString('Administrateur  <span style="color:#FC1443"> SI </span> !')

  .pauseFor(2500)

  .deleteAll()

  .changeCursor("🎲")

.typeString('Développeur <span style="color:#FF1493"> Web / Analyst </span> !')

  .pauseFor(2500)

  .deleteAll()

  .changeCursor("🌎")

  .typeString('Développeur <span style="color:#FF1493"> SIG </span>!')

  .pauseFor(2500)

  .deleteAll()

  .changeCursor("#")

  .typeString('Développeur <span style="color:#FF4500"> WebMapping </span>!')

  .pauseFor(2500)

  .deleteAll()

  .changeCursor("!")

  .pauseFor(2500)

  .typeString('Développeur <span style="color:#0EC1F1"> Python 🐍 </span> !')

  .pauseFor(2500)

  .deleteAll()

  .changeCursor('~')

  .typeString('Développeur &&  <span style="color:#0ECF"> Golang ... </span>')

  .pauseFor(2500)

  .start();

// animation background
var control = document.querySelector("#control");
var sections = control.querySelectorAll("section");
var header = document.querySelector("header");
var footer = document.querySelector("footer");
sections.forEach(function (section) {
  header.addEventListener("mouseover", function (e) {
    section.classList.toggle("active");
  });
  header.addEventListener("mouseout", function (e) {
    section.classList.toggle("no_active");
  });

  footer.addEventListener("mouseover", function (e) {
    section.classList.toggle("active");
  });
  footer.addEventListener("mouseout", function (e) {
    section.classList.toggle("no_active");
  });

  // mobile
  header.addEventListener("touchstart", function (e) {
    section.classList.toggle("active");
  });
  header.addEventListener("touchend", function (e) {
    section.classList.toggle("no_active");
  });

  footer.addEventListener("touchmove", function (e) {
    section.classList.toggle("active");
  });
  footer.addEventListener("touchend", function (e) {
    section.classList.toggle("no_active");
  });
});

// desactivation background
var checkbox = document.querySelector("#flexSwitchCheckChecked");

checkbox.addEventListener("change", function () {
  var three_id = document.querySelector("#three");
  if (checkbox.checked) {
    three_id.style.display = "block";
    // console.log(three_id.style.display);
  } else {
    three_id.style.display = "none";
    // console.log(three_id.style.display);
  }
});
