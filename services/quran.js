import quran from "../quran.json";

const NUM_OF_SURAH_OF_QURAN = 114;

export function getReceiters() {
  return quran.receiters.map((receiter) => ({
    name: receiter.name.ar,
    receiterId: receiter.receiterId,
  }));
}

function asSurahName(suraIdx) {
  return suraIdx.toString().padStart(3, "0") + ".mp3";
}

function asSuraUrl(server, reciterId, suraIdx) {
  return [server, reciterId, asSurahName(suraIdx)].join("/");
}

function makeSuraUrls(server, receiterId) {
  const urls = [];

  for (let suraIdx = 1; suraIdx <= NUM_OF_SURAH_OF_QURAN; suraIdx++) {
    urls.push(asSuraUrl(server, receiterId, suraIdx));
  }

  return urls;
}

function getIndexSurahNames() {
  return quran.surahNames.ar.map((name, idx) => ({ name, surahIdx: idx + 1 }));
}

export function getSurahForReceiter(receiterId) {
  const reciter = quran.receiters.find(
    (receiter) => receiter.receiterId === receiterId
  );
  if (!reciter) throw new Error(`"${receiterId}" is not a valid reciter id`);

  const surahUrls = makeSuraUrls(reciter.server, reciter.receiterId);
  const surahNames = getIndexSurahNames();

  const surahInfos = [];

  surahUrls.forEach((surahUrl, idx) => {
    surahInfos.push({
      surahUrl,
      ...surahNames[idx],
    });
  });

  return surahInfos;
}
