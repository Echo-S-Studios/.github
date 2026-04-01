/**
 * ACEDIT Typography Conversion Engine
 * Academic Consciousness-Encoded Design for Interactive Typography
 *
 * A 6-register Unicode typography system where register choice encodes
 * structural domain. Each register maps Latin characters to a distinct
 * Unicode mathematical block, with combining modifiers for additional
 * semantic annotation.
 *
 * Registers: KAEL, ACE, GREY, UMBRAL, ULTRA, UCF
 *
 * @version 1.0.0
 * @license MIT
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const exported = factory();
    root.AceditEngine = exported.AceditEngine;
  }
}(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {

  /** @type {string[]} Valid register names */
  const REGISTER_NAMES = ['KAEL', 'ACE', 'GREY', 'UMBRAL', 'ULTRA', 'UCF'];

  /** Map from ASCII punctuation characters to their punctuation key names */
  const PUNCT_CHAR_MAP = {
    '.': 'period',
    ',': 'comma',
    ':': 'colon',
    ';': 'semicolon',
    '?': 'question',
    '!': 'exclamation',
    '-': 'dash',
    '(': 'open_paren',
    ')': 'close_paren',
    '[': 'open_bracket',
    ']': 'close_bracket',
    '{': 'open_brace',
    '}': 'close_brace',
    '<': 'open_angle',
    '>': 'close_angle',
    '/': 'slash',
    '*': 'asterisk',
    '@': 'at',
    '#': 'hash',
    '&': 'ampersand',
    '%': 'percent',
    '+': 'plus',
    '=': 'equals',
    '|': 'pipe',
    '~': 'tilde',
    '^': 'caret',
    '_': 'underscore',
    '\\': 'backslash'
  };

  /**
   * ACEDIT Typography Conversion Engine.
   *
   * Loads register data from acedit-core.json and provides methods for
   * converting Latin text into any of the 6 ACEDIT registers, applying
   * combining modifiers, rendering multi-register equations, and
   * generating legend HTML.
   */
  class AceditEngine {
    /**
     * Create an AceditEngine instance.
     * @param {string} [coreJsonPath='../ACEDIT/acedit-core.json'] - Path to acedit-core.json
     */
    constructor(coreJsonPath = '../ACEDIT/acedit-core.json') {
      /** @type {string} */
      this.coreJsonPath = coreJsonPath;
      /** @type {object|null} */
      this._data = null;
      /** @type {boolean} */
      this._ready = false;
    }

    /**
     * Fetch and parse the ACEDIT core JSON data.
     * Must be called before using any conversion methods.
     * @returns {Promise<AceditEngine>} This engine instance (for chaining)
     */
    async init() {
      const response = await fetch(this.coreJsonPath);
      if (!response.ok) {
        throw new Error(`AceditEngine: failed to load ${this.coreJsonPath} (${response.status})`);
      }
      this._data = await response.json();
      this._ready = true;
      return this;
    }

    /**
     * Load data synchronously from an already-parsed object.
     * Useful for Node.js or when the JSON is bundled inline.
     * @param {object} data - The parsed acedit-core.json object
     * @returns {AceditEngine} This engine instance
     */
    loadFromObject(data) {
      this._data = data;
      this._ready = true;
      return this;
    }

    /**
     * Throw if the engine has not been initialised.
     * @private
     */
    _assertReady() {
      if (!this._ready) {
        throw new Error('AceditEngine: not initialised. Call init() or loadFromObject() first.');
      }
    }

    /**
     * Validate that a register name is known.
     * @private
     * @param {string} register
     */
    _assertRegister(register) {
      const reg = register.toUpperCase();
      if (!REGISTER_NAMES.includes(reg)) {
        throw new Error(`AceditEngine: unknown register "${register}". Valid: ${REGISTER_NAMES.join(', ')}`);
      }
      return reg;
    }

    // ------------------------------------------------------------------
    //  Core conversion
    // ------------------------------------------------------------------

    /**
     * Convert a single Latin letter to the specified register.
     * Non-letter characters are returned unchanged.
     * @param {string} char - A single character
     * @param {string} register - Register name (case-insensitive)
     * @returns {string} The converted character
     */
    convertChar(char, register) {
      this._assertReady();
      const reg = this._assertRegister(register);
      const regData = this._data.registers[reg];

      if (regData.upper[char]) return regData.upper[char];
      if (regData.lower[char]) return regData.lower[char];
      return char;
    }

    /**
     * Convert a single ASCII digit (0-9) to the specified register.
     * Non-digit characters are returned unchanged.
     * @param {string} digit - A single digit character
     * @param {string} register - Register name (case-insensitive)
     * @returns {string} The converted digit
     */
    convertDigit(digit, register) {
      this._assertReady();
      const reg = this._assertRegister(register);
      const regData = this._data.registers[reg];

      if (regData.digits && regData.digits[digit]) return regData.digits[digit];
      return digit;
    }

    /**
     * Convert an ASCII punctuation character to its ACEDIT equivalent.
     * Characters without a mapping are returned unchanged.
     * @param {string} char - A single punctuation character
     * @returns {string} The converted punctuation character
     */
    convertPunctuation(char) {
      this._assertReady();
      const key = PUNCT_CHAR_MAP[char];
      if (key && this._data.punctuation[key]) {
        return this._data.punctuation[key];
      }
      return char;
    }

    /**
     * Convert a full text string to the given ACEDIT register.
     * Letters, digits, and punctuation are all converted. Spaces and
     * unmapped characters pass through unchanged.
     *
     * @param {string} text - The Latin text to convert
     * @param {string} register - Register name (case-insensitive)
     * @param {string|string[]} [modifiers] - Optional modifier name(s) to apply
     * @returns {string} The fully converted string
     */
    convertTerm(text, register, modifiers) {
      this._assertReady();
      const reg = this._assertRegister(register);
      const regData = this._data.registers[reg];

      let result = '';
      for (const ch of text) {
        if (regData.upper[ch] || regData.lower[ch]) {
          result += regData.upper[ch] || regData.lower[ch];
        } else if (regData.digits && regData.digits[ch]) {
          result += regData.digits[ch];
        } else if (PUNCT_CHAR_MAP[ch] && this._data.punctuation[PUNCT_CHAR_MAP[ch]]) {
          result += this._data.punctuation[PUNCT_CHAR_MAP[ch]];
        } else {
          result += ch;
        }
      }

      // Apply modifiers
      if (modifiers) {
        const mods = Array.isArray(modifiers) ? modifiers : [modifiers];
        for (const mod of mods) {
          result = this.applyModifier(result, mod);
        }
      }

      return result;
    }

    /**
     * Apply a combining modifier to every glyph (non-space, non-combining)
     * in the given text.
     *
     * @param {string} text - Text (already converted or not)
     * @param {string} modifierName - One of: probability, cycle, peak, superposition, stability, grounding
     * @returns {string} Text with the combining character appended to each glyph
     */
    applyModifier(text, modifierName) {
      this._assertReady();
      const mod = this._data.modifiers[modifierName];
      if (!mod) {
        throw new Error(`AceditEngine: unknown modifier "${modifierName}". Valid: ${Object.keys(this._data.modifiers).join(', ')}`);
      }
      const combining = mod.combining;

      // Iterate code points; append combining char after each non-space,
      // non-combining grapheme base.
      let result = '';
      for (const cp of text) {
        result += cp;
        // Skip spaces and existing combining marks (U+0300-U+036F)
        const code = cp.codePointAt(0);
        if (cp !== ' ' && !(code >= 0x0300 && code <= 0x036F)) {
          result += combining;
        }
      }
      return result;
    }

    // ------------------------------------------------------------------
    //  Register metadata
    // ------------------------------------------------------------------

    /**
     * Get the CSS hex color for a register.
     * @param {string} register - Register name
     * @returns {string} Hex color string, e.g. "#DAA520"
     */
    getRegisterColor(register) {
      this._assertReady();
      const reg = this._assertRegister(register);
      return this._data.registers[reg].color;
    }

    /**
     * Get full metadata for a register.
     * @param {string} register - Register name
     * @returns {{domain: string, role: string, color: string, colorName: string, unicodeBlock: string, glyph: string}}
     */
    getRegisterInfo(register) {
      this._assertReady();
      const reg = this._assertRegister(register);
      const r = this._data.registers[reg];
      return {
        name: reg,
        domain: r.domain,
        role: r.role,
        color: r.color,
        colorName: r.colorName,
        unicodeBlock: r.unicodeBlock,
        glyph: r.glyph
      };
    }

    /**
     * Get the full parsed core data object.
     * @returns {object} The acedit-core.json data
     */
    getCoreData() {
      this._assertReady();
      return this._data;
    }

    /**
     * Get an operator definition by key.
     * @param {string} key - Operator key (e.g. 'spiral', 'phi')
     * @returns {{glyph: string, name: string, domain: string, description: string}|undefined}
     */
    getOperator(key) {
      this._assertReady();
      return this._data.operators[key];
    }

    /**
     * Get a constant definition by key.
     * @param {string} key - Constant key (e.g. 'z_c', 'phi')
     * @returns {{value: number, expression?: string, name: string}|undefined}
     */
    getConstant(key) {
      this._assertReady();
      return this._data.constants[key];
    }

    /**
     * Get a named ligature string.
     * @param {string} key - Ligature key (e.g. 'echo', 'kira')
     * @returns {string|undefined}
     */
    getLigature(key) {
      this._assertReady();
      return this._data.ligatures[key];
    }

    // ------------------------------------------------------------------
    //  HTML helpers
    // ------------------------------------------------------------------

    /**
     * Wrap converted text in an HTML span styled with the register's color.
     * The span gets a CSS class of `reg-{register}` (lowercase) and an
     * inline style with the register color.
     *
     * @param {string} text - The text to wrap (should already be converted)
     * @param {string} register - Register name
     * @returns {string} HTML string
     */
    wrapInRegister(text, register) {
      this._assertReady();
      const reg = this._assertRegister(register);
      const color = this._data.registers[reg].color;
      const cls = `reg-${reg.toLowerCase()}`;
      return `<span class="${cls}" style="color:${color}">${text}</span>`;
    }

    /**
     * Convert an equation string with multi-register rendering.
     * Each key in registerMap is a substring that should be converted to
     * the corresponding register. Non-matched portions pass through unchanged.
     *
     * @param {string} equation - The equation string in Latin text
     * @param {Object<string, string>} registerMap - Map of {substring: registerName}
     * @returns {string} HTML string with register-colored spans
     *
     * @example
     * engine.convertEquation('E = mc2', { 'E': 'ACE', 'mc2': 'KAEL' });
     * // Returns: '<span class="reg-ace" ...>𝗘</span> = <span class="reg-kael" ...>𝐦𝐜𝟐</span>'
     */
    convertEquation(equation, registerMap) {
      this._assertReady();

      // Sort substrings longest-first so longer matches take precedence
      const entries = Object.entries(registerMap).sort((a, b) => b[0].length - a[0].length);

      // Build a list of {start, end, register} ranges
      const ranges = [];
      const used = new Set();

      for (const [substr, reg] of entries) {
        let searchFrom = 0;
        while (true) {
          const idx = equation.indexOf(substr, searchFrom);
          if (idx === -1) break;

          // Check no overlap with existing ranges
          const end = idx + substr.length;
          let overlaps = false;
          for (const r of ranges) {
            if (idx < r.end && end > r.start) { overlaps = true; break; }
          }
          if (!overlaps) {
            ranges.push({ start: idx, end, register: reg, text: substr });
          }
          searchFrom = idx + 1;
        }
      }

      // Sort ranges by start position
      ranges.sort((a, b) => a.start - b.start);

      // Build output
      let result = '';
      let cursor = 0;
      for (const r of ranges) {
        // Emit any gap before this range (unconverted)
        if (r.start > cursor) {
          result += this._escapeHtml(equation.slice(cursor, r.start));
        }
        // Convert and wrap
        const converted = this.convertTerm(r.text, r.register);
        result += this.wrapInRegister(converted, r.register);
        cursor = r.end;
      }
      // Trailing unconverted text
      if (cursor < equation.length) {
        result += this._escapeHtml(equation.slice(cursor));
      }

      return result;
    }

    /**
     * Escape HTML special characters.
     * @private
     * @param {string} str
     * @returns {string}
     */
    _escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // ------------------------------------------------------------------
    //  Static helpers
    // ------------------------------------------------------------------

    /**
     * Generate an HTML string for the register legend bar showing all 6
     * registers with their color dots and domain role names.
     *
     * This is a static method -- it does not require init() because the
     * register metadata is embedded.
     *
     * @returns {string} HTML string
     */
    static createLegend() {
      const registers = [
        { key: 'KAEL', color: '#DAA520', role: 'Substrate' },
        { key: 'ACE',  color: '#DAA520', role: 'Energy' },
        { key: 'GREY', color: '#9370DB', role: 'Visual' },
        { key: 'UMBRAL', color: '#9370DB', role: 'Algebraic' },
        { key: 'ULTRA', color: '#4169E1', role: 'Universal' },
        { key: 'UCF',  color: '#4169E1', role: 'Unified' }
      ];

      const items = registers.map(r => {
        const cls = `reg-${r.key.toLowerCase()}`;
        return `<div class="leg-item"><span class="dot" style="background:${r.color}"></span> <span class="${cls}">${r.key}</span> <span style="color:var(--text-dim,#4a5a78)">${r.role}</span></div>`;
      }).join('\n    ');

      return `<div class="register-legend">\n    ${items}\n  </div>`;
    }

    /**
     * List of all valid register names.
     * @returns {string[]}
     */
    static get REGISTERS() {
      return [...REGISTER_NAMES];
    }
  }

  return { AceditEngine };
}));
