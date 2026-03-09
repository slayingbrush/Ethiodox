export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

export const blogCategories = [
  "Feast Reflections",
  "Faith Stories",
  "Orthodox Life",
  "Community",
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Reflections on Timkat: The Ethiopian Epiphany",
    slug: "reflections-on-timkat",
    category: "Feast Reflections",
    excerpt:
      "A reflection on the beauty and meaning of Timkat, the Ethiopian celebration of Christ's baptism.",
    content: `
Every January, Ethiopia comes alive with one of the most magnificent Christian celebrations on earth: **Timkat** (ጥምቀት) — the Feast of Epiphany, celebrating the baptism of Jesus Christ in the Jordan River.

## The Beauty of Timkat

If you've ever witnessed Timkat, you know it is unforgettable. The Tabots (replicas of the Ark of the Covenant) are carried in solemn procession from every church, accompanied by priests in magnificent vestments, deacons carrying crosses and censers, and thousands of faithful singing, dancing, and praising God.

The procession moves to a body of water — a river, a lake, or a specially prepared pool — where the baptism of Christ is commemorated. The water is blessed, and the people renew their baptismal vows by being sprinkled with the holy water.

## What Timkat Means

Timkat is not just a cultural festival — it is a profound theological celebration:

**The Revelation of the Trinity**: At Christ's baptism, all three Persons of the Holy Trinity were revealed simultaneously — the Father spoke from heaven, the Son was baptized in the water, and the Holy Spirit descended as a dove. This is why Epiphany (literally "manifestation") is celebrated — God revealed Himself fully.

**Our Baptism**: When we celebrate Timkat, we remember our own baptism. In baptism, we died with Christ and rose with Him to new life. The water of Timkat reminds us of the water in which we were born again.

**The Sanctification of Water**: By entering the waters of the Jordan, Christ sanctified all water. He took what was natural and made it a vehicle of grace. This is why the Church uses water for baptism — because Christ transformed water into a means of salvation.

## A Call to Renewal

Timkat invites us to renew our commitment to Christ. When was the last time you thought about your baptism? In baptism, you made promises — or promises were made on your behalf — to renounce Satan, to follow Christ, to live a holy life.

Timkat is the annual invitation to remember those promises and recommit to living them out. The water splashing on your face is a reminder: you belong to Christ. You have been claimed by God. Live accordingly.

## For Those Far From Home

For Ethiopians in the diaspora, Timkat can be bittersweet. The celebrations abroad, while beautiful, cannot fully replicate the grandeur of Timkat in Gondar, Lalibela, or Addis Ababa. But the spiritual reality is the same wherever you are. Christ's baptism is just as real in Minnesota as it is in Addis.

If you're far from home this Timkat, remember: you carry the faith with you. The Church is not a building — it is the people of God gathered around the Eucharist. And wherever the Tabot is, there is the Church in all its fullness.

**Melkam Timkat!** May the baptism of our Lord renew and strengthen your faith.
    `,
    author: "Ethiodox Team",
    date: "2024-01-19",
    tags: ["timkat", "epiphany", "baptism", "feast"],
  },
  {
    id: "2",
    title: "Finding My Faith Again: A Student's Story",
    slug: "finding-my-faith-again",
    category: "Faith Stories",
    excerpt:
      "One young Ethiopian Orthodox Christian's journey of losing and rediscovering faith during college.",
    content: `
*This is a composite story based on the experiences of many young Ethiopian Orthodox Christians. Names and details have been changed.*

---

I grew up going to church every Sunday. My parents were devout — my mom fasted religiously, my dad was a church elder. Church was just what we did. I never questioned it.

Then I went to college.

## The Drift

It started slowly. I skipped church one Sunday because I was tired. Then another because I had a paper due. Then I just... stopped going. Nobody was making me go anymore, and I realized I didn't know why I should go on my own.

In my philosophy class, a professor challenged the existence of God. I didn't have answers. In conversations with friends from other backgrounds, I couldn't explain why I was Orthodox, why we fasted, why we prayed to saints. I had been **doing** these things my whole life without understanding **why**.

By sophomore year, I had stopped calling myself Orthodox. By junior year, I wasn't sure I was Christian at all.

## The Questions

The questions that haunted me were real:
- Is God real, or is religion just cultural programming?
- Why are there so many different churches? How do I know Orthodoxy is right?
- Why does the Church have so many rules? Isn't faith supposed to be about love?
- Why do bad things happen if God is good?

Nobody had ever taught me how to think about these questions. Sunday school had given me Bible stories, but not tools for defending my faith in a secular world.

## The Turn

The turning point came unexpectedly. I was visiting my grandmother in Ethiopia. She was old, poor, and sick. But she had a peace I had never seen in any of my professors or successful friends. She prayed constantly — real, deep prayer. She fasted without complaint. She forgave people who wronged her without hesitation.

I asked her: "Enate, how can you be so peaceful when life is so hard?"

She looked at me and said simply: "Egziabher alle" — "God exists."

That moment broke something open in me. Her faith wasn't theoretical — it was tested, proven, and real. She didn't have philosophical arguments for God's existence. She had something better: a life transformed by His presence.

## The Return

I started going back to church. I started reading — not just the Bible, but the Church Fathers, the lives of the saints, Orthodox theology. I started fasting again, not out of obligation but out of desire. I went to confession for the first time in years and cried.

Everything I had dismissed as "just tradition" turned out to have profound meaning. The fasting wasn't legalism — it was spiritual training. The prayers to saints weren't superstition — they were the communion of the faithful across time. The icons weren't idols — they were windows to heaven.

## What I'd Tell My Younger Self

If I could go back and talk to my freshman self, I'd say:

1. **Your questions are valid** — but don't let them push you away from God. Let them push you deeper into the faith.
2. **Learn your faith** — Read, study, ask questions. Orthodox Christianity has deep, intelligent, beautiful answers to the hardest questions.
3. **Find community** — You can't be Orthodox alone. Find other young Orthodox Christians who are wrestling with the same questions.
4. **Don't confuse culture with faith** — Some of what you grew up with is cultural. But the core — the Trinity, the Eucharist, the saints, the prayers — that is the eternal faith of the Apostles.
5. **Look at the saints** — The proof of Orthodoxy is not in arguments but in transformed lives. Look at the saints — ancient and modern — and see what God can do with a human being who surrenders to Him.

I'm still learning. I still have questions. But I'm asking them from inside the Church now, not from outside. And that has made all the difference.
    `,
    author: "Anonymous",
    date: "2024-02-10",
    tags: ["faith story", "youth", "diaspora", "return"],
  },
  {
    id: "3",
    title: "Living Orthodoxy in a Modern World",
    slug: "living-orthodoxy-modern-world",
    category: "Orthodox Life",
    excerpt:
      "Practical advice for living an Orthodox Christian life in the midst of modern secular culture.",
    content: `
Being an Ethiopian Orthodox Christian in the 21st century is not easy. The world around us moves fast, values comfort over sacrifice, and measures success by material standards. How do we live faithfully in this environment?

## The Challenge

Modern life pulls us in many directions:
- **Busy schedules** make regular church attendance difficult
- **Social media** fills our minds with noise and distraction
- **Secular culture** questions or mocks traditional faith
- **Career pressure** can squeeze out time for prayer and fasting
- **Diaspora life** can isolate us from our church community

These are real challenges. But they are not new — Christians in every age have had to navigate the tension between faith and the surrounding culture.

## Principles for Modern Orthodox Life

### 1. Put God First
"Seek first the kingdom of God and His righteousness, and all these things shall be added to you" (Matthew 6:33). This is not just a nice saying — it is a practical strategy for life. When God comes first, everything else falls into place.

Practically, this means: pray before you check your phone. Go to church before brunch. Fast before you feast.

### 2. Guard Your Mind
What you consume shapes who you become. Be intentional about what you watch, read, and listen to. This doesn't mean becoming a hermit — it means being discerning. Fill your mind with Scripture, the writings of the saints, and edifying content.

### 3. Build Spiritual Habits
The Orthodox life is built on daily habits:
- Morning and evening prayer
- Regular fasting
- Weekly church attendance
- Regular confession
- Daily Scripture reading

These habits are like spiritual scaffolding — they hold your faith in place even when you don't "feel" spiritual.

### 4. Find Your Community
You cannot be Orthodox alone. Find a church community — even if it's small. If there's no Ethiopian Orthodox church near you, visit another Orthodox church. The liturgy may be in a different language, but the faith is the same.

### 5. Be a Witness
You don't need to preach on street corners. But live your faith visibly. When people ask why you're fasting, tell them. When they notice your cross necklace, explain it. When they see your peace, share its source.

### 6. Embrace the Struggle
The Christian life is not supposed to be easy. "In the world you will have tribulation; but be of good cheer, I have overcome the world" (John 16:33). The struggle — the fasting, the early mornings, the discipline — is the very thing that shapes you into a saint.

## The Advantage of Orthodoxy

In a world of constant change, Orthodoxy offers something rare: **stability**. The faith we practice is the same faith of the Apostles, the same faith of the Ethiopian saints, the same faith of our grandmothers. In a sea of shifting opinions and trends, Orthodoxy is the anchor that holds.

You don't need to reinvent Christianity for the modern world. You need to live the ancient faith — fully, joyfully, unapologetically — in the modern world. And when you do, you become a light in the darkness.
    `,
    author: "Ethiodox Team",
    date: "2024-03-05",
    tags: ["modern life", "practical", "diaspora", "spiritual life"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
