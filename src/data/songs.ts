export interface Song {
    id: string;
    slug: string;
    title: string;
    videoUrl: string;
    thumbnailUrl?: string;
    description: string;
    translations: {
        [key: string]: {
            lang: string;
            lyrics: {
                verse?: string;
                lines: string[];
                chords?: string[];
            }[];
        };
    };
}

export const songs: Song[] = [
    {
        id: "ithratholam",
        slug: "ithratholam-yahova-sahayichu",
        title: "Ithratholam Yahova Sahayichu",
        videoUrl: "https://www.youtube.com/embed/9-CF_f4H4HI",
        description: "Watch and worship along with this beautiful melody.",
        translations: {
            malayalam: {
                lang: "Malayalam (Transliterated)",
                lyrics: [
                    {
                        lines: [
                            "Ithratholam yehova sahaychu",
                            "Ithratholam daiva’menne nadathi",
                            "Onnumillaikayil ninnenne uyarthi",
                            "Ithratholam yehova sahaychu",
                        ],
                    },
                    {
                        verse: "1",
                        lines: [
                            "Hagarine’pole njan karanjappol",
                            "Yakobine pole njan’alanjappol",
                            "Marubhoomi’yileniku jeevajelam thannenne",
                            "Ithratholam yehova sahaychu",
                        ],
                    },
                    {
                        verse: "2",
                        lines: [
                            "Ekanai nindiyanai paradesiyai",
                            "Nadum veedum vittu njanalanjappol",
                            "Swonda‘veettil cherthu kollam’ennuracha nathane",
                            "Ithratholam yehova sahaychu",
                        ],
                    },
                    {
                        verse: "3",
                        lines: [
                            "Kannuneerum dukhavum nirasayum",
                            "Purnnamai maridum dinam varum",
                            "Annu padum duthar’madhye arthu padum sudharum",
                            "Ithratholam yehova sahaychu",
                        ],
                    },
                ],
            },
            english: {
                lang: "English",
                lyrics: [
                    {
                        lines: [
                            "Jehovah helped me thus far",
                            "God has led me thus far",
                            "From nothingness He lifted me",
                            "Jehovah helped me thus far"
                        ]
                    },
                    {
                        verse: "1",
                        lines: [
                            "When I cried like Hagar",
                            "When I wandered like Jacob",
                            "In the desert He gave me living water",
                            "Jehovah helped me thus far"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Lonely, despised, and a stranger",
                            "When I wandered leaving my land and home",
                            "The Lord who promised to gather me to His own home",
                            "Jehovah helped me thus far"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Tears, sorrow, and despair",
                            "A day will come when they completely vanish",
                            "That day, amidst angels, saints will shout and sing",
                            "Jehovah helped me thus far"
                        ]
                    }
                ]
            },
            hindi: {
                lang: "Hindi",
                lyrics: [
                    {
                        lines: [
                            "Yahan tak Yehova ne sahayata ki",
                            "Yahan tak Parmeshwar ne mujhe chalaya",
                            "Shunya se mujhe uthaya",
                            "Yahan tak Yehova ne sahayata ki"
                        ]
                    },
                    {
                        verse: "1",
                        lines: [
                            "Jab main Hagar ki tarah roya",
                            "Jab main Yaakoob ki tarah bhatka",
                            "Marusthal mein mujhe jeevan jal diya",
                            "Yahan tak Yehova ne sahayata ki"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Akela, nindit aur pardesi hokar",
                            "Jab desh aur ghar chodkar main bhatka",
                            "Apne ghar mein shamil karne ka vada karne wale Swami ne",
                            "Yahan tak Yehova ne sahayata ki"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Aansu, dukh aur nirasha",
                            "Poori tarah mit jane ka din aayega",
                            "Us din duto ke beech sant jayjaykar karenge",
                            "Yahan tak Yehova ne sahayata ki"
                        ]
                    }
                ]
            },
            tamil: {
                lang: "Tamil",
                lyrics: [
                    {
                        lines: [
                            "Ithvarai Yehova udhavinaar",
                            "Ithvarai Devan ennai nadathinaar",
                            "Ondrumillaiyil irundhu ennai uyarthinaar",
                            "Ithvarai Yehova udhavinaar"
                        ]
                    },
                    {
                        verse: "1",
                        lines: [
                            "Hagarai pol naan azhudhappodhu",
                            "Yakobai pol naan alaindhappodhu",
                            "Vanaantharathil enakku jeeva thanneer thandhu",
                            "Ithvarai Yehova udhavinaar"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Thaniyanai nindhikkapattavanai paradesiyai",
                            "Naadum veedum vittu naan alaindhappodhu",
                            "Sondha veettil serthukkolven endru uraitha Naadhane",
                            "Ithvarai Yehova udhavinaar"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Kanneerum thukkamum niraasaiyum",
                            "Muzhumaiyai maaridum naal varum",
                            "Andru thoothar nadhuvil parisuthar aarparippar",
                            "Ithvarai Yehova udhavinaar"
                        ]
                    }
                ]
            },
            telugu: {
                lang: "Telugu",
                lyrics: [
                    {
                        lines: [
                            "Inthavaraku Yehova sahayam chesenu",
                            "Inthavaraku Devudu nannu nadipinchenu",
                            "Sunyamu nundi nannu lepanethenu",
                            "Inthavaraku Yehova sahayam chesenu"
                        ]
                    },
                    {
                        verse: "1",
                        lines: [
                            "Hagar vale nenu edchinappudu",
                            "Yakobu vale nenu thiriginappudu",
                            "Edari lo naku jeeva jalam ichenu",
                            "Inthavaraku Yehova sahayam chesenu"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Ontari ga nindhinchbadi paradesi ga",
                            "Desamu illu vidichi nenu thiriginappudu",
                            "Sontha intilo cherchukuntanu ani cheppina Nadhudu",
                            "Inthavaraku Yehova sahayam chesenu"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Kanneelu dukhamu niraasa",
                            "Poorthiga maripoye roju vasthundi",
                            "Aa roju duthala madhyalo parishudhulu aarbhatistharu",
                            "Inthavaraku Yehova sahayam chesenu"
                        ]
                    }
                ]
            }
        },
    },
    {
        id: "lokamam-gambhira",
        slug: "lokamam-gambhira-varidhiyil",
        title: "Lokamam Gambhira Varidhiyil",
        videoUrl: "https://www.youtube.com/embed/FcsqvBuNYfc",
        description: "Christian Malayalam Devotional Song Lyrics",
        translations: {
            malayalam: {
                lang: "Malayalam (Transliterated)",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Lokamam gambhira varidhiyil viswasa’kappalil odiyitte",
                            "Nithya vedonnundavide ethi karthanodu kude visramikum;-",
                        ],
                    },
                    {
                        lines: [
                            "Yathra cheyum njan kroose noki yudham cheiyum njan yeshuvinai",
                            "Jeevan vacheedum rekshakanai andhya swasam vareyum",
                        ],
                    },
                    {
                        verse: "2",
                        lines: [
                            "Kalam kazhiyunnu naalkal poi karthavin varavu sameepamai",
                            "Mahathwa namathe kerthippanai shakthikarika nin aalmavinal;-",
                        ],
                    },
                    {
                        verse: "3",
                        lines: [
                            "Poorva pithakalam appostholar dhurave dharsiche bhagya desham",
                            "Aakayal chetham’ennenni labham anniyar’ennennie lokamathil;-",
                        ],
                    },
                    {
                        verse: "4",
                        lines: [
                            "Njerukathin appam njan thinnennalum kashtathin kannuner kudichalum",
                            "Dehi dhukathal kshyichennalum ellam prethikoolam aayennalum;-",
                        ],
                    },
                ]
            },
            english: {
                lang: "English",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "In this world like a deep ocean, sailing in the ship of faith",
                            "Reaching that eternal home there, I will rest with the Lord"
                        ]
                    },
                    {
                        lines: [
                            "I will journey looking at the cross, I will fight for Jesus",
                            "I will lay down my life for the Savior, until my last breath"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Time is passing, days are gone, the Lord's coming is near",
                            "Strengthen me with Your Spirit to glorify Your glorious name"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "The blessed land that forefathers and apostles saw from afar",
                            "Therefore, I count loss as gain, being a stranger in this world"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Even if I eat the bread of adversity, even if I drink tears of affliction",
                            "Even if my soul wastes away with grief, even if everything goes against me"
                        ]
                    }
                ]
            },
            hindi: {
                lang: "Hindi",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Is sansar roopi gambhir sagar mein, vishwas ki naav mein chal kar",
                            "Us anant ghar mein pahunch kar, Prabhu ke saath vishram karunga"
                        ]
                    },
                    {
                        lines: [
                            "Main krus ki or dekh kar yatra karunga, main Yeshu ke liye yudh karunga",
                            "Udharkarta ke liye praan tyag dunga, antim saans tak"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Samay beet raha hai, din gaye, Prabhu ka aana nikat hai",
                            "Mahimamay naam ki stuti karne ke liye, apni Aatma se shaktishali bana"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Purvajon aur preriton ne door se dekha vah dhanya desh",
                            "Isliye haani ko laabh ginta hoon, is sansar mein pardesi banker"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Chahe main musibat ki roti khaun, chahe main kasht ke aansu piyun",
                            "Chahe meri aatma dukh se sheern ho jaye, chahe sab kuch pratikool ho jaye"
                        ]
                    }
                ]
            },
            tamil: {
                lang: "Tamil",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Ulagam ennum aazh kadalil, visuwasa kappalil odiye",
                            "Nithya veedondru undangae, sendru Kartharodu koode ilaipparuven"
                        ]
                    },
                    {
                        lines: [
                            "Payanam seiven siluvai nokki, yuddham seiven Yesuvukkai",
                            "Jeevan vaippen Ratchakarukkai, andhya swasam varaiyum"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Kaalamazhigiradhu naatkal poyina, Kartharin varugai sameepamai",
                            "Magimai naamathai keerthippadharkai, belappaduthum um Aaviyinaal"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Munnorum apposthalarum, doorathil tharithitha baagya desam",
                            "Aagaiyaal nashtam yavum laabam, anniyar pol indha ulagathil"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Irukkathin appam naan bujithalum, kashtathin kanneer kudithalum",
                            "Dehi dukhathaal kshayinthalum, yellam prathikoolam aanalum"
                        ]
                    }
                ]
            },
            telugu: {
                lang: "Telugu",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Lokamam gambheera samudramulo, vishwasa padavalo prayaninchuchu",
                            "Nithya gruhamunaku cheri, akkada Karthatho kooda vishraminthunu"
                        ]
                    },
                    {
                        lines: [
                            "Siluvanu chuchuchu prayanisthanu, Yesukoraku yuddham chesthanu",
                            "Rakshakunikai pranamunidedanu, anthya swasam varaku"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Kalam gadichipothundi rojulu poyen, Karthuva raakada sameepamayen",
                            "Mahima namamunu keerthinchutaakai, shakthiparchumu nee Aathmatho"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Poorveekulu aposthalulu, dooramunundi chusina dhanya desham",
                            "Andukovalla nashtmurantha labham, anyulavale ee lokamulo"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Ibbandi rotte nenu thinnanu, kashta kanneru thaginas",
                            "Na deham dukhamtho krushinchina, anni prathikoolam ayina"
                        ]
                    }
                ]
            }
        }
    },
    {
        id: "aswasame-enikkere",
        slug: "aswasame-enikkere-thingeedunnu",
        title: "Aswasame Enikkere Thingeedunnu",
        videoUrl: "https://www.youtube.com/embed/3Ghw0jLRCzs",
        description: "Christian Malayalam Devotional Song Lyrics",
        translations: {
            malayalam: {
                lang: "Malayalam (Transliterated)",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Aswasame enikkere thingeedunnu",
                            "Vishwasa kannal njaan nokkiedumpol",
                            "Snehamereedumen rekshakan sannidhou",
                            "Aanandha kuttare kaanunnallo"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Aamodhathal thingi aacharyamodavar",
                            "Chuttum ninnu sthuthi cheithidunnu",
                            "Thanka thiru mugam kaanman kothichavar",
                            "Ullasamoditha nokkidunnu"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Than kaikalal kannuneerellam thathen than",
                            "Ennekumai thudachithallo",
                            "Ponveenakal dharichamoda purnnarai",
                            "Karthavine sthuthi cheyunnavar"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Kunjattinte rektham thannil thangalanki",
                            "Nannai veluppicha kuttarivar",
                            "Purnna vishudarai theernnavar yeshuvin",
                            "Thanka ruthirathin shakthiyale"
                        ]
                    },
                    {
                        verse: "5",
                        lines: [
                            "Thanka kireedangal thangal shirassinmel",
                            "Vennilayanki dharichorivar",
                            "Kaiyil kuruthola endheettavar sthuthi",
                            "Padeettanandha-modaartheedunnu"
                        ]
                    },
                    {
                        verse: "6",
                        lines: [
                            "Chernneedume vegam njanumakuttathil",
                            "Shutharod’onnich’anganandhippan",
                            "Lokam venda enikonnum venda",
                            "Ente nathante sannidhou chernnal mathi;-"
                        ]
                    }
                ]
            },
            english: {
                lang: "English",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Great comfort overflows within me",
                            "When I look with eyes of faith",
                            "In the presence of my loving Savior",
                            "I see a joyful company"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Filled with bliss and wonder",
                            "They stand around praising",
                            "Those who longed to see His golden face",
                            "Are looking now with great delight"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "With His own hands, the Father",
                            "Has wiped away all tears forever",
                            "Holding golden harps, fully joyful",
                            "They are praising the Lord"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "These are the ones who washed their robes well",
                            "In the blood of the Lamb",
                            "They became fully holy",
                            "By the power of Jesus' precious blood"
                        ]
                    },
                    {
                        verse: "5",
                        lines: [
                            "With golden crowns upon their heads",
                            "Wearing white robes",
                            "Holding palm leaves in their hands",
                            "They shout praises with joy"
                        ]
                    },
                    {
                        verse: "6",
                        lines: [
                            "I too will join that group soon",
                            "To rejoice there with the saints",
                            "I don't need the world, I don't need anything",
                            "It is enough if I reach my Master's presence"
                        ]
                    }
                ]
            },
            hindi: {
                lang: "Hindi",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Mujhe bahuth shanthi milti hai",
                            "Jab main vishwas ki aankhon se dekhta hoon",
                            "Mere prem karne wale Uddharkarta ki upasthiti mein",
                            "Main anandit samooh ko dekhta hoon"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Anand aur ashcharya se barkar",
                            "Ve charon or khade hokar stuti karte hain",
                            "Jo Uska swarnim chehra dekhne ko taraste the",
                            "Ab ullaas ke saath dekh rahe hain"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Pita ne apne hi hathon se",
                            "Sab aansu hamesha ke liye poch diye hain",
                            "Sone ki veena pakde hue, poore anand mein",
                            "Ve Prabhu ki stuti kar rahe hain"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Ye ve hain jinhone apne vastra",
                            "Memne ke lahoo mein acche se dhoye hain",
                            "Ve poori tarah pavitra ban gaye",
                            "Yeshu ke amoolya lahoo ki shakti se"
                        ]
                    },
                    {
                        verse: "5",
                        lines: [
                            "Apne sir par sone ke mukut pehne",
                            "Safed vastra dharan kiye hue",
                            "Hathon mein khajoor ki daliyan liye",
                            "Ve anand se stuti gaate hain"
                        ]
                    },
                    {
                        verse: "6",
                        lines: [
                            "Main bhi jald us samooh mein shamil hounga",
                            "Pavitra logon ke saath wahan anand manane",
                            "Mujhe duniya nahi chahiye, kuch nahi chahiye",
                            "Bas apne Swami ki upasthiti mein pahunch jaun"
                        ]
                    }
                ]
            },
            tamil: {
                lang: "Tamil",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Enakku migavum aaruthal perugukirathu",
                            "Visuwasa kangalal naan paarkumbol",
                            "Anbulla Ratchagar sannidhiyil",
                            "Ananda kootathai kaangirene"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Kalippinnal niraindhu aachariyathodu",
                            "Suttilum nindru thuthi seigirargal",
                            "Thanga thiru mugam kaana aaval kondaor",
                            "Ullaasamai inghu paarkirargal"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Than kaigalal kanneer ellam Pidhave",
                            "Endrendrumai thudaithuvittar",
                            "Porveenai yendhi magilchiyodu",
                            "Kartharai thuthi seigirargal"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Aatukuttiyin rathathil thangal anggi",
                            "Nandraaga veluppitha kootam ivargal",
                            "Muzhu parisutharai maariyavar Yesuvin",
                            "Thanga rathathin vallamayal"
                        ]
                    },
                    {
                        verse: "5",
                        lines: [
                            "Thanga kireedangal thangal sirassin mel",
                            "Venn angigal dharithavargal",
                            "Kayil kurutholai pidithu thuthi",
                            "Paadi anandhamai aarkirargal"
                        ]
                    },
                    {
                        verse: "6",
                        lines: [
                            "Serndhiduven vegamaai naanum aakootathil",
                            "Parisutharodu ondrai angu anandhikka",
                            "Ulagam vendam enakku ondrum vendam",
                            "En natherin sannidhi serndhal podhum"
                        ]
                    },
                ]
            },
            telugu: {
                lang: "Telugu",
                lyrics: [
                    {
                        verse: "1",
                        lines: [
                            "Naaku entho aadharana kaluguthundi",
                            "Vishwasa nethralatho nenu chuchinappudu",
                            "Preminchu Rakshakuni sannidhilo",
                            "Aananda samoohamunu chuchuchunnanu"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Santhoshamtho nindi aascharyamutho",
                            "Chuttu nilichi sthuthinchuchunnaru",
                            "Aa bangaru muhamunu chuda aashinchinavaru",
                            "Ullasamuga ippudu chuchuchunnaru"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Thandri thana చేthulatho kanneeranniyu",
                            "Saswathamuga thudichi vesenu",
                            "Bangaru veenalu patkoni purnamuga",
                            "Karthanu sthuthinchuchunnaru"
                        ]
                    },
                    {
                        verse: "4",
                        lines: [
                            "Gorrepilla rakthamulo thama vasthramulanu",
                            "Baguga uthukunna samooham veeru",
                            "Yesu yokka viluvaina raktha shakthi valana",
                            "Purnaga parishudhuluga marinavaru"
                        ]
                    },
                    {
                        verse: "5",
                        lines: [
                            "Thala meeda bangaru kireetamulu",
                            "Thellani vasthramulu dharinchinavaru",
                            "Chethulo thati aakulu pattukoni",
                            "Anandamtho sthuthi paduchunnaru"
                        ]
                    },
                    {
                        verse: "6",
                        lines: [
                            "Nenu kuda thvaraga aa samoohamulo cheruthanu",
                            "Parishudhulatho kalisi aanamdinchutaaku",
                            "Lokam vaddu naaku emi vaddu",
                            "Naa Prabhuvu sannidhilo cherithe chalu"
                        ]
                    }
                ]
            }
        }
    },
    {
        id: "ente-daivam-mahathwathil",
        slug: "ente-daivam-mahathwathil",
        title: "Ente Daivam Mahathwathil",
        videoUrl: "https://www.youtube.com/embed/toymNijL4JM",
        description: "Christian Malayalam Devotional Song Lyrics",
        translations: {
            malayalam: {
                lang: "Malayalam (Transliterated)",
                lyrics: [
                    {
                        lines: [
                            "Ente Daivam mahathwathil aadravanay jeevikkumbol",
                            "Sadhu njanee kshoni thannil kleshippan",
                            "Eathum kaaryamillennente ullam chollunnu"
                        ]
                    },
                    {
                        lines: [
                            "Vaishamyamullethu kunnum kara kery nada kolvan",
                            "Rekshakanen kaalukalkku vegamay",
                            "Theernnen paathayil njan maanine pol odidum"
                        ]
                    },
                    {
                        lines: [
                            "Aarumenikkillenno njan eakanayi theernnuvenno",
                            "Maanasathil aadhi poondu khedhippan",
                            "Sadhu andhanayi theernnidalle Daivame"
                        ]
                    },
                    {
                        lines: [
                            "Ente nithya snehithanmar Daiva dootha sanghamathre",
                            "Ippolavar Daiva unpil sevayay",
                            "Enne kaaval cheythu shushrooshippan vannidum"
                        ]
                    },
                    {
                        lines: [
                            "Dhukhithanay odi poy njan marubhoovil kidannalum",
                            "Enne orthu Daiva doothar vannidum",
                            "Eattam sneha choododappavumay vannidum"
                        ]
                    },
                    {
                        lines: [
                            "Naaleye konden manassil leva lesham bharamilla",
                            "Oro naalum Daiovamenne pottunnu",
                            "Thante kailkalil njan dhinam thorum charunnu"
                        ]
                    },
                    {
                        lines: [
                            "Haa mahesha karunesha ponnu thatah neeyenikkay",
                            "Vendethellam dhaya thonny nalkumbol",
                            "Ente dhehi vrudha kalangunnathenthinay"
                        ]
                    }
                ]
            },
            english: {
                lang: "English",
                lyrics: [
                    {
                        lines: [
                            "When my God lives in glory with compassion",
                            "My heart says there is no reason at all",
                            "For me, a poor one, to suffer on this earth"
                        ]
                    },
                    {
                        lines: [
                            "To climb and walk over any difficult hill",
                            "My Savior becomes speed for my feet",
                            "I will run like a deer on my path"
                        ]
                    },
                    {
                        lines: [
                            "Thinking I have no one, or that I am all alone",
                            "To worry and grieve in my mind",
                            "O God, do not let this poor one become blind"
                        ]
                    },
                    {
                        lines: [
                            "My eternal friends are the host of angels",
                            "Now in God's kindness, for service",
                            "They will come to guard and minister to me"
                        ]
                    },
                    {
                        lines: [
                            "Even if I run away in sorrow and lie in the desert",
                            "Remembering me, God's angels will come",
                            "They will come with bread and great warmth of love"
                        ]
                    },
                    {
                        lines: [
                            "I have absolutely no burden in my mind about tomorrow",
                            "Each day God nourishes me",
                            "Daily I lean upon His hands"
                        ]
                    },
                    {
                        lines: [
                            "Oh Great Lord, Lord of Mercy, Golden Father, for me",
                            "When You mercifully give everything needed",
                            "Why should my soul be troubled in vain?"
                        ]
                    }
                ]
            },
            hindi: {
                lang: "Hindi",
                lyrics: [
                    {
                        lines: [
                            "Jab mera Parmeshwar mahima mein daya ke saath rehta hai",
                            "Mera dil kehta hai ki koi karan nahi",
                            "Ki main deen-heen is dharti par klesh uthaun"
                        ]
                    },
                    {
                        lines: [
                            "Kisi bhi kathin pahad par chadhne aur chalne ke liye",
                            "Mera Uddharkarta mere pairon ke liye gati ban jata hai",
                            "Main apne path par hiran ki tarah daudunga"
                        ]
                    },
                    {
                        lines: [
                            "Ki mera koi nahi hai, ya main akela ho gaya hoon",
                            "Man mein chinta karke shok karne ke liye",
                            "He Parmeshwar, is deen ko andha na hone de"
                        ]
                    },
                    {
                        lines: [
                            "Mere anant mitra swargdooton ka dal hai",
                            "Ab Parmeshwar ki kripa mein, seva ke liye",
                            "Ve meri raksha aur sewa karne aayenge"
                        ]
                    },
                    {
                        lines: [
                            "Chahe main dukhi hokar bhaag jaun aur marusthal mein pada rahun",
                            "Mujhe yaad karke Parmeshwar ke doot aayenge",
                            "Ve roti aur bade prem ki garmahat ke saath aayenge"
                        ]
                    },
                    {
                        lines: [
                            "Kal ke liye mere man mein zara bhi bojh nahi hai",
                            "Har din Parmeshwar mera palan karta hai",
                            "Main roz Uske hathon par sahara leta hoon"
                        ]
                    },
                    {
                        lines: [
                            "He Mahesh, Karunesh, Sone jaise Pita, mere liye",
                            "Jab Aap daya karke zaroorat ki har cheez dete hain",
                            "To meri aatma vyarth mein kyon vyakul ho?"
                        ]
                    }
                ]
            },
            tamil: {
                lang: "Tamil",
                lyrics: [
                    {
                        lines: [
                            "En Devan magimaiyil irakkathodu vaazhumbol",
                            "Yezhaiyaana naan indha boomiyil thunburuvaan",
                            "Yedhum kaaranam illai endru en ullam solgirathu"
                        ]
                    },
                    {
                        lines: [
                            "Kadinamaana endha malayayum yeri nadakka",
                            "Ratchagar en kaalgallukku vegamaaga",
                            "Maarinaar, en paadhayil naan maanai pol oduven"
                        ]
                    },
                    {
                        lines: [
                            "Yaarum enakku illai endro, naan thaniyanaen endro",
                            "Manathil kavalai kondu thukkippaaan",
                            "Devane, indha yezhai kurudanaga aaga vidatheer"
                        ]
                    },
                    {
                        lines: [
                            "En nithya nanbargal Deva thootha kootame",
                            "Ippodhu avargal Deva anbil sevaiyaga",
                            "Ennai kaathu panivida seiya varuvaargal"
                        ]
                    },
                    {
                        lines: [
                            "Dukkhithanai odi poi naan vanaantharathil kidanthaalum",
                            "Ennai ninaithu Deva thoothar varuvaargal",
                            "Migundha anbu veppathodu appavumai varuvaargal"
                        ]
                    },
                    {
                        lines: [
                            "Naalaiaye kurithu en manathil siridhum baaram illai",
                            "Ovvoru naalum Devan ennai poshikkiraar",
                            "Avar karangalil naan dhinam thorum saargiraen"
                        ]
                    },
                    {
                        lines: [
                            "Ha Mahesha, Karunesha, Ponnu Pithave, enakkaga",
                            "Vendiyadhellam dhaiyai katti tharumbol",
                            "En aathma veenaai kalanguvathu yaen?"
                        ]
                    }
                ]
            },
            telugu: {
                lang: "Telugu",
                lyrics: [
                    {
                        lines: [
                            "Naa Devudu mahimalo dayatho jeevinchuchundaga",
                            "Pedavaadanan nenu ee bhoo meeda baadha padutaku",
                            "Edi kaaranam ledani naa ullam cheppuchunnadi"
                        ]
                    },
                    {
                        lines: [
                            "Kashtamaina ye kondanaina ekka naduchutaku",
                            "Rakshakudu naa kaallakuvegamuga",
                            "Maarenu, naa maargamulo nenu jinka vale parigethudunu"
                        ]
                    },
                    {
                        lines: [
                            "Evaru naaku lerano, nenu ontari ayyanano",
                            "Manasulo chinthinchi dukhinchutaku",
                            "O Deva, ee pedavaadini gruuddivaani ga kaaniyakumu"
                        ]
                    },
                    {
                        lines: [
                            "Naa nithya snehithulu Deva doothala samoohame",
                            "Ippudu vaaru Deva dayalo seva koraku",
                            "Nannu kaapaadi paricharyamu cheyutaku vastaru"
                        ]
                    },
                    {
                        lines: [
                            "Dukhithunai pariipoyi nenu edarilo padunna",
                            "Nannu talachi Deva doothalu vastaru",
                            "Entho prema veshnamutho rotteyu techaru"
                        ]
                    },
                    {
                        lines: [
                            "Repu gurinchi naa manasulo isumantha bharamu ledu",
                            "Prathi roju Devudu nannu poshinchuchunnaru",
                            "Aayana hasthamulapai nenu prathi roju aanukuntunnanu"
                        ]
                    },
                    {
                        lines: [
                            "Haa Mahesha, Karunesha, Bangaru Thandri, naakoraku",
                            "Kaavalsinavanni daya thalachi ichinappudu",
                            "Naa aathma vrudhaga kalavara paduta enduku?"
                        ]
                    }
                ]
            }
        }
    },
    {
        id: "gin-gin-ke-stuthi-karu",
        slug: "gin-gin-ke-stuthi-karu",
        title: "Gin Gin Ke Stuthi Karu",
        videoUrl: "https://www.youtube.com/embed/0iKUxiCfq_4",
        description: "Hindi Christian Devotional Song Lyrics",
        translations: {
            hindi: {
                lang: "Hindi (Transliterated)",
                lyrics: [
                    {
                        lines: [
                            "Gin gin ke stuti karoon",
                            "Beshumaar tere daanon ke lie",
                            "Abb tak toone sambhaala mujhe",
                            "Apanee baahon mein liye huai"
                        ]
                    },
                    {
                        verse: "1",
                        lines: [
                            "Tere shatru ka nishaana",
                            "Tujh par hoga na saphal",
                            "Aankhon kee putalee jaise",
                            "Vo rakhega tujhe har pal"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Aadhiyaan ban ke aaye",
                            "Zindagee ke phikar",
                            "Kaun hai tera khevanahaara",
                            "Hai bharosa tera kidhar"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Aaye tujhe jo mitaane",
                            "Ve shastr hogen be asar",
                            "Tera rachanevaala tujh par",
                            "Rakhata hai apanee najar"
                        ]
                    }
                ]
            },
            english: {
                lang: "English",
                lyrics: [
                    {
                        lines: [
                            "I will praise You one by one",
                            "For Your countless gifts to me",
                            "You have sustained me until now",
                            "Holding me within Your arms"
                        ]
                    },
                    {
                        verse: "1",
                        lines: [
                            "The target of your enemy",
                            "Will not prosper against you",
                            "Like the apple of His eye",
                            "He will keep you every moment"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "Though they come like storms",
                            "The worries of this life",
                            "Who is your Helmsman and Guide",
                            "Where have you placed your trust?"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "Those who come to destroy you",
                            "Those weapons will have no effect",
                            "Your Creator keeps His watch",
                            "Fixed steadily upon you"
                        ]
                    }
                ]
            },
            hindiOriginal: {
                lang: "Hindi",
                lyrics: [
                    {
                        lines: [
                            "गिन गिन के स्तुति करूँ",
                            "बेशुमार तेरे दानों के लिए",
                            "अब तक तूने सम्भाला मुझे",
                            "अपनी बाहों में लिये हुऐ"
                        ]
                    },
                    {
                        verse: "1",
                        lines: [
                            "तेरे शत्रु का निशाना",
                            "तुझ पर होगा न सफल",
                            "आँखों की पुतली जैसे",
                            "वो रखेगा तुझे हर पल"
                        ]
                    },
                    {
                        verse: "2",
                        lines: [
                            "आधियाँ बन के आये",
                            "ज़िन्दगी के फिकर",
                            "कौन है तेरा खेवनहारा",
                            "है भरोसा तेरा किधर"
                        ]
                    },
                    {
                        verse: "3",
                        lines: [
                            "आये तुझे जो मिटाने",
                            "वे शस्त्र होगें बे असर",
                            "तेरा रचनेवाला तुझ पर",
                            "रखता है अपनी नजर"
                        ]
                    }
                ]
            }
        }
    },
];

// Import migrated songs and merge (hand-curated songs take priority)
import migratedSongsData from './migrated-songs.json';

const existingSlugs = new Set(songs.map(s => s.slug));
const migratedSongs: Song[] = (migratedSongsData as Song[]).filter(
    (s) => !existingSlugs.has(s.slug)
);

// Export the combined list  
export const allSongs: Song[] = [...songs, ...migratedSongs];
