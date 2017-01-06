import { LocalStorage } from 'fetchum';

const defaultValues = () => ({
  token: LocalStorage.getToken() || '',
  currentUser: LocalStorage.get('user') || null,
  errors: null,
  modal: null,
  friends: {
    nextLink: 'https://graph.facebook.com/v2.8/10211494116972445/taggable_friends?access_token=EAAW63sEd7m0BAKomCJ7XZCbIglRHQw4NXVRY1h6Rs73tV4G2ZBLyQJOFNMwNZCdcQKZC3JHhwzWK029LSk1nm8k2EW895Ah5rJbwnUxYVqiFNexCMGSFZB2X1A5HAEwiR5teq91hza8uvAHnNjxdIKnPy8K4Weh8XRRpZBRcosUQZDZD&pretty=0&fields=id%2Cpicture%2Cfirst_name%2Clast_name%2Cname&limit=25&after=QWFJWjIzWkYzeVVvb1phNC13VENOUzU4TUtISGY5cS1YQTl0R0ZAGVzg5MEF0d1BoVk9KZAnRleHc4RjdtSVRRQmdNSWdvSmFSVHhSLVdzZA3BpQkhZAeGdPdnc4U21xdVFya2dSV0Nnc0gxLU41NXcZD',
    list: [
      {
        id: 'AaId5VEyv5vUFINPlX-FjgrLKhbwQbuB8lxXOdjfWfjBmKjo-gjZZP-LRHm9QiWX5JO68xJftWo4teuVj2dlzep3EFf-gggeWUlxTSGRnomkEw',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c13.0.50.50/p50x50/1618666_10101734540124599_1746659739_n.jpg?oh=02ef71894b829239df85e94b2fd41353&oe=58F63BE5',
          },
        },
        firstName: 'Seth',
        lastName: 'Paye',
        name: 'Seth Paye',
      },
      {
        id: 'AaJmXqIVB0khIZdadqBmpAxgWcTSahSv8anKBR9Vv7UgloxLtGuzlRCkzpWIxHNggr0GmmX7-VTVpEMztHWY3QTqBh_lvA4L4vcPTiT7OLS0dw',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/10264390_10203698032673865_3734564365288925518_n.jpg?oh=16789b64503b368e75ee7a771a60bf0e&oe=58B3FC6E',
          },
        },
        firstName: 'Roxer',
        lastName: 'Tronica',
        name: 'Roxer Tronica',
      },
      {
        id: 'AaJFMBFIIamZSgmB23e5avT8LCS_5nuXpHXoTOZ-uj_6WPJFzWQZTls8obP0NyfCT6sERTpl9IuhgJ3tOPVm7qkr2mg0QFjJLbyqnVRKhm2TeA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13879340_10154438749413464_8810367567511380818_n.jpg?oh=34e055d11e1b2065a02655592d601e64&oe=58F0EA30',
          },
        },
        firstName: 'Jaime',
        lastName: 'Pollard-Smith',
        name: 'Jaime Pollard-Smith',
      },
      {
        id: 'AaJ22JkOf-CVubO7NrvLBAnbEDj66F1Q7LPpft8UfUNCweuRJiv_RAesPAnAacl0mEXvhQUS2poxbsYg_nj2nQOtAAlgXGh-zSKbqFzZo0xAQg',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.5.50.50/p50x50/14344922_10104701796414153_916473920012329150_n.jpg?oh=b5f13dd2ed4bd504a89e010e7f1f47e6&oe=58BCF833',
          },
        },
        firstName: 'Châu',
        lastName: 'Nguyễn',
        name: 'Châu Nguyễn',
      },
      {
        id: 'AaIcMvT_SxYeaIyjON8Q9fDjIyPbxOIlED1KqtVdxoWmaSHu3HGysr9XONRQPE9e1o-amnfSugPB8dZZwHKEWeOe30e9rJzzV2Ed5ODIRDlJtQ',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/10389480_10101751441683987_7492097642936755996_n.jpg?oh=844c604429ee4114045553eda3d146cd&oe=58FD0FC9',
          },
        },
        firstName: 'Mat',
        lastName: 'Banbury',
        name: 'Mat Banbury',
      },
      {
        id: 'AaKBO6ZBhjmESOrHHhDEGDALzlt7WJGOAwZIzEyyC5Wm0YaKZ0nl6waw91urqKgsKpmFqnKQ_kf8V15shYfh7UxA8lLodEL86XDI1pn_3tscRg',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/945871_10201197792656548_1259968562_n.jpg?oh=0f14417fa71861ca912227cf4a5d3a18&oe=58EE201E',
          },
        },
        firstName: 'Antonio',
        lastName: 'Livingston',
        name: 'Antonio Livingston',
      },
      {
        id: 'AaKEMYN7AX8kYtlEPnU-pF3hNKyZuiTJ2OeJYv4X2PKUDV59ypxy5fp-T_M4G9ykHoGWu_UwmBRjI8TqoCaZLm39vrcSOB8llHNu97Ae1yGZvA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14947623_10154514627351832_177144742395995077_n.jpg?oh=a1b08b1ac169407e4edc98b79951e4cd&oe=58F9CC2B',
          },
        },
        firstName: 'Steve',
        lastName: 'D',
        name: 'Steve D',
      },
      {
        id: 'AaJDer5rLtx_wpWryENFmpx8piSzXlOLkU437DMCWzVslmGxGCp6A7_Ol-2GCDSHnF5P5ai_Bf2CRRprAI0sDhM8xAxWyVITD3Sf-yhcOJf8jg',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14022086_10207273824619031_3355849126456677629_n.jpg?oh=38bc50d0795f2e031f5770ae934e69fe&oe=58F1F2CC',
          },
        },
        firstName: 'Dan',
        lastName: 'Simerman',
        name: 'Dan Simerman',
      },
      {
        id: 'AaIljAnTIB7tMwFXpQeAp-_AX8ZjPhUjdaBBsowy9Os9XtMDbBARuO9S6DTADmcMpPvv-VtTocHb4HOIsvSruRkbxk2B9qDccXxPjv3HsfQ7wA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15230627_10211702092327161_5820989376003609112_n.jpg?oh=23556d2022699c963a4cbc3c333010a4&oe=58C389F9',
          },
        },
        firstName: 'Anthony',
        lastName: 'Hagerty',
        name: 'Anthony Raphael Hagerty',
      },
      {
        id: 'AaLw4Nmk1bfe2xQHTBjIhx4SnPftOFWW7m4lMPaLAzFLpNUO3Y2Vtz0WFVLZci8oucGNZI-ZcleEiidZ8Kb16z_ftqmLFZnWeMXCcF10cKxP3A',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/11698628_10153465505331639_6170895764722585238_n.jpg?oh=58b711df05ee0608c11a5ce2fed35d70&oe=58B68DE8',
          },
        },
        firstName: 'Laura',
        lastName: 'Clifford',
        name: 'Laura Clifford',
      },
      {
        id: 'AaLuRDSNRUbObq1XZR31VcrkZPIIWj0OhAjnj2a98QxM1WHT6-vmTaPoutFqGJCVRg3z1GoI2jFXC01k1bQZPBiw7Fdlh0L1NDxN2qWqxBDn7w',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/11156251_10153171994360259_4088006199076671952_n.jpg?oh=ab995ec5591cffcb3fc0084e314c9e3b&oe=58C1441A',
          },
        },
        firstName: 'Ryan',
        lastName: 'Tilghman',
        name: 'Ryan Tilghman',
      },
      {
        id: 'AaLOCS4YLkdNbXdlug63fbRqpK_2OSz6SH_kFYW_Is8qWCP5RiR-VYIhqt9DByHmEnE3ICHoWKJTAu8IugJsGZCzGTKHQL92UCGwroEoWZ1Gsg',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14199208_10207319293928251_8092811691154805626_n.jpg?oh=eca5e6820c327afcadd70c2cfa4b4173&oe=58BEFA93',
          },
        },
        firstName: 'John',
        lastName: 'Burton',
        name: 'John Nathan Mark Burton',
      },
      {
        id: 'AaIPV3JGzMa8CLN-vKBRdx5JjLxzuVIF06RhGkwZN6AV8DQXuN7rWngC-cC5R6YcM0P-5B3I-L3KbHHQ7MGYp44u58vWsYnQ0Ax6lsjPDlYlNA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/1470065_728447273833996_1512525358_n.jpg?oh=053a26467ea7888a734ec30ce590f674&oe=58F31552',
          },
        },
        firstName: 'Dustin',
        lastName: 'Morrow',
        name: 'Dustin Morrow',
      },
      {
        id: 'AaJkv2nfBgY0fGIf_xnd6iK0Y4hUW5WCtBaGnqWEB4FwS9QAPHisHBgvC5hfBU3zR558uhM6L2aqXYIVQx6J6e2JrbVM1E1-48tQO9za89pIew',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/10501762_10153330669396617_5275909398561401635_n.jpg?oh=34661bbd41f6011c00dd914d25c1b5b8&oe=58C3B069',
          },
        },
        firstName: 'Chris',
        lastName: 'McIntyre',
        name: 'Chris McIntyre',
      },
      {
        id: 'AaKDKayNMtv7rRhS98RO3V3im2iOkFr6opjKbVx8shRitGhfq-cJkrWiyTAEl7kcMyqXWPPUGE0tXAKcksERTeONv0glwEphIJzN0RzytCJkow',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/1479479_10201299885841631_1363880751_n.jpg?oh=1ebb9642076eede6be7708c53fda9520&oe=58C171C0',
          },
        },
        firstName: 'Jerad',
        lastName: 'Hobgood',
        name: 'Jerad Hobgood',
      },
      {
        id: 'AaKBdY7oYPzhHbA3wR4D5goJlU5XXJ-rBwvNtwWqMXzAzZCdiaAHtvGs1Kg5ZU_W2t58ekDjWJ742p9Hv-gA9c9wMLsKc7ccvPsBLqNgKvqimQ',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14045910_10206993944555973_6267114731060777690_n.jpg?oh=de502bfb001bfc8d6e1ced92a5a8835c&oe=58B449F7',
          },
        },
        firstName: 'Kyle',
        lastName: 'Young',
        name: 'Kyle Douglas Young',
      },
      {
        id: 'AaKpxNz-2i5maKCjas_EeKYb4473w4J5tJWoiDfBL0jVaVYB-XcBx6XCSMiQTYh3KjDISGU7kh09KETK4MQOe9l-MSTsEUyNJPqmP8Bnxy-H0w',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14570362_1267772439941587_6907773904710484623_n.jpg?oh=2bb54b778a0ce22d6f62aa097445b769&oe=58F63B24',
          },
        },
        firstName: 'Sairam',
        lastName: 'Chowdary',
        name: 'Sairam Chowdary',
      },
      {
        id: 'AaIhBa7xFWCtYsWp7srWH1DzCmra9S4DDELxwqD1UUxuIS4WacHvF6vtX17Q4OrnA6jwkbtbw-avjRYKoA74jSred-1LKKrG3QI_4Z3yZ6OaKA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.8.50.50/p50x50/15134542_1290502601013217_1887020848803237891_n.jpg?oh=f342eab6cc3b8b5ad2d98063c59d4c56&oe=58F72ECC',
          },
        },
        firstName: 'Jab',
        lastName: 'Mayer',
        name: 'Jab Mayer',
      },
      {
        id: 'AaJN77QVuh3t0RwITQ50bZgOJFQteDsNPHeCmmr3dU91DUUnWoKRV5rmBoN6FyS1ytKNQG7vC_cPRHssDRhQPzJJGDmvrH9McfX8HACTwXiIYA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c13.0.50.50/p50x50/10258086_10152308338104566_4285684876825143577_n.jpg?oh=0fe5e5adc188713ea2f75b59bcd1c099&oe=58B680D4',
          },
        },
        firstName: 'Wicem',
        lastName: 'Zrelly',
        name: 'Wicem Zrelly',
      },
      {
        id: 'AaJTvqiMWfFLm0k9X4164WHUASx1gCA_jlUtbmkjAxpi-fDycfj-kF5dxBUErEp8qzK4aUbaVnpqcsqI39LxZOY1lr5xcAYhrxHU-ZpoAlmKxg',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.50.50/p50x50/12800273_10153215546376652_1043599050463716295_n.jpg?oh=a8502ae11e23a0b5bd33b57cff944c2d&oe=58F92574',
          },
        },
        firstName: 'Brandon',
        lastName: 'Burgess',
        name: 'Brandon Kyle Burgess',
      },
      {
        id: 'AaJrKTNZDf_yR6wEsd-HnKyhKeSrQk-jFvy2BghYDB5WhRR7uchdayC3o_mbV-zLO9YsGyRn1a2ObtaQOyIJ9BilVCwgxT5-b6LM-4AycOa-dw',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15134691_10209724690066075_534470657284209409_n.jpg?oh=cf47550b140a6cf29f799553de8add2c&oe=58B29894',
          },
        },
        firstName: 'Gary',
        lastName: 'Bell',
        name: 'Gary Bell',
      },
      {
        id: 'AaIFiyPWvV1CEmzVjLsckOJEUG1_q-XNVgB-1HiQLA2zeokIVU46kyXwKPPN6awsQd36L9V0SPL-bILeUHCFkz0JuiyxQ9VWyQ5_Eqcg04WMsg',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/10428541_10203382957366056_3549570429315801102_n.jpg?oh=8eeaff14da2f9a2ca72f39504bf2c566&oe=58BD02B1',
          },
        },
        firstName: 'Keith',
        lastName: 'Neer',
        name: 'Keith Neer',
      },
      {
        id: 'AaK78Pa9nws5Vk9KTohVUITfQefxwMO_K_c20l_Lp8qYDP02jncX9NbdLNng1_lmUduu0d75H7y3wc8FKYlH-uPHBjKiWPasQYWNjKrd-erfhg',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/1609748_10153310173306639_3122776925607223886_n.jpg?oh=f726c4effa81b42776fe710b7032e707&oe=58EE8B4E',
          },
        },
        firstName: 'Francisca',
        lastName: 'Lee',
        name: 'Francisca Lee',
      },
      {
        id: 'AaI2Ai3Qp1cY5y9s1SO1kYuSDIBBoQt5QGsrUl7hyKiGuAcEHKSO2uCR7Ep92UFu3D0tMp56NTSbNRtGDCKGkjF1A-guVLGrsu8becp-6MmQYA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c33.22.271.271/s50x50/283453_253922567951323_2252271_n.jpg?oh=bd8f5e76ce56b2ca745b46302b985cab&oe=58C121FD',
          },
        },
        firstName: 'Kenneth',
        lastName: 'Shupe',
        name: 'Kenneth Shupe',
      },
      {
        id: 'AaI89hYq0Wl7XELoXuPnm7_X-QqnC84cO3kwnrtPy9c3pyyOiTwGIXxkF2sPB0P2n3ftiF-tfnBo-Vn3UFsqxsE5bTuxXQ_HEQvYE_R_6J_dJA',
        picture: {
          data: {
            is_silhouette: false,
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c27.27.341.341/s50x50/208497_10150570876640608_4180735_n.jpg?oh=1e74721d8eeef4b4b9533d3e0a3a4cc3&oe=58B17191',
          },
        },
        firstName: 'Matthew',
        lastName: 'Carson',
        name: 'Matthew Carson',
      },
    ],
    addressLatLang: {
      'Clarksville, TN, US': {
        lat: 36.5297706,
        lng: -87.35945279999999,
      },
      'Cary, NC, US': {
        lat: 35.79154,
        lng: -78.78111690000003,
      },
      'Charlotte, NC, US': {
        lat: 35.2270869,
        lng: -80.84312669999997,
      },
      'Raleigh, NC, US': {
        lat: 35.7795897,
        lng: -78.63817870000003,
      },
      '540 Main Street, New York, NY, US': {
        lat: 40.76154349999999,
        lng: -73.94973170000003,
      },
      '235 E 95Th Street, New York, NY, US': {
        lat: 40.784169,
        lng: -73.94795260000001,
      },
      'Nashville, TN, US': {
        lat: 36.1626638,
        lng: -86.78160159999999,
      },
      '1719 University Drive, Columbia, TN, US': {
        lat: 35.615557,
        lng: -87.10886800000003,
      },
      '68 Round Hill Drive, Stamford, CT, US': {
        lat: 41.1373564,
        lng: -73.5975095,
      },
      'Danbury, CT, US': {
        lat: 41.394817,
        lng: -73.4540111,
      },
      'Stamford, CT, US': {
        lat: 41.0534302,
        lng: -73.5387341,
      },
      'Decatur, IN, US': {
        lat: 40.830603,
        lng: -84.92913290000001,
      },
    },
  },
});

export default defaultValues();
