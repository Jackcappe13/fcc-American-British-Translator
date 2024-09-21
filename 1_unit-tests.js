const chai = require("chai");
const assert = chai.assert;
const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  suite("Translate American to British:", () => {
    const cases = [
      {
        input: "Mangoes are my favorite fruit.",
        output:
          'Mangoes are my <span class="highlight">favourite</span> fruit.',
      },
      {
        input: "I ate yogurt for breakfast.",
        output: 'I ate <span class="highlight">yoghurt</span> for breakfast.',
      },
      {
        input: "We had a party at my friend's condo.",
        output:
          'We had a party at my friend\'s <span class="highlight">flat</span>.',
      },
      {
        input: "Can you toss this in the trashcan for me?",
        output:
          'Can you toss this in the <span class="highlight">bin</span> for me?',
      },
      {
        input: "The parking lot was full.",
        output: 'The <span class="highlight">car park</span> was full.',
      },
      {
        input: "Like a high tech Rube Goldberg machine.",
        output:
          'Like a high tech <span class="highlight">Heath Robinson device</span>.',
      },
      {
        input: "To play hooky means to skip class or work.",
        output:
          'To <span class="highlight">bunk off</span> means to skip class or work.',
      },
      {
        input: "No Mr. Bond, I expect you to die.",
        output:
          'No <span class="highlight">Mr</span> Bond, I expect you to die.',
      },
      {
        input: "Dr. Grosh will see you now.",
        output: '<span class="highlight">Dr</span> Grosh will see you now.',
      },
      {
        input: "Lunch is at 12:15 today.",
        output: 'Lunch is at <span class="highlight">12.15</span> today.',
      },
    ];

    cases.forEach(({ input, output }) => {
      test(input, (done) => {
        assert.equal(
          translator.translate(input, "american-to-british"),
          output
        );
        done();
      });
    });
  });

  suite("Translate British to American:", () => {
    const cases = [
      {
        input: "We watched the footie match for a while.",
        output:
          'We watched the <span class="highlight">soccer</span> match for a while.',
      },
      {
        input: "Paracetamol takes up to an hour to work.",
        output:
          '<span class="highlight">Tylenol</span> takes up to an hour to work.',
      },
      {
        input: "First, caramelise the onions.",
        output: 'First, <span class="highlight">caramelize</span> the onions.',
      },
      {
        input: "I spent the bank holiday at the funfair.",
        output:
          'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.',
      },
      {
        input: "I had a bicky then went to the chippy.",
        output:
          'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.',
      },
      {
        input: "I've just got bits and bobs in my bum bag.",
        output:
          'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.',
      },
      {
        input: "The car boot sale at Boxted Airfield was called off.",
        output:
          'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.',
      },
      {
        input: "Have you met Mrs Kalyani?",
        output: 'Have you met <span class="highlight">Mrs.</span> Kalyani?',
      },
      {
        input: "Prof Joyner of King's College, London.",
        output:
          '<span class="highlight">Prof.</span> Joyner of King\'s College, London.',
      },
      {
        input: "Tea time is usually around 4 or 4.30.",
        output:
          'Tea time is usually around 4 or <span class="highlight">4:30</span>.',
      },
    ];

    cases.forEach(({ input, output }) => {
      test(input, (done) => {
        assert.equal(
          translator.translate(input, "british-to-american"),
          output
        );
        done();
      });
    });
  });

  suite("Translation Highlights:", () => {
    const cases = [
      {
        input: "Mangoes are my favorite fruit.",
        locale: "british-to-american",
      },
      { input: "I ate yogurt for breakfast.", locale: "british-to-american" },
      {
        input: "We watched the footie match for a while.",
        locale: "american-to-british",
      },
      {
        input: "Paracetamol takes up to an hour to work.",
        locale: "american-to-british",
      },
    ];

    cases.forEach(({ input, locale }) => {
      test(input, (done) => {
        assert.equal(
          translator.translate(input, locale),
          "Everything looks good to me!"
        );
        done();
      });
    });
  });
});
