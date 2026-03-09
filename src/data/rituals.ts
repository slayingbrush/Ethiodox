export interface Ritual {
  id: string;
  title: string;
  slug: string;
  category: string;
  geezName: string;
  description: string;
  significance: string;
  procedure: string[];
  prayers: string[];
  requirements: string[];
  additionalNotes: string;
}

export const ritualCategories = [
  "Holy Sacraments (Mysteries)",
  "Church Services & Worship",
  "Life Ceremonies",
  "Monastic & Clergy Traditions",
  "Devotional Practices",
];

export const rituals: Ritual[] = [
  // ==========================================
  // HOLY SACRAMENTS
  // ==========================================
  {
    id: "1",
    title: "Holy Baptism (Kristina / Timkite Kristina)",
    slug: "baptism",
    category: "Holy Sacraments (Mysteries)",
    geezName: "ጥምቀተ ክርስትና",
    description:
      "Baptism is the sacrament of entry into the Christian life and the Church. In the Ethiopian Orthodox tradition, baptism is performed by triple immersion in water in the name of the Holy Trinity. It is always followed immediately by Chrismation (anointing with holy oil) and the reception of Holy Communion.",
    significance:
      "Baptism washes away original sin and all sins committed before baptism. It is the spiritual birth — being 'born of water and the Spirit' (John 3:5). Through baptism, we die with Christ and rise with Him to new life (Romans 6:3-4). Without baptism, one cannot receive any other sacrament or enter the kingdom of heaven.",
    procedure: [
      "The priest exorcises the water, commanding all evil spirits to depart",
      "The priest blesses the water with special prayers, invoking the Holy Spirit to sanctify it",
      "The candidate (or godparent on behalf of an infant) renounces Satan three times, facing west",
      "The candidate confesses faith in Christ three times, facing east",
      "The Nicene Creed is recited",
      "The priest anoints the candidate with the Oil of Gladness (Tsebel) on the forehead, chest, back, hands, and feet",
      "The candidate is immersed three times in the name of the Father, the Son, and the Holy Spirit",
      "The candidate is vested in white garments symbolizing purity and new life",
      "Chrismation follows immediately — anointing with Myron (holy chrism) on 36 parts of the body",
      "The newly baptized receives Holy Communion",
    ],
    prayers: [
      "Exorcism prayers — commanding Satan to depart from the water and the candidate",
      "Blessing of the Water — 'O God, who made the waters of the Jordan to be a fountain of sanctification...'",
      "Baptismal formula — 'I baptize you in the name of the Father, and of the Son, and of the Holy Spirit'",
      "Chrismation prayers — sealing with the gift of the Holy Spirit",
      "Post-baptismal thanksgiving prayers",
    ],
    requirements: [
      "Male infants are baptized on the 40th day after birth; female infants on the 80th day",
      "Adult converts must undergo a period of instruction (catechumenate) before baptism",
      "A godparent (Yekristina Abat/Innat) must be present",
      "The baptism must be performed by an ordained priest",
      "Triple immersion is required — sprinkling is not accepted",
      "A white baptismal garment (Libs Kristina) is provided",
      "A mateb (baptismal cord) is placed around the neck — worn for life",
    ],
    additionalNotes:
      "The mateb (ማጠብ) — a blue, red, or multi-colored cord worn around the neck — is a distinctive sign of Ethiopian Orthodox baptism. It is tied during the baptism ceremony and worn throughout life as a sign of membership in the Church. Removing the mateb is considered a grave matter, as it symbolizes one's covenant with God through baptism.",
  },
  {
    id: "2",
    title: "Holy Chrismation (Qibat / Meron)",
    slug: "chrismation",
    category: "Holy Sacraments (Mysteries)",
    geezName: "ቅባት / ሜሮን",
    description:
      "Chrismation (anointing with Holy Chrism / Myron) is the sacrament by which the newly baptized receives the gift of the Holy Spirit. In the Ethiopian tradition, it is administered immediately after baptism. The priest anoints the candidate with the Holy Myron (sacred chrism oil) on 36 parts of the body.",
    significance:
      "Chrismation is the personal Pentecost of each believer — the descent of the Holy Spirit upon the individual. Just as the Apostles received the Holy Spirit on Pentecost, each Christian receives the Spirit through Chrismation. It confirms and seals the grace received in Baptism and empowers the believer for the Christian life.",
    procedure: [
      "Immediately after baptism, while the candidate is still in white garments",
      "The priest takes the Holy Myron (consecrated chrism oil)",
      "The candidate is anointed on 36 points of the body, including:",
      "— Forehead (seal of the Holy Spirit on the mind)",
      "— Eyes (to see the things of God)",
      "— Ears (to hear the word of God)",
      "— Nostrils (to perceive the fragrance of Christ)",
      "— Mouth (to confess the faith)",
      "— Chest (to guard the heart)",
      "— Hands (to do the works of God)",
      "— Feet (to walk in the way of righteousness)",
      "At each anointing, the priest says: 'The seal of the gift of the Holy Spirit'",
      "The candidate then receives Holy Communion for the first time",
    ],
    prayers: [
      "Prayer of the Holy Myron — invoking the Holy Spirit",
      "'Hatme Wehibate Menfes Kidus' — 'The seal of the gift of the Holy Spirit'",
      "Thanksgiving prayers for the gift of the Spirit",
    ],
    requirements: [
      "Must follow immediately after Baptism",
      "Only the Holy Myron consecrated by the Patriarch may be used",
      "Administered by an ordained priest",
    ],
    additionalNotes:
      "The Holy Myron (Meron) is a special chrism oil consecrated by the Patriarch with great ceremony. It is distributed to all parishes and is treated with the utmost reverence. The Ethiopian Church's Myron tradition connects it to the apostolic practice of anointing described in Acts and the Epistles.",
  },
  {
    id: "3",
    title: "Holy Eucharist (Kidus Kurban)",
    slug: "eucharist",
    category: "Holy Sacraments (Mysteries)",
    geezName: "ቅዱስ ቁርባን",
    description:
      "The Holy Eucharist is the central sacrament of the Ethiopian Orthodox Church — the true Body and Blood of Jesus Christ, offered in the Divine Liturgy (Kidase). The bread is baked by the deacons in a special building (Betelehem — 'House of Bread') attached to the church, and the wine is prepared according to ancient tradition.",
    significance:
      "The Eucharist is the continuation of Christ's sacrifice on the Cross, made present in the Liturgy. Through it, the faithful commune with God Himself, receiving the medicine of immortality and the pledge of eternal life. It is the source and summit of the Church's life.",
    procedure: [
      "The bread (Himbasha) is baked by the deacons using pure wheat flour, water, and leaven — no oil, eggs, or milk",
      "The bread is stamped with a cross pattern dividing it into sections",
      "The wine is prepared from grapes or raisins mixed with water",
      "The priest prepares the gifts during the Preparation (Ser'ata Kidase)",
      "The Liturgy of the Word includes readings from the Epistles, Acts, and Gospel",
      "The Anaphora (great Eucharistic prayer) is prayed — the Ethiopian Church has 14 Anaphoras",
      "At the Words of Institution, the bread and wine become the Body and Blood of Christ",
      "The faithful who have prepared through fasting and confession approach for Communion",
      "Communion is received in both kinds — the priest places a piece of the consecrated bread dipped in the consecrated wine on the tongue of the communicant",
      "After communion, the faithful drink blessed water and receive blessed bread (Tsirha)",
    ],
    prayers: [
      "Ser'ata Kidase — preparatory prayers",
      "The Anaphora of the Apostles (most commonly used)",
      "Words of Institution — 'This is My Body... This is My Blood...'",
      "Epiclesis — prayer invoking the Holy Spirit to transform the elements",
      "The Lord's Prayer before communion",
      "Prayer of thanksgiving after communion",
    ],
    requirements: [
      "Must be fasting from midnight (no food or water)",
      "Must have confessed recent sins to a priest",
      "Must be in a state of repentance",
      "Married couples must abstain from marital relations the night before",
      "Must be a baptized and chrismated Orthodox Christian",
      "Must approach with fear, faith, and love",
      "Women in ritual impurity may not receive (menstruation, post-childbirth period)",
    ],
    additionalNotes:
      "The Ethiopian Church has 14 Anaphoras — the most of any Christian tradition. They are: (1) Apostles, (2) Our Lord Jesus Christ, (3) Our Lady Mary, (4) St. John Son of Thunder, (5) The 318 Orthodox (Nicene Fathers), (6) St. Athanasius, (7) St. Basil, (8) St. Gregory of Armenia, (9) St. Epiphanius, (10) St. John Chrysostom, (11) St. Cyril, (12) St. James of Sarug, (13) St. Dioscorus, (14) St. Gregory of Nyssa. Different Anaphoras are used on different occasions throughout the liturgical year.",
  },
  {
    id: "4",
    title: "Confession & Penance (Nisiha)",
    slug: "confession",
    category: "Holy Sacraments (Mysteries)",
    geezName: "ንስሐ",
    description:
      "Confession (Nisiha) is the sacrament through which sins committed after baptism are forgiven. The penitent confesses their sins to a priest, who grants absolution by the authority given by Christ to His Church. In the Ethiopian tradition, confession is an essential preparation for receiving Holy Communion.",
    significance:
      "Sin wounds the soul and separates us from God. Confession is the medicine of the soul — through it, the barrier of sin is removed and fellowship with God is restored. The priest serves as a witness and spiritual physician, not merely hearing sins but guiding the penitent toward healing and holiness.",
    procedure: [
      "The penitent approaches the priest (Nefse Abat — 'Father of the Soul')",
      "The priest and penitent pray together",
      "The penitent confesses their sins honestly and completely",
      "The priest offers guidance, counsel, and may assign a penance (prayer, fasting, prostrations, etc.)",
      "The priest pronounces the prayer of absolution",
      "The penitent is reconciled to God and the Church",
    ],
    prayers: [
      "Opening prayer of confession",
      "Prayer of absolution — 'May God, through His servant, forgive you all your sins...'",
      "Prayers of thanksgiving for God's mercy",
      "Psalm 51 — the penitential psalm of David",
    ],
    requirements: [
      "Must confess to an ordained priest",
      "Must be sincere and complete — no hiding of sins",
      "Must have genuine repentance and intention to change",
      "Must accept whatever penance the priest assigns",
      "Required before receiving Holy Communion, especially before major feasts",
      "The seal of confession is absolute — the priest may never reveal what is confessed",
    ],
    additionalNotes:
      "The relationship between a penitent and their Nefse Abat (spiritual father/confessor) is one of the most important spiritual relationships in Ethiopian Orthodox life. Many faithful have a regular Nefse Abat whom they consult not only for confession but for ongoing spiritual guidance. The spiritual father knows the penitent's struggles intimately and can offer tailored guidance for spiritual growth.",
  },
  {
    id: "5",
    title: "Holy Matrimony (Teklil / Serg)",
    slug: "matrimony",
    category: "Holy Sacraments (Mysteries)",
    geezName: "ተክሊል / ሠርግ",
    description:
      "Holy Matrimony (Teklil — 'crowning') is the sacrament of marriage in the Ethiopian Orthodox Church. The couple is crowned as king and queen of their new domestic church. The crowning symbolizes their union in Christ, their shared martyrdom of self-sacrifice, and their future glory in the kingdom of heaven.",
    significance:
      "Marriage is not merely a social contract but a sacred mystery. Through it, a man and a woman are united by God into one flesh. The marriage mirrors the relationship between Christ and His Church. The couple establishes a domestic church (Betikristian) and is called to raise their children in the faith.",
    procedure: [
      "The couple undergoes a period of preparation with the priest, including confession",
      "The Matrimony Kidase (Wedding Liturgy) is celebrated, often early in the morning",
      "The priest blesses the rings and places them on the couple's fingers",
      "The couple is anointed with oil",
      "Crowns (Teklil) are placed on the heads of the bride and groom",
      "The couple drinks from a shared cup of blessed wine",
      "The Eucharist is celebrated and the couple receives communion together",
      "The priest binds the couple's hands together with a cloth, symbolizing their union",
      "The couple processes around the altar three times (symbolizing the Trinity)",
      "Blessings and prayers are offered for the new family",
    ],
    prayers: [
      "Blessing of the Rings — 'O Lord, bless these rings as a sign of fidelity...'",
      "Crowning Prayer — 'Crown them with glory and honor...' (from Psalm 8)",
      "Prayer of the Common Cup — blessing the wine of union",
      "The Wedding Anaphora — special Eucharistic prayer for marriage",
      "Prayers for fertility, unity, and lifelong faithfulness",
    ],
    requirements: [
      "Both must be baptized Orthodox Christians",
      "Both must confess and receive communion at the wedding",
      "A Teklil marriage is considered unbreakable — divorce is not recognized (with very limited exceptions)",
      "The ceremony must be performed by a priest",
      "Witnesses and godparents are required",
      "The couple must be free of impediments (not already married, not closely related, etc.)",
    ],
    additionalNotes:
      "In Ethiopian tradition, there are different levels of marriage: (1) Teklil (Crowning) — the full sacramental marriage, considered unbreakable; (2) Semon (civil/customary marriage) — recognized but not sacramental; (3) Kal Kidan (verbal covenant) — a formal agreement. Only Teklil is a full sacrament of the Church. Couples married by Teklil who divorce and remarry without legitimate cause cannot receive communion.",
  },
  {
    id: "6",
    title: "Holy Orders (Simet / Kihenat)",
    slug: "holy-orders",
    category: "Holy Sacraments (Mysteries)",
    geezName: "ሲመት / ክህነት",
    description:
      "Holy Orders is the sacrament by which men are ordained to serve the Church as deacons, priests, or bishops. The Ethiopian Orthodox Church has maintained apostolic succession — an unbroken chain of ordination from the Apostles to the present day.",
    significance:
      "Through ordination, men are set apart and empowered by the Holy Spirit to serve the Church in specific roles: deacons serve at the altar and assist the priest; priests (kesis) celebrate the sacraments and pastor the faithful; bishops (episkopos) oversee the churches and ordain clergy. The priesthood is essential to the life of the Church — without priests, there can be no Eucharist.",
    procedure: [
      "The candidate is presented to the bishop by the church community",
      "The candidate's worthiness is examined",
      "The bishop lays hands on the candidate (the essential act of ordination)",
      "The bishop prays the prayer of ordination specific to the order being conferred",
      "The newly ordained is vested in the vestments of their order",
      "For priests: vestments include the Qob (cap), Qamis (robe), and Qenat (belt)",
      "The newly ordained celebrates or assists at the Liturgy for the first time in their new capacity",
    ],
    prayers: [
      "Prayer of Examination — testing the candidate's faith and knowledge",
      "Laying on of Hands — 'Receive the Holy Spirit for the ministry of...'",
      "Ordination Prayer specific to each order",
      "Prayer of vesting — blessing each vestment as it is put on",
    ],
    requirements: [
      "Deacons: must be at least a young man, baptized, and learned in the faith",
      "Priests: must be a mature man, usually married (marriage must occur before ordination)",
      "Bishops: must be a celibate monk",
      "All candidates must have knowledge of the Ge'ez liturgy and theological training",
      "Only a bishop can ordain",
      "The community must testify to the candidate's character",
    ],
    additionalNotes:
      "The Ethiopian Church has a unique hierarchy of church scholars: Debteras (church scholars/chanters) are not ordained but play a crucial role in church services. They are masters of Zema (sacred music), Aquaquam (sacred dance), and Qine (religious poetry). They perform the elaborate chanting and drumming that characterizes Ethiopian liturgy. While not clergy, they are essential to the worship life of the Church.",
  },
  {
    id: "7",
    title: "Anointing of the Sick (Qandil / Ye'Himuman Qebat)",
    slug: "anointing-of-sick",
    category: "Holy Sacraments (Mysteries)",
    geezName: "ቀንዲል / የሕሙማን ቅባት",
    description:
      "The Anointing of the Sick is the sacrament by which the Church prays for the healing — both physical and spiritual — of those who are ill. The priest anoints the sick person with blessed oil and prays for God's healing mercy.",
    significance:
      "This sacrament is rooted in the apostolic practice: 'Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord' (James 5:14). It brings God's grace to those suffering illness, giving comfort, strength, and sometimes physical healing. It also prepares the soul for whatever God wills — whether recovery or departure from this life.",
    procedure: [
      "The priest is called to the home or hospital of the sick person",
      "Prayers are offered, including readings from Scripture",
      "The priest blesses oil (Qandil)",
      "The sick person is anointed with the blessed oil on the forehead and other parts of the body",
      "Prayers for healing are offered",
      "If possible, the sick person receives Holy Communion",
      "The priest may also hear confession before the anointing",
    ],
    prayers: [
      "James 5:14-16 reading — the biblical basis for anointing the sick",
      "Prayer of blessing the oil",
      "Prayers for healing of body and soul",
      "Psalm 103 — 'Who heals all your diseases'",
      "Prayer commending the sick person to God's mercy",
    ],
    requirements: [
      "The person must be genuinely ill (not merely uncomfortable)",
      "A priest must perform the anointing",
      "The sick person should confess their sins if able",
      "Family members may be present to pray",
    ],
    additionalNotes:
      "In Ethiopian tradition, holy water (Tsebel) also plays a major role in healing. Many churches have springs or fonts of blessed water that the faithful use for healing. The priest blesses the water with special prayers, and the faithful drink it, bathe in it, or have it sprinkled on them. Major Tsebel sites include the holy water at various monasteries and churches throughout Ethiopia.",
  },
  // ==========================================
  // CHURCH SERVICES & WORSHIP
  // ==========================================
  {
    id: "8",
    title: "Wazema (Eve-of-Feast Vigil)",
    slug: "wazema",
    category: "Church Services & Worship",
    geezName: "ዋዜማ",
    description:
      "Wazema is the eve-of-feast vigil service unique to Ethiopian Orthodox worship. Before every major feast, the church holds an elaborate all-night (or extended evening) service of hymns, prayers, and sacred music. The Debteras perform the ancient chants of St. Yared, accompanied by drums (kebero), sistra (tsenatsel), and prayer staffs (mequamia). The Wazema is one of the most distinctive and beautiful features of Ethiopian Orthodox worship.",
    significance:
      "The Wazema prepares the hearts and minds of the faithful for the coming feast. It is based on the principle that sacred time begins with the evening — 'there was evening and there was morning, one day' (Genesis 1:5). The elaborate music and prayer of the Wazema is a form of spiritual preparation that engages the whole person — body, mind, and spirit. The Debteras' performance of the ancient chants preserves over 1,400 years of sacred musical tradition.",
    procedure: [
      "The service begins in the evening before the feast day",
      "The Debteras take their positions in the church, usually in two facing choirs",
      "They begin chanting the Mezmur (hymns) specific to the feast",
      "The chanting follows the three modes (Ge'ez, Izil, Araray) established by St. Yared",
      "Drums (kebero) provide the rhythmic foundation",
      "Sistra (tsenatsel — metal rattles) add their distinctive sound",
      "Prayer staffs (mequamia) are used for rhythm and to lean on during the long service",
      "The Aquaquam (sacred movement/dance) accompanies certain hymns",
      "Scripture readings specific to the feast are interspersed",
      "The service continues through the night until the dawn liturgy begins",
    ],
    prayers: [
      "Mezmur — specific hymns for each feast, composed in the tradition of St. Yared",
      "Degua — the main hymnbook of the Ethiopian Church, containing hymns for the entire year",
      "Tsome Degua — the Lenten hymnbook",
      "Mewasit — special festal hymns",
      "Scripture readings related to the feast",
    ],
    requirements: [
      "Led by trained Debteras (church scholars) who have mastered the Zema (sacred music)",
      "Requires kebero (drums), tsenatsel (sistra), and mequamia (prayer staffs)",
      "The specific hymns vary according to the feast being celebrated",
      "The faithful attend as they are able — some stay the entire night, others for portions",
    ],
    additionalNotes:
      "The training of a Debtera takes many years — often a decade or more. They must memorize an enormous body of hymnography, master the three musical modes, and learn the intricate movements of the Aquaquam. The schools where Debteras are trained (often at major monasteries) are among the most important educational institutions in Ethiopian Orthodox tradition. The tradition of Zema (sacred music) begun by St. Yared in the 6th century is preserved almost entirely through oral transmission.",
  },
  {
    id: "9",
    title: "Mahlet (Night Prayer Office)",
    slug: "mahlet",
    category: "Church Services & Worship",
    geezName: "ማኅሌት",
    description:
      "Mahlet is the night prayer service of the Ethiopian Orthodox Church, performed by the Debteras and clergy in the hours before dawn. It consists of elaborate chanting of psalms, hymns, and prayers using the sacred music tradition of St. Yared. Mahlet is the musical heart of Ethiopian Orthodox worship and is performed every night in major churches and monasteries.",
    significance:
      "The Mahlet fulfills the biblical command to praise God in the night watches: 'At midnight I rise to give you thanks' (Psalm 119:62). It connects the faithful to the angelic worship that never ceases before God's throne. The elaborate sacred music of the Mahlet is one of the oldest continuous musical traditions in the world.",
    procedure: [
      "Begins in the pre-dawn hours (typically 3:00 or 4:00 AM)",
      "The Debteras gather in the church with their instruments",
      "The chanting follows the specific hymns assigned for that day in the Degua",
      "The three modes of St. Yared's music are used: Ge'ez (solemn), Izil (meditative), Araray (joyful)",
      "Psalms are chanted in Ge'ez",
      "The Aquaquam (sacred movement) accompanies certain sections",
      "The Mahlet concludes as the sun rises and the Kidase (Liturgy) begins",
    ],
    prayers: [
      "Selected Psalms — chanted in Ge'ez with St. Yared's musical notation",
      "Degua hymns for the specific day",
      "Weddase Maryam (Praises of Mary) — often included",
      "Canticles and odes from Scripture",
    ],
    requirements: [
      "Trained Debteras who know the Zema (sacred music) system",
      "Knowledge of the Degua hymnbook",
      "Musical instruments: kebero, tsenatsel, mequamia",
    ],
    additionalNotes:
      "The Mahlet is not a public service in the same way as the Kidase — it is primarily the prayer of the clergy and Debteras. However, devout laypeople sometimes attend, especially on feast days. In monasteries, the Mahlet is more elaborate and may include additional offices. The tradition preserves St. Yared's music system almost unchanged for over 1,400 years.",
  },
  {
    id: "10",
    title: "Aquaquam (Sacred Liturgical Movement)",
    slug: "aquaquam",
    category: "Church Services & Worship",
    geezName: "አቋቋም",
    description:
      "Aquaquam is the sacred liturgical movement (sometimes called 'sacred dance') performed during Ethiopian Orthodox worship services, especially during the Wazema and Mahlet. It involves rhythmic movements, swaying, and gentle footwork performed by the Debteras while chanting and playing instruments. It is a distinctively Ethiopian form of worship that integrates the entire body into the praise of God.",
    significance:
      "Aquaquam is rooted in the biblical tradition of physical worship: David danced before the Ark of the Covenant (2 Samuel 6:14), and the Psalms repeatedly call for praise with the whole body. Ethiopian tradition holds that Aquaquam, like the Zema, was revealed to St. Yared by divine inspiration. It expresses the joy, reverence, and wholeness of Orthodox worship — engaging body, mind, and spirit in the praise of God.",
    procedure: [
      "Performed during specific portions of the Wazema and Mahlet",
      "The Debteras stand in formation, usually in two facing rows",
      "They hold prayer staffs (mequamia) and sistra (tsenatsel)",
      "The movements follow specific patterns coordinated with the music",
      "Swaying, gentle stepping, and rhythmic movements express the text being chanted",
      "The movements vary according to the feast and the mode of music being used",
      "On major feasts (Timkat, Meskel), the Aquaquam may be performed outdoors",
    ],
    prayers: [
      "The Aquaquam accompanies specific hymns — it is not a separate prayer but an embodied form of the hymns being chanted",
      "The Degua and Tsome Degua contain notations for when Aquaquam is performed",
    ],
    requirements: [
      "Years of training under a master Debtera",
      "Memorization of the movement patterns for different feasts and modes",
      "Coordination with the other Debteras and the music",
    ],
    additionalNotes:
      "Aquaquam is taught in specialized schools, often at famous monasteries. The training is rigorous and can take many years. Different regional traditions have slightly different styles of Aquaquam, but all are rooted in the tradition attributed to St. Yared. The movements are not improvised — they follow specific learned patterns that have been transmitted from teacher to student for centuries.",
  },
  // ==========================================
  // LIFE CEREMONIES
  // ==========================================
  {
    id: "11",
    title: "Funeral Rites (Ye'Sew Qebir)",
    slug: "funeral-rites",
    category: "Life Ceremonies",
    geezName: "የሰው ቀብር",
    description:
      "Ethiopian Orthodox funeral rites are elaborate and deeply meaningful ceremonies that commend the departed to God's mercy and comfort the grieving. The Church teaches that death is not the end but a transition — the faithful departed rest in hope of the resurrection.",
    significance:
      "The funeral rites affirm the Christian hope in the resurrection of the dead. They pray for the repose of the soul, asking God to receive the departed into a place of light, joy, and peace. They also comfort the living with the assurance that death has been conquered by Christ's Resurrection.",
    procedure: [
      "Upon death, the body is washed and prepared (usually by family members of the same sex)",
      "The body is wrapped in white cloth (resembling the baptismal garment)",
      "The body is brought to the church for the funeral service",
      "The priest leads the funeral Kidase (Liturgy) — this is a full eucharistic service",
      "Specific funeral hymns (Mekbir) are chanted by the Debteras",
      "Scripture readings focus on hope, resurrection, and God's mercy",
      "The priest reads the absolution prayer (Fithat) over the body",
      "The body is carried in procession to the burial site",
      "At the grave, final prayers are offered",
      "Earth is thrown on the coffin with the words 'dust to dust'",
      "After burial, a memorial meal (Teskar) is held for mourners",
    ],
    prayers: [
      "Mekbir — funeral hymns chanted by Debteras",
      "Fithat — the absolution prayer, asking God to forgive the sins of the departed",
      "Psalm 23 — 'The LORD is my shepherd'",
      "John 11:25-26 — 'I am the resurrection and the life'",
      "1 Thessalonians 4:13-18 — 'We do not grieve as those who have no hope'",
      "Prayer for the repose of the soul in a place of light, joy, and peace",
    ],
    requirements: [
      "The funeral should be conducted by a priest",
      "Burial should take place as soon as possible, preferably on the day of death",
      "The body is buried facing east (toward Jerusalem / the rising sun)",
      "Cremation is not permitted in Ethiopian Orthodox tradition",
    ],
    additionalNotes:
      "Memorial services (Teskar/Tezkar) are held on the 3rd, 7th, 12th, 40th day, 6 months, and 1 year after death, and annually thereafter. The 40th-day memorial is considered especially important. At each memorial, a Kidase is celebrated, prayers are offered for the departed, and a meal is served to honor their memory. The names of the departed are also remembered regularly during the Liturgy.",
  },
  {
    id: "12",
    title: "House Blessing (Ye'Bet Meret Birakat)",
    slug: "house-blessing",
    category: "Life Ceremonies",
    geezName: "የቤት ምሬት በረከት",
    description:
      "When an Ethiopian Orthodox family moves into a new home, they invite a priest to bless the house. The priest sprinkles holy water in every room, prays for God's protection over the home and its inhabitants, and may also celebrate a Kidase in the house.",
    significance:
      "The house blessing sanctifies the dwelling place, dedicating it to God. It invokes God's protection against evil and asks for His blessing on the family. It transforms a building into a domestic church — a place where God is present and worshiped.",
    procedure: [
      "The priest arrives with holy water and incense",
      "Prayers are offered for the protection and blessing of the home",
      "The priest moves through every room, sprinkling holy water and censing with incense",
      "A cross may be placed above the main entrance",
      "Prayers are offered for the family — for health, peace, prosperity, and spiritual growth",
      "A small feast may be shared with the priest and guests",
    ],
    prayers: [
      "Prayer of blessing and protection for the home",
      "Sprinkling of holy water with prayers of sanctification",
      "Psalm 91 — 'He who dwells in the shelter of the Most High'",
      "Prayers against evil spirits and harm",
    ],
    requirements: [
      "An ordained priest",
      "Holy water (Tsebel)",
      "Incense",
    ],
    additionalNotes:
      "Many Ethiopian Orthodox homes maintain a prayer corner with icons, a cross, and a Bible. This serves as the family's domestic altar for daily prayers. The house blessing establishes this sacred space and sets the tone for the home's spiritual life.",
  },
  // ==========================================
  // DEVOTIONAL PRACTICES
  // ==========================================
  {
    id: "13",
    title: "Metania (Prostrations)",
    slug: "metania",
    category: "Devotional Practices",
    geezName: "ምጣኔ",
    description:
      "Metania (prostrations) are an essential form of prayer in Ethiopian Orthodox devotion. They involve bowing deeply or fully prostrating the body on the ground, touching the forehead to the floor. Metanias are performed during church services, personal prayer, and as assigned penance after confession.",
    significance:
      "Prostrations express total submission, humility, and worship before God. They engage the body in prayer — not just the mind and heart. The physical act of lowering oneself to the ground embodies the theological reality of human humility before the infinite God. 'O come, let us worship and bow down; let us kneel before the LORD our Maker' (Psalm 95:6).",
    procedure: [
      "Stand facing east (or toward the altar in church)",
      "Make the sign of the cross",
      "Bow deeply, then lower to the knees",
      "Place the forehead on the ground (full prostration)",
      "Rise and repeat the prescribed number of times",
      "During Lent, hundreds of prostrations may be performed during a single service",
      "Prostrations are not performed on Sundays or during the 50 days of Pentecost (days of resurrection joy)",
    ],
    prayers: [
      "Each prostration is usually accompanied by a short prayer: 'Egziabher Mahirene' ('Lord have mercy')",
      "'Kidus, Kidus, Kidus' may be recited during prostrations",
      "Psalm verses may accompany sets of prostrations",
    ],
    requirements: [
      "Performed during Great Lent and other fasting periods",
      "May be assigned as penance by the confessor",
      "Not performed on Sundays or feast days (days of joy)",
      "Not performed during the 50 days between Easter and Pentecost",
    ],
    additionalNotes:
      "The number of prostrations varies by context. During Great Lent, the faithful may perform hundreds of prostrations during the long services. A common practice for personal prayer is sets of 41 prostrations (in honor of the 41 wounds of Christ). Monks and nuns often perform 300 or more prostrations daily.",
  },
  {
    id: "14",
    title: "Tsebel (Holy Water)",
    slug: "tsebel",
    category: "Devotional Practices",
    geezName: "ጸበል",
    description:
      "Tsebel (holy water) is blessed water that plays a major role in Ethiopian Orthodox spiritual life. It is used for healing, purification, blessing, and spiritual protection. Many Ethiopian churches and monasteries have springs or fonts of holy water, and faithful from all over the country make pilgrimages to receive Tsebel.",
    significance:
      "Holy water carries the blessing and healing power of God. Through the priest's prayers and the invocation of the Holy Spirit, ordinary water becomes a vehicle of divine grace. The use of holy water connects to Christ's own baptism in the Jordan, which sanctified all water. It is one of the most distinctive features of Ethiopian Orthodox piety.",
    procedure: [
      "The priest blesses water with specific prayers, invoking the Holy Spirit",
      "The water may be from a natural spring, well, or container",
      "The faithful drink the holy water with prayer and faith",
      "The faithful may bathe in holy water for healing",
      "Holy water is sprinkled on homes, objects, and people for blessing",
      "Some holy water sites have continuous flows of blessed water",
    ],
    prayers: [
      "Prayer of blessing the water — invoking the Holy Spirit",
      "Prayers for healing and purification",
      "Psalm 51 — prayers of cleansing",
      "Prayers specific to the particular site or devotion",
    ],
    requirements: [
      "The water must be blessed by an ordained priest",
      "The faithful should approach with faith and repentance",
      "Fasting is often observed before receiving Tsebel",
    ],
    additionalNotes:
      "Famous Tsebel sites in Ethiopia include: Entoto Maryam (Addis Ababa), Zuquala Monastery, Waldeba Monastery, and many others. Some sites are associated with particular healings or miracles. The practice of receiving Tsebel is so widespread that it is common for Ethiopian Orthodox Christians to use holy water as a first recourse when facing illness, spiritual disturbance, or difficulty.",
  },
  {
    id: "15",
    title: "Selet (Prayer with a Rosary / Mequteria)",
    slug: "selet",
    category: "Devotional Practices",
    geezName: "ሰሌት / መቁጠሪያ",
    description:
      "The Ethiopian Orthodox prayer rope or rosary (Mequteria) is a string of beads or knots used to count prayers and repetitions of sacred phrases. Unlike the Western rosary, the Ethiopian Mequteria varies in the number of beads and the prayers used. It is commonly used by monks, nuns, and devout laypeople.",
    significance:
      "The Mequteria helps the faithful maintain concentration during extended periods of repetitive prayer. It is a tool for the prayer of the heart — repeating short, powerful prayers until they become internalized and continuous. 'Pray without ceasing' (1 Thessalonians 5:17).",
    procedure: [
      "Hold the Mequteria in the left hand",
      "Begin with the Trinitarian invocation: 'In the name of the Father, and of the Son, and of the Holy Spirit'",
      "Move through each bead while reciting the chosen prayer",
      "Common prayers include 'Egziabher Mahirene' (Lord have mercy), 'Kidist Maryam' prayers, or the Jesus Prayer",
      "Complete the full cycle of beads",
      "The prayer may be repeated multiple times",
    ],
    prayers: [
      "'Egziabher Mahirene' — 'Lord have mercy' (repeated on each bead)",
      "'Iyesus Kristos Yigziabher Lij Hatiaegnahn Mahireny' — a form of the Jesus Prayer",
      "Marian prayers on specific beads",
      "Various short ejaculatory prayers",
    ],
    requirements: [
      "A Mequteria (prayer beads/rope)",
      "Knowledge of the prayers to be used",
      "A quiet space for concentrated prayer",
    ],
    additionalNotes:
      "Monks and hermits may spend many hours each day in prayer with the Mequteria, repeating thousands of prayers. The practice is similar to the Eastern Orthodox Jesus Prayer tradition (hesychasm). Some Ethiopian monks have been known to pray continuously — sleeping only briefly and spending the rest of their time in prayer with the Mequteria.",
  },
];

export function getRitual(slug: string): Ritual | undefined {
  return rituals.find((r) => r.slug === slug);
}

export function getRitualsByCategory(): Record<string, Ritual[]> {
  return rituals.reduce(
    (acc, ritual) => {
      if (!acc[ritual.category]) acc[ritual.category] = [];
      acc[ritual.category].push(ritual);
      return acc;
    },
    {} as Record<string, Ritual[]>
  );
}
