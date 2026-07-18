import { Project, JournalEntry, Stat } from './types';

export const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDKWo_cnXETUDRLLrLn7tUlsNI7ADq_32OvZp_MgT0LSAxOZh_Ek1OrhqFMZ9QuOqMbV4HEhqZsve7Z-mTmLUytoP5NHXeDoMO7SzVlrD16aUpQ8ZtmRoZQbFbwsxqUX4wlV4XzrkZ7-vV1fxU8xI61WturKSOjoj5m6pnpaedPb8Ds0xAh65vl_7-bFLXxTtApFw0H6pkzPCkYD3EOmSdLNCvYzE3w9JP3E3ePzvAuD3yWtyEPpMmCpw";
export const PORTRAIT_IMAGE = "/747826750_28126308533620260_5515758719894441412_n.png";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "꒰(つ´ᝪ`)꒱  (◕︵◕)",
    category: "cat",
    description: "兩隻貓貓可愛對看",
    imageUrl: "public/747505070_1722114755596272_1279390321192735817_n.jpg",
    altText: "超可愛",
    fullStory: "去貓咖拍到的兩隻可愛貓貓對看.",
    date: "2026 2 14",
  },
  {
    id: "2",
    title: "ヾ(=`ω´=)ノ(ﾉω-ヾ)",
    category: "cat",
    description: "貓貓抱抱睡覺",
    imageUrl: "public/747735209_1758770391809700_8624223661798912156_n.jpg",
    altText: "超萌",
    fullStory: "貓貓抱抱睡覺有夠萌,雖然他們有隻貓貓後面忽然咬另隻,然後就吵起來了,同間貓咖！",
    date: "2026 2 14",
  },
  {
    id: "3",
    title: "∑(°口°๑)❢❢",
    category: "cat",
    description: "貓貓盯",
    imageUrl: "public/747743415_1072601935432179_8762048485245853318_n.jpg",
    altText: "喵？",
    fullStory: " 一隻超可愛貓貓！沒記錯是所有貓貓的大哥哥",
    date: "2026 2 14",
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "entry-1",
    title: "霸佔領地！ε٩(๑>ω<)۶з",
    date: "0",
    category: "0",
    excerpt: "( 　‘-‘ )ノ)`-‘ )",
    readTime: "0"
  },
  {
    id: "entry-2",
    title: "目前沒東西,所以被顏文字佔領了！",
    date: "0",
    category: "0",
    excerpt: "｡｡｡-(*o･ω･)o",
    readTime: "0"
  },
  {
    id: "entry-3",
    title: "｡.ﾟ+:((ヾ(｡･ω･)ｼ)).:ﾟ+｡",
    date: "0",
    category: "0",
    excerpt: "₍ᐢ..ᐢ₎♡̷⋆｡˚",
    readTime: "0"
  }
];

export const STATS: Stat[] = [
  {
    id: "years-observation",
    value: "0521",
    label: "生日"
  },
  {
    id: "masterpieces",
    value: "點我",
    label: "嗷嗚快點(ღゝ◡╹)ノ ♡"
  }
];
