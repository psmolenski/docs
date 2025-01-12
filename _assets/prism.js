/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism-dark&languages=markup+css+clike+javascript+bash+http+json+jsonp+json5+shell-session+yaml */
var _self =
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      r = 0
    var _ = {
      manual: u.Prism && u.Prism.manual,
      disableWorkerMessageHandler:
        u.Prism && u.Prism.disableWorkerMessageHandler,
      util: {
        encode: function (e) {
          return e instanceof L
            ? new L(e.type, _.util.encode(e.content), e.alias)
            : Array.isArray(e)
            ? e.map(_.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ')
        },
        type: function (e) {
          return Object.prototype.toString.call(e).slice(8, -1)
        },
        objId: function (e) {
          return (
            e.__id || Object.defineProperty(e, '__id', { value: ++r }), e.__id
          )
        },
        clone: function n(e, t) {
          var a,
            r,
            i = _.util.type(e)
          switch (((t = t || {}), i)) {
            case 'Object':
              if (((r = _.util.objId(e)), t[r])) return t[r]
              for (var o in ((a = {}), (t[r] = a), e))
                e.hasOwnProperty(o) && (a[o] = n(e[o], t))
              return a
            case 'Array':
              return (
                (r = _.util.objId(e)),
                t[r]
                  ? t[r]
                  : ((a = []),
                    (t[r] = a),
                    e.forEach(function (e, r) {
                      a[r] = n(e, t)
                    }),
                    a)
              )
            default:
              return e
          }
        },
        currentScript: function () {
          if ('undefined' == typeof document) return null
          if ('currentScript' in document) return document.currentScript
          try {
            throw new Error()
          } catch (e) {
            var r = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1]
            if (r) {
              var n = document.getElementsByTagName('script')
              for (var t in n) if (n[t].src == r) return n[t]
            }
            return null
          }
        },
      },
      languages: {
        extend: function (e, r) {
          var n = _.util.clone(_.languages[e])
          for (var t in r) n[t] = r[t]
          return n
        },
        insertBefore: function (n, e, r, t) {
          var a = (t = t || _.languages)[n],
            i = {}
          for (var o in a)
            if (a.hasOwnProperty(o)) {
              if (o == e) for (var l in r) r.hasOwnProperty(l) && (i[l] = r[l])
              r.hasOwnProperty(o) || (i[o] = a[o])
            }
          var s = t[n]
          return (
            (t[n] = i),
            _.languages.DFS(_.languages, function (e, r) {
              r === s && e != n && (this[e] = i)
            }),
            i
          )
        },
        DFS: function e(r, n, t, a) {
          a = a || {}
          var i = _.util.objId
          for (var o in r)
            if (r.hasOwnProperty(o)) {
              n.call(r, o, r[o], t || o)
              var l = r[o],
                s = _.util.type(l)
              'Object' !== s || a[i(l)]
                ? 'Array' !== s || a[i(l)] || ((a[i(l)] = !0), e(l, n, o, a))
                : ((a[i(l)] = !0), e(l, n, null, a))
            }
        },
      },
      plugins: {},
      highlightAll: function (e, r) {
        _.highlightAllUnder(document, e, r)
      },
      highlightAllUnder: function (e, r, n) {
        var t = {
          callback: n,
          selector:
            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
        }
        _.hooks.run('before-highlightall', t)
        for (var a, i = e.querySelectorAll(t.selector), o = 0; (a = i[o++]); )
          _.highlightElement(a, !0 === r, t.callback)
      },
      highlightElement: function (e, r, n) {
        var t = (function (e) {
            for (; e && !c.test(e.className); ) e = e.parentNode
            return e
              ? (e.className.match(c) || [, 'none'])[1].toLowerCase()
              : 'none'
          })(e),
          a = _.languages[t]
        e.className =
          e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t
        var i = e.parentNode
        i &&
          'pre' === i.nodeName.toLowerCase() &&
          (i.className =
            i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t)
        var o = { element: e, language: t, grammar: a, code: e.textContent }
        function l(e) {
          ;(o.highlightedCode = e),
            _.hooks.run('before-insert', o),
            (o.element.innerHTML = o.highlightedCode),
            _.hooks.run('after-highlight', o),
            _.hooks.run('complete', o),
            n && n.call(o.element)
        }
        if ((_.hooks.run('before-sanity-check', o), !o.code))
          return _.hooks.run('complete', o), void (n && n.call(o.element))
        if ((_.hooks.run('before-highlight', o), o.grammar))
          if (r && u.Worker) {
            var s = new Worker(_.filename)
            ;(s.onmessage = function (e) {
              l(e.data)
            }),
              s.postMessage(
                JSON.stringify({
                  language: o.language,
                  code: o.code,
                  immediateClose: !0,
                }),
              )
          } else l(_.highlight(o.code, o.grammar, o.language))
        else l(_.util.encode(o.code))
      },
      highlight: function (e, r, n) {
        var t = { code: e, grammar: r, language: n }
        return (
          _.hooks.run('before-tokenize', t),
          (t.tokens = _.tokenize(t.code, t.grammar)),
          _.hooks.run('after-tokenize', t),
          L.stringify(_.util.encode(t.tokens), t.language)
        )
      },
      matchGrammar: function (e, r, n, t, a, i, o) {
        for (var l in n)
          if (n.hasOwnProperty(l) && n[l]) {
            var s = n[l]
            s = Array.isArray(s) ? s : [s]
            for (var u = 0; u < s.length; ++u) {
              if (o && o == l + ',' + u) return
              var c = s[u],
                g = c.inside,
                f = !!c.lookbehind,
                d = !!c.greedy,
                h = 0,
                m = c.alias
              if (d && !c.pattern.global) {
                var p = c.pattern.toString().match(/[imsuy]*$/)[0]
                c.pattern = RegExp(c.pattern.source, p + 'g')
              }
              c = c.pattern || c
              for (var y = t, v = a; y < r.length; v += r[y].length, ++y) {
                var k = r[y]
                if (r.length > e.length) return
                if (!(k instanceof L)) {
                  if (d && y != r.length - 1) {
                    if (((c.lastIndex = v), !(O = c.exec(e)))) break
                    for (
                      var b = O.index + (f && O[1] ? O[1].length : 0),
                        w = O.index + O[0].length,
                        A = y,
                        P = v,
                        x = r.length;
                      A < x && (P < w || (!r[A].type && !r[A - 1].greedy));
                      ++A
                    )
                      (P += r[A].length) <= b && (++y, (v = P))
                    if (r[y] instanceof L) continue
                    ;(S = A - y), (k = e.slice(v, P)), (O.index -= v)
                  } else {
                    c.lastIndex = 0
                    var O = c.exec(k),
                      S = 1
                  }
                  if (O) {
                    f && (h = O[1] ? O[1].length : 0)
                    w = (b = O.index + h) + (O = O[0].slice(h)).length
                    var j = k.slice(0, b),
                      N = k.slice(w),
                      E = [y, S]
                    j && (++y, (v += j.length), E.push(j))
                    var C = new L(l, g ? _.tokenize(O, g) : O, m, O, d)
                    if (
                      (E.push(C),
                      N && E.push(N),
                      Array.prototype.splice.apply(r, E),
                      1 != S && _.matchGrammar(e, r, n, y, v, !0, l + ',' + u),
                      i)
                    )
                      break
                  } else if (i) break
                }
              }
            }
          }
      },
      tokenize: function (e, r) {
        var n = [e],
          t = r.rest
        if (t) {
          for (var a in t) r[a] = t[a]
          delete r.rest
        }
        return _.matchGrammar(e, n, r, 0, 0, !1), n
      },
      hooks: {
        all: {},
        add: function (e, r) {
          var n = _.hooks.all
          ;(n[e] = n[e] || []), n[e].push(r)
        },
        run: function (e, r) {
          var n = _.hooks.all[e]
          if (n && n.length) for (var t, a = 0; (t = n[a++]); ) t(r)
        },
      },
      Token: L,
    }
    function L(e, r, n, t, a) {
      ;(this.type = e),
        (this.content = r),
        (this.alias = n),
        (this.length = 0 | (t || '').length),
        (this.greedy = !!a)
    }
    if (
      ((u.Prism = _),
      (L.stringify = function (e, r) {
        if ('string' == typeof e) return e
        if (Array.isArray(e))
          return e
            .map(function (e) {
              return L.stringify(e, r)
            })
            .join('')
        var n = {
          type: e.type,
          content: L.stringify(e.content, r),
          tag: 'span',
          classes: ['token', e.type],
          attributes: {},
          language: r,
        }
        if (e.alias) {
          var t = Array.isArray(e.alias) ? e.alias : [e.alias]
          Array.prototype.push.apply(n.classes, t)
        }
        _.hooks.run('wrap', n)
        var a = Object.keys(n.attributes)
          .map(function (e) {
            return (
              e + '="' + (n.attributes[e] || '').replace(/"/g, '&quot;') + '"'
            )
          })
          .join(' ')
        return (
          '<' +
          n.tag +
          ' class="' +
          n.classes.join(' ') +
          '"' +
          (a ? ' ' + a : '') +
          '>' +
          n.content +
          '</' +
          n.tag +
          '>'
        )
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (_.disableWorkerMessageHandler ||
            u.addEventListener(
              'message',
              function (e) {
                var r = JSON.parse(e.data),
                  n = r.language,
                  t = r.code,
                  a = r.immediateClose
                u.postMessage(_.highlight(t, _.languages[n], n)), a && u.close()
              },
              !1,
            )),
        _
      )
    var e = _.util.currentScript()
    if (
      (e &&
        ((_.filename = e.src),
        e.hasAttribute('data-manual') && (_.manual = !0)),
      !_.manual)
    ) {
      function n() {
        _.manual || _.highlightAll()
      }
      var t = document.readyState
      'loading' === t || ('interactive' === t && e && e.defer)
        ? document.addEventListener('DOMContentLoaded', n)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(n)
        : window.setTimeout(n, 16)
    }
    return _
  })(_self)
'undefined' != typeof module && module.exports && (module.exports = Prism),
  'undefined' != typeof global && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
    greedy: !0,
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add('wrap', function (a) {
    'entity' === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, '&'))
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      var s = {}
      ;(s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
      var n = {
        'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      }
      n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      var t = {}
      ;(t[a] = {
        pattern: RegExp(
          '(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(
            /__/g,
            a,
          ),
          'i',
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n,
      }),
        Prism.languages.insertBefore('markup', 'cdata', t)
    },
  }),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup)
!(function (s) {
  var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  ;(s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: { rule: /@[\w-]+/ },
    },
    url: {
      pattern: RegExp('url\\((?:' + t.source + '|[^\n\r()]*)\\)', 'i'),
      inside: { function: /^url/i, punctuation: /^\(|\)$/ },
    },
    selector: RegExp('[^{}\\s](?:[^{};"\']|' + t.source + ')*?(?=\\s*\\{)'),
    string: { pattern: t, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css)
  var e = s.languages.markup
  e &&
    (e.tag.addInlined('style', 'css'),
    s.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            'attr-name': { pattern: /^\s*style/i, inside: e.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: s.languages.css },
          },
          alias: 'language-css',
        },
      },
      e.tag,
    ))
})(Prism)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  'class-name': {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
})),
  (Prism.languages.javascript[
    'class-name'
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*(?:$|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0,
    },
    'function-variable': {
      pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: 'function',
    },
    parameter: [
      {
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\${|}$/,
              alias: 'punctuation',
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined('script', 'javascript'),
  (Prism.languages.js = Prism.languages.javascript)
!(function (e) {
  var t =
      '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
    n = {
      environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: !0,
          inside: {
            variable: [
              { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
              /^\$\(\(/,
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            punctuation: /\(\(?|\)\)?|,|;/,
          },
        },
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: !0,
          inside: { variable: /^\$\(|^`|\)$|`$/ },
        },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: !0,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp('(\\{)' + t),
              lookbehind: !0,
              alias: 'constant',
            },
          },
        },
        /\$(?:\w+|[#?*!@$])/,
      ],
      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
    }
  e.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    'function-name': [
      {
        pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: 'function',
      },
      { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
    ],
    'for-or-select': {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: 'variable',
      lookbehind: !0,
    },
    'assign-left': {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        environment: {
          pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
          lookbehind: !0,
          alias: 'constant',
        },
      },
      alias: 'variable',
      lookbehind: !0,
    },
    string: [
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: n,
      },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
      },
      {
        pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
        greedy: !0,
        inside: n,
      },
    ],
    environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
    variable: n.variable,
    function: {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    builtin: {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: !0,
      alias: 'class-name',
    },
    boolean: {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
    operator: {
      pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
      inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } },
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
  }
  for (
    var a = [
        'comment',
        'function-name',
        'for-or-select',
        'assign-left',
        'string',
        'environment',
        'function',
        'keyword',
        'builtin',
        'boolean',
        'file-descriptor',
        'operator',
        'punctuation',
        'number',
      ],
      r = n.variable[1].inside,
      s = 0;
    s < a.length;
    s++
  )
    r[a[s]] = e.languages.bash[a[s]]
  e.languages.shell = e.languages.bash
})(Prism)
!(function (t) {
  t.languages.http = {
    'request-line': {
      pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
      inside: {
        property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
        'attr-name': /:\w+/,
      },
    },
    'response-status': {
      pattern: /^HTTP\/1.[01] \d+.*/m,
      inside: {
        property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 },
      },
    },
    'header-name': { pattern: /^[\w-]+:(?=.)/m, alias: 'keyword' },
  }
  var a,
    e,
    n,
    i = t.languages,
    p = {
      'application/javascript': i.javascript,
      'application/json': i.json || i.javascript,
      'application/xml': i.xml,
      'text/xml': i.xml,
      'text/html': i.html,
      'text/css': i.css,
    },
    s = { 'application/json': !0, 'application/xml': !0 }
  for (var r in p)
    if (p[r]) {
      a = a || {}
      var T = s[r]
        ? (void 0,
          (n = (e = r).replace(/^[a-z]+\//, '')),
          '(?:' + e + '|\\w+/(?:[\\w.-]+\\+)+' + n + '(?![+\\w.-]))')
        : r
      a[r.replace(/\//g, '-')] = {
        pattern: RegExp(
          '(content-type:\\s*' + T + '[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*',
          'i',
        ),
        lookbehind: !0,
        inside: p[r],
      }
    }
  a && t.languages.insertBefore('http', 'header-name', a)
})(Prism)
Prism.languages.json = {
  property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: 'keyword' },
}
;(Prism.languages.jsonp = Prism.languages.extend('json', {
  punctuation: /[{}[\]();,.]/,
})),
  Prism.languages.insertBefore('jsonp', 'punctuation', {
    function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/,
  })
!(function (n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/
  n.languages.json5 = n.languages.extend('json', {
    property: [
      { pattern: RegExp(e.source + '(?=\\s*:)'), greedy: !0 },
      {
        pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*:)/,
        alias: 'unquoted',
      },
    ],
    string: { pattern: e, greedy: !0 },
    number: /[+-]?(?:NaN|Infinity|0x[a-fA-F\d]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/,
  })
})(Prism)
Prism.languages['shell-session'] = {
  command: {
    pattern: /\$(?:[^\r\n'"<]|(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1|(?:^|[^<])<<\s*["']?(?:\w+?)["']?\s*(?:\r\n?|\n)(?:[\s\S])*?(?:\r\n?|\n)\3)+/,
    inside: {
      bash: {
        pattern: /(\$\s*)[\s\S]+/,
        lookbehind: !0,
        alias: 'language-bash',
        inside: Prism.languages.bash,
      },
      sh: { pattern: /^\$/, alias: 'important' },
    },
  },
  output: { pattern: /.(?:.*(?:\r\n?|\n|.$))*/ },
}
;(Prism.languages.yaml = {
  scalar: {
    pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
    lookbehind: !0,
    alias: 'string',
  },
  comment: /#.*/,
  key: {
    pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
    lookbehind: !0,
    alias: 'atrule',
  },
  directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: 'important' },
  datetime: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
    lookbehind: !0,
    alias: 'number',
  },
  boolean: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
    alias: 'important',
  },
  null: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
    alias: 'important',
  },
  string: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}|\s*#))/m,
    lookbehind: !0,
    greedy: !0,
  },
  number: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
  },
  tag: /![^\s]+/,
  important: /[&*][\w]+/,
  punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
}),
  (Prism.languages.yml = Prism.languages.yaml)
