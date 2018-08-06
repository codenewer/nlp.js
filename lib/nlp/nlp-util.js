/*
 * Copyright (c) AXA Shared Services Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const Natural = require('natural');
const AggressiveTokenizerId = require('natural/lib/natural/tokenizers/aggressive_tokenizer_id');
const DanishStemmer = require('./stemmers/danish-stemmer');
const DutchStemmer = require('./stemmers/dutch-stemmer');
const EnglishStemmer = require('./stemmers/english-stemmer');
const FinnishStemmer = require('./stemmers/finnish-stemmer');
const FrenchStemmer = require('./stemmers/french-stemmer');
const GermanStemmer = require('./stemmers/german-stemmer');
const HungarianStemmer = require('./stemmers/hungarian-stemmer');
const ItalianStemmer = require('./stemmers/italian-stemmer');
const NorwegianStemmer = require('./stemmers/norwegian-stemmer');
const PortugueseStemmer = require('./stemmers/portuguese-stemmer');
const RomanianStemmer = require('./stemmers/romanian-stemmer');
const RussianStemmer = require('./stemmers/russian-stemmer');
const SpanishStemmer = require('./stemmers/spanish-stemmer');
const SwedishStemmer = require('./stemmers/swedish-stemmer');
const TurkishStemmer = require('./stemmers/turkish-stemmer');

class NlpUtil {
  /**
   * Given a locale, get the 2 character one.
   * @param {String} locale Locale of the language.
   * @returns {String} Locale in 2 character length.
   */
  static getTruncatedLocale(locale) {
    return locale ? locale.substr(0, 2).toLowerCase() : undefined;
  }

  static getStemmer(locale) {
    switch (locale) {
      case 'en': // English
        if (NlpUtil.useAlternative[locale]) {
          return new EnglishStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmer;
      case 'fa': // Farsi
        return Natural.PorterStemmerFa;
      case 'fr': // French
        if (NlpUtil.useAlternative[locale]) {
          return new FrenchStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerFr; // French
      case 'ru': // Russian
        if (NlpUtil.useAlternative[locale]) {
          return new RussianStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerRu;
      case 'es': // Spanish
        if (NlpUtil.useAlternative[locale]) {
          return new SpanishStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerEs;
      case 'it': // Italian
        if (NlpUtil.useAlternative[locale]) {
          return new ItalianStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerIt;
      case 'no': // Norwegian
        if (NlpUtil.useAlternative[locale]) {
          return new NorwegianStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerNo;
      case 'pt': // Portuguese
        if (NlpUtil.useAlternative[locale]) {
          return new PortugueseStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerPt;
      case 'sv': // Swedish
        if (NlpUtil.useAlternative[locale]) {
          return new SwedishStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerSv;
      case 'nl': // Dutch
        if (NlpUtil.useAlternative[locale]) {
          return new DutchStemmer(NlpUtil.getTokenizer(locale));
        }
        return Natural.PorterStemmerNl;
      case 'id': return Natural.PorterStemmerId; // Indonesian
      case 'ja': return new Natural.StemmerJa(); // Japanese
      case 'da': return new DanishStemmer(NlpUtil.getTokenizer(locale)); // Danish
      case 'fi': return new FinnishStemmer(NlpUtil.getTokenizer(locale)); // Finnish
      case 'de': return new GermanStemmer(NlpUtil.getTokenizer(locale)); // German
      case 'hu': return new HungarianStemmer(NlpUtil.getTokenizer(locale)); // Hungarian
      case 'ro': return new RomanianStemmer(NlpUtil.getTokenizer(locale)); // Romanian
      case 'tr': return new TurkishStemmer(NlpUtil.getTokenizer(locale)); // Turkish

      default: return Natural.PorterStemmer;
    }
  }

  static getTokenizer(locale) {
    switch (locale) {
      case 'en': return new Natural.AggressiveTokenizer(); // English
      case 'fa': return new Natural.AggressiveTokenizerFa(); // Farsi
      case 'fr': return new Natural.AggressiveTokenizerFr(); // French
      case 'ru': return new Natural.AggressiveTokenizerRu(); // Russian
      case 'es': return new Natural.AggressiveTokenizerEs(); // Spanish
      case 'it': return new Natural.AggressiveTokenizerIt(); // Italian
      case 'nl': return new Natural.AggressiveTokenizerNl(); // Dutch
      case 'no': return new Natural.AggressiveTokenizerNo(); // Norwegian
      case 'pt': return new Natural.AggressiveTokenizerPt(); // Portuguese
      case 'pl': return new Natural.AggressiveTokenizerPl(); // Polish
      case 'sv': return new Natural.AggressiveTokenizerSv(); // Swedish
      case 'id': return new AggressiveTokenizerId(); // Indonesian
      case 'ja': return new Natural.TokenizerJa(); // Japanese

      case 'da': return new Natural.TreebankWordTokenizer(); // Danish
      case 'fi': return new Natural.TreebankWordTokenizer(); // Finnish
      case 'de': return new Natural.TreebankWordTokenizer(); // German
      case 'hu': return new Natural.TreebankWordTokenizer(); // Hungarian
      case 'ro': return new Natural.TreebankWordTokenizer(); // Romanian
      case 'tr': return new Natural.TreebankWordTokenizer(); // Turkish
      default: return new Natural.TreebankWordTokenizer();
    }
  }
}

NlpUtil.useAlternative = {
  en: false,
  fa: false,
  fr: false,
  ru: false,
  es: false,
  it: false,
  nl: false,
  no: false,
  pt: false,
  pl: false,
  sv: false,
  id: false,
  ja: false,
  da: false,
  fi: false,
  de: false,
  hu: false,
  ro: false,
  tr: false,
};

module.exports = NlpUtil;