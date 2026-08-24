const API_URL = 'http://localhost:3001/api/recipes'

// =====================================================
// TÄHÄN OMA TOKENISI
// =====================================================

const TOKEN = ''

// =====================================================

const recipes = [
  {
    name: 'Kermainen pasta carbonara',
    description:
      'Klassinen italialainen pasta, jossa on kananmunaa, pecorinoa, pekonia ja runsaasti mustapippuria.',
    servings: 4,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pasta_Carbonara_in_Ylämaa.jpg',
    ingredients: [
      { name: 'spagetti', amount: 400, unit: 'g' },
      { name: 'pekoni', amount: 150, unit: 'g' },
      { name: 'kananmuna', amount: 3, unit: 'kpl' },
      { name: 'pecorinojuusto', amount: 100, unit: 'g' },
      { name: 'mustapippuri', amount: 1, unit: 'tl' },
      { name: 'suola', amount: 1, unit: 'tl' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Keitä spagetti suolatussa vedessä pakkauksen ohjeen mukaan.'
      },
      {
        step: 2,
        description: 'Pilko pekoni ja paista se rapeaksi pannulla.'
      },
      {
        step: 3,
        description: 'Sekoita kananmunat, raastettu pecorino ja mustapippuri kulhossa.'
      },
      {
        step: 4,
        description: 'Säästä noin desilitra pastan keitinvettä ja valuta pasta.'
      },
      {
        step: 5,
        description:
          'Sekoita pasta pekonin kanssa ja lisää hieman keitinvettä. Ota pannu pois liedeltä.'
      },
      {
        step: 6,
        description:
          'Sekoita kananmunaseos pastaan nopeasti, kunnes kastikkeesta tulee kermaista.'
      }
    ]
  },

  {
    name: 'Kana-curry riisillä',
    description:
      'Mausteinen ja kermainen kanacurry, joka tarjoillaan höyryävän riisin kanssa.',
    servings: 4,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken_curry.jpg',
    ingredients: [
      { name: 'kanan rintafileet', amount: 500, unit: 'g' },
      { name: 'basmatiriisi', amount: 300, unit: 'g' },
      { name: 'kookosmaito', amount: 400, unit: 'ml' },
      { name: 'sipuli', amount: 1, unit: 'kpl' },
      { name: 'valkosipuli', amount: 2, unit: 'kpl' },
      { name: 'currytahna', amount: 2, unit: 'rkl' },
      { name: 'öljy', amount: 1, unit: 'rkl' },
      { name: 'suola', amount: 1, unit: 'tl' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Keitä riisi pakkauksen ohjeen mukaan.'
      },
      {
        step: 2,
        description: 'Pilko kana, sipuli ja valkosipuli.'
      },
      {
        step: 3,
        description: 'Kuumenna öljy pannulla ja paista kana kauttaaltaan kypsäksi.'
      },
      {
        step: 4,
        description: 'Lisää sipuli, valkosipuli ja currytahna. Paista muutama minuutti.'
      },
      {
        step: 5,
        description: 'Kaada kookosmaito pannulle ja anna hautua noin 10 minuuttia.'
      },
      {
        step: 6,
        description: 'Tarjoile curry riisin kanssa.'
      }
    ]
  },

  {
    name: 'Kreikkalainen salaatti',
    description:
      'Raikas salaatti tomaatista, kurkusta, oliiveista, punasipulista ja fetajuustosta.',
    servings: 4,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Greek_salad.jpg',
    ingredients: [
      { name: 'tomaatti', amount: 4, unit: 'kpl' },
      { name: 'kurkku', amount: 1, unit: 'kpl' },
      { name: 'punasipuli', amount: 1, unit: 'kpl' },
      { name: 'fetajuusto', amount: 200, unit: 'g' },
      { name: 'Kalamata-oliivi', amount: 100, unit: 'g' },
      { name: 'oliiviöljy', amount: 3, unit: 'rkl' },
      { name: 'oregano', amount: 1, unit: 'tl' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Pilko tomaatit ja kurkku sopivan kokoisiksi paloiksi.'
      },
      {
        step: 2,
        description: 'Viipaloi punasipuli ohuiksi suikaleiksi.'
      },
      {
        step: 3,
        description: 'Lisää vihannekset ja oliivit kulhoon.'
      },
      {
        step: 4,
        description: 'Murustele fetajuusto salaatin päälle.'
      },
      {
        step: 5,
        description: 'Pirskottele päälle oliiviöljy ja mausta oreganolla.'
      }
    ]
  },

  {
    name: 'Kermainen sienirisotto',
    description:
      'Pehmeä ja täyteläinen sienirisotto parmesaanilla ja tuoreilla yrteillä.',
    servings: 4,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Risotto.jpg',
    ingredients: [
      { name: 'risottoriisi', amount: 300, unit: 'g' },
      { name: 'herkkusieni', amount: 250, unit: 'g' },
      { name: 'kasvisliemi', amount: 800, unit: 'ml' },
      { name: 'sipuli', amount: 1, unit: 'kpl' },
      { name: 'valkosipuli', amount: 2, unit: 'kpl' },
      { name: 'parmesaani', amount: 100, unit: 'g' },
      { name: 'voi', amount: 40, unit: 'g' },
      { name: 'oliiviöljy', amount: 1, unit: 'rkl' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Pilko sienet, sipuli ja valkosipuli.'
      },
      {
        step: 2,
        description: 'Kuullota sipuli ja valkosipuli oliiviöljyssä.'
      },
      {
        step: 3,
        description: 'Lisää riisi ja paahda sitä pari minuuttia.'
      },
      {
        step: 4,
        description:
          'Lisää kuumaa kasvislientä vähitellen samalla sekoittaen.'
      },
      {
        step: 5,
        description: 'Lisää sienet ja jatka kypsentämistä noin 18 minuuttia.'
      },
      {
        step: 6,
        description:
          'Sekoita joukkoon voi ja parmesaani. Anna risoton levätä muutama minuutti ennen tarjoilua.'
      }
    ]
  },

  {
    name: 'Lasagne al forno',
    description:
      'Mehevä italialainen lasagne jauhelihakastikkeella, béchamel-kastikkeella ja juustolla.',
    servings: 6,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pizza_Margherita.jpg',
    ingredients: [
      { name: 'lasagnelevy', amount: 250, unit: 'g' },
      { name: 'naudan jauheliha', amount: 500, unit: 'g' },
      { name: 'tomaattimurska', amount: 400, unit: 'g' },
      { name: 'sipuli', amount: 1, unit: 'kpl' },
      { name: 'valkosipuli', amount: 2, unit: 'kpl' },
      { name: 'maito', amount: 500, unit: 'ml' },
      { name: 'voi', amount: 50, unit: 'g' },
      { name: 'vehnäjauho', amount: 50, unit: 'g' },
      { name: 'juustoraaste', amount: 150, unit: 'g' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Pilko sipuli ja valkosipuli.'
      },
      {
        step: 2,
        description: 'Ruskista jauheliha ja lisää sipuli sekä valkosipuli.'
      },
      {
        step: 3,
        description: 'Lisää tomaattimurska ja hauduta kastiketta noin 20 minuuttia.'
      },
      {
        step: 4,
        description:
          'Valmista béchamel sulattamalla voi, lisäämällä jauhot ja lopuksi maito vähitellen.'
      },
      {
        step: 5,
        description:
          'Kokoa lasagne vuokaan kerroksittain jauhelihakastikkeesta, béchamelista ja lasagnelevyistä.'
      },
      {
        step: 6,
        description:
          'Ripottele päälle juustoraaste ja paista 200 asteessa noin 35 minuuttia.'
      }
    ]
  },

  {
    name: 'Pannukakut marjoilla',
    description:
      'Pehmeät amerikkalaistyyliset pannukakut, jotka tarjoillaan vaahterasiirapin ja marjojen kanssa.',
    servings: 4,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pancakes_(1).jpg',
    ingredients: [
      { name: 'vehnäjauho', amount: 250, unit: 'g' },
      { name: 'maito', amount: 300, unit: 'ml' },
      { name: 'kananmuna', amount: 2, unit: 'kpl' },
      { name: 'leivinjauhe', amount: 2, unit: 'tl' },
      { name: 'sokeri', amount: 2, unit: 'rkl' },
      { name: 'voi', amount: 40, unit: 'g' },
      { name: 'mustikka', amount: 150, unit: 'g' },
      { name: 'vaahterasiirappi', amount: 100, unit: 'ml' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Sekoita jauhot, leivinjauhe ja sokeri kulhossa.'
      },
      {
        step: 2,
        description: 'Lisää maito ja kananmunat ja sekoita tasaiseksi taikinaksi.'
      },
      {
        step: 3,
        description: 'Sulata voi ja sekoita puolet siitä taikinaan.'
      },
      {
        step: 4,
        description: 'Paista pannukakut voissa molemmilta puolilta kullanruskeiksi.'
      },
      {
        step: 5,
        description:
          'Tarjoile pannukakut mustikoiden ja vaahterasiirapin kanssa.'
      }
    ]
  },

  {
    name: 'Uunilohi ja paahdetut perunat',
    description:
      'Helppo arkiruoka, jossa mehukas lohi tarjoillaan rapeiden perunoiden kanssa.',
    servings: 4,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Salmon_with_potatoes.jpg',
    ingredients: [
      { name: 'lohifilee', amount: 600, unit: 'g' },
      { name: 'peruna', amount: 800, unit: 'g' },
      { name: 'oliiviöljy', amount: 3, unit: 'rkl' },
      { name: 'valkosipuli', amount: 2, unit: 'kpl' },
      { name: 'sitruuna', amount: 1, unit: 'kpl' },
      { name: 'suola', amount: 1, unit: 'tl' },
      { name: 'mustapippuri', amount: 1, unit: 'tl' },
      { name: 'tilli', amount: 2, unit: 'rkl' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Pese ja lohko perunat.'
      },
      {
        step: 2,
        description:
          'Sekoita perunat oliiviöljyn, suolan ja mustapippurin kanssa.'
      },
      {
        step: 3,
        description: 'Paahda perunoita 200 asteessa noin 25 minuuttia.'
      },
      {
        step: 4,
        description: 'Mausta lohi suolalla, pippurilla ja valkosipulilla.'
      },
      {
        step: 5,
        description:
          'Lisää lohi perunoiden joukkoon ja paista vielä noin 15 minuuttia.'
      },
      {
        step: 6,
        description: 'Purista päälle sitruunamehua ja koristele tillillä.'
      }
    ]
  },

  {
    name: 'Korealainen ramen',
    description:
      'Lämmin ja täyteläinen ramen kananmunalla, nuudeleilla ja kevätsipulilla.',
    servings: 2,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Korean_ramen.jpg',
    ingredients: [
      { name: 'ramen-nuudeli', amount: 200, unit: 'g' },
      { name: 'kananmuna', amount: 2, unit: 'kpl' },
      { name: 'kasvisliemi', amount: 700, unit: 'ml' },
      { name: 'soijakastike', amount: 2, unit: 'rkl' },
      { name: 'seesamiöljy', amount: 1, unit: 'rkl' },
      { name: 'kevätsipuli', amount: 2, unit: 'kpl' },
      { name: 'chili', amount: 1, unit: 'kpl' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Keitä kananmunia noin 7 minuuttia ja jäähdytä ne.'
      },
      {
        step: 2,
        description:
          'Kuumenna kasvisliemi ja mausta se soijakastikkeella sekä seesamiöljyllä.'
      },
      {
        step: 3,
        description: 'Keitä ramen-nuudelit liemessä pakkauksen ohjeen mukaan.'
      },
      {
        step: 4,
        description: 'Viipaloi kananmunat, kevätsipuli ja chili.'
      },
      {
        step: 5,
        description: 'Jaa ramen kulhoihin ja lisää päälle kananmunat, kevätsipuli ja chili.'
      }
    ]
  },

  {
    name: 'Pizza Margherita',
    description:
      'Yksinkertainen italialainen klassikko tomaattikastikkeella, mozzarellalla ja basilikalla.',
    servings: 2,
    image:
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/PizzaMargherita.jpg',
    ingredients: [
      { name: 'vehnäjauho', amount: 300, unit: 'g' },
      { name: 'vesi', amount: 180, unit: 'ml' },
      { name: 'kuivahiiva', amount: 5, unit: 'g' },
      { name: 'suola', amount: 1, unit: 'tl' },
      { name: 'tomaattimurska', amount: 200, unit: 'g' },
      { name: 'mozzarella', amount: 200, unit: 'g' },
      { name: 'basilika', amount: 10, unit: 'g' },
      { name: 'oliiviöljy', amount: 1, unit: 'rkl' }
    ],
    instructions: [
      {
        step: 1,
        description:
          'Sekoita jauhot, hiiva, suola ja vesi taikinaksi. Vaivaa noin 10 minuuttia.'
      },
      {
        step: 2,
        description: 'Anna taikinan kohota peitettynä noin tunnin ajan.'
      },
      {
        step: 3,
        description: 'Muotoile taikinasta kaksi ohutta pizzapohjaa.'
      },
      {
        step: 4,
        description:
          'Levitä pohjille tomaattikastiketta ja lisää mozzarella.'
      },
      {
        step: 5,
        description:
          'Paista mahdollisimman kuumassa uunissa, noin 250 asteessa, 8–12 minuuttia.'
      },
      {
        step: 6,
        description: 'Lisää basilika ja tilkka oliiviöljyä ennen tarjoilua.'
      }
    ]
  },

  {
  name: 'Teriyaki-kana kasviksilla',
  description:
    'Makea ja suolainen teriyakikana, joka tarjoillaan riisin ja rapeiden kasvisten kanssa.',
  servings: 4,
  image:
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/Teriyaki_chicken.jpg',
  ingredients: [
    { name: 'kanan rintafileet', amount: 500, unit: 'g' },
    { name: 'basmatiriisi', amount: 300, unit: 'g' },
    { name: 'teriyakikastike', amount: 120, unit: 'ml' },
    { name: 'porkkana', amount: 2, unit: 'kpl' },
    { name: 'paprika', amount: 1, unit: 'kpl' },
    { name: 'parsakaali', amount: 300, unit: 'g' },
    { name: 'seesaminsiemenet', amount: 1, unit: 'rkl' },
    { name: 'öljy', amount: 1, unit: 'rkl' }
  ],
  instructions: [
    {
      step: 1,
      description: 'Keitä riisi pakkauksen ohjeen mukaan.'
    },
    {
      step: 2,
      description: 'Leikkaa kana pieniksi suupaloiksi.'
    },
    {
      step: 3,
      description: 'Pilko porkkana, paprika ja parsakaali.'
    },
    {
      step: 4,
      description: 'Kuumenna öljy pannulla ja paista kana kypsäksi.'
    },
    {
      step: 5,
      description:
        'Lisää kasvikset ja paista niitä muutama minuutti, jotta ne jäävät hieman rapeiksi.'
    },
    {
      step: 6,
      description:
        'Kaada teriyakikastike pannulle ja sekoita kaikki ainekset hyvin yhteen.'
    },
    {
      step: 7,
      description:
        'Tarjoile kana riisin päällä ja koristele seesaminsiemenillä.'
    }
  ]
},

{
  name: 'Tomaatti-mozzarellapasta',
  description:
    'Helppo ja raikas pastaruoka tomaateilla, mozzarellalla, basilikalla ja valkosipulilla.',
  servings: 4,
  image:
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pasta_with_tomato_sauce.jpg',
  ingredients: [
    { name: 'pennepasta', amount: 400, unit: 'g' },
    { name: 'kirsikkatomaatti', amount: 400, unit: 'g' },
    { name: 'mozzarella', amount: 250, unit: 'g' },
    { name: 'valkosipuli', amount: 2, unit: 'kpl' },
    { name: 'basilika', amount: 20, unit: 'g' },
    { name: 'oliiviöljy', amount: 3, unit: 'rkl' },
    { name: 'parmesaani', amount: 50, unit: 'g' },
    { name: 'suola', amount: 1, unit: 'tl' },
    { name: 'mustapippuri', amount: 1, unit: 'tl' }
  ],
  instructions: [
    {
      step: 1,
      description: 'Keitä pasta suolatussa vedessä al denteksi.'
    },
    {
      step: 2,
      description: 'Puolita kirsikkatomaatit ja pilko valkosipuli.'
    },
    {
      step: 3,
      description:
        'Kuullota valkosipulia oliiviöljyssä ja lisää tomaatit pannulle.'
    },
    {
      step: 4,
      description:
        'Paista tomaatteja muutaman minuutin ajan, kunnes ne alkavat pehmetä.'
    },
    {
      step: 5,
      description:
        'Sekoita valutettu pasta tomaattien joukkoon ja mausta suolalla sekä mustapippurilla.'
    },
    {
      step: 6,
      description:
        'Lisää joukkoon paloiteltu mozzarella ja tuore basilika.'
    },
    {
      step: 7,
      description:
        'Tarjoile parmesaaniraasteen ja tilkan oliiviöljyä kanssa.'
    }
  ]
},

{
  name: 'Chili con carne',
  description:
    'Täyteläinen ja hieman tulinen meksikolaishenkinen pataruoka jauhelihasta, pavuista ja tomaatista.',
  servings: 6,
  image:
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chili_con_carne_01.jpg',
  ingredients: [
    { name: 'naudan jauheliha', amount: 500, unit: 'g' },
    { name: 'kidneypapu', amount: 400, unit: 'g' },
    { name: 'tomaattimurska', amount: 400, unit: 'g' },
    { name: 'sipuli', amount: 1, unit: 'kpl' },
    { name: 'valkosipuli', amount: 3, unit: 'kpl' },
    { name: 'paprika', amount: 1, unit: 'kpl' },
    { name: 'maissi', amount: 200, unit: 'g' },
    { name: 'chilikastike', amount: 2, unit: 'rkl' },
    { name: 'juustokumina', amount: 1, unit: 'tl' },
    { name: 'paprikajauhe', amount: 2, unit: 'tl' },
    { name: 'oliiviöljy', amount: 1, unit: 'rkl' }
  ],
  instructions: [
    {
      step: 1,
      description: 'Pilko sipuli, valkosipuli ja paprika.'
    },
    {
      step: 2,
      description:
        'Kuumenna öljy kattilassa ja ruskista jauheliha.'
    },
    {
      step: 3,
      description:
        'Lisää sipuli, valkosipuli ja paprika. Kuullota muutaman minuutin ajan.'
    },
    {
      step: 4,
      description:
        'Lisää tomaattimurska, chilikastike, juustokumina ja paprikajauhe.'
    },
    {
      step: 5,
      description:
        'Huuhtele kidneypavut ja lisää ne sekä maissi kattilaan.'
    },
    {
      step: 6,
      description:
        'Anna chilin hautua miedolla lämmöllä noin 25 minuuttia.'
    },
    {
      step: 7,
      description:
        'Tarjoile esimerkiksi riisin, tortillojen tai smetanan kanssa.'
    }
  ]
},
]

async function createRecipe(recipe) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify(recipe)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${JSON.stringify(data)}`
    )
  }

  return data
}

async function main() {
  if (TOKEN === 'PASTE_YOUR_TOKEN_HERE') {
    throw new Error('Lisää token muuttujaan TOKEN ennen skriptin suorittamista.')
  }

  console.log(`Lähetetään ${recipes.length} reseptiä...`)

  for (const recipe of recipes) {
    try {
      const createdRecipe = await createRecipe(recipe)

      console.log(
        `✓ Lisätty: ${createdRecipe.name} (${createdRecipe.id})`
      )
    } catch (error) {
      console.error(`✗ Virhe reseptissä "${recipe.name}"`)
      console.error(error.message)
    }
  }

  console.log('Valmis!')
}

main()