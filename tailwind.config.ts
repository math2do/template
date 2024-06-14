import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        // sans: ['var(--font-geist-sans)'], Not working
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      // only the nested rules are added here, common properties are added in mdx-wrapper
      // for reference: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
      // visit this for checking the attributes added by pretty-rehype-code: https://rehype-pretty.pages.dev/
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: [
            {
              // // override above style of 'a' in headings
              // 'h1 > a,h2 > a,h3 > a,h4 > a,h5 > a,h6 > a': {
              //   color: 'hsl(var(--foreground))',
              //   '&:hover': {
              //     textDecoration: 'none',
              //   },
              //   '&::after': {
              //     // color: 'hsl(var(--muted-foreground))',
              //     // content: '"  #"',
              //   },
              // },
              code: {
                paddingLeft: '0.3rem',
                paddingRight: '0.3rem',
                paddingTop: '0.2rem',
                paddingBottom: '0.2rem',
                backgroundColor: 'hsl(var(--muted))',
                '--shiki-light-bg': 'hsl(var(--muted))',
              },
              'pre code': {
                border: 'none',
                padding: '0.5rem 0rem 0.5rem 0rem',
                '--shiki-light-bg': 'hsl(var(--background))',
                // backgroundColor: 'hsl(var(--background))',
              },
              'pre [data-highlighted-chars]': {
                // backgroundColor: 'hsl(var(--background))',
                backgroundColor: 'transparent',
                textDecoration: 'underline',
                textDecorationColor: 'hsl(var(--muted-foreground))',
                textUnderlineOffset: '4px',
                paddingTop: '0.1rem',
                paddingBottom: '0.1rem',
                borderRadius: '0.25rem',
              },
              'pre [data-line]': {
                paddingLeft: '1rem',
                paddingRight: '1rem',
                borderLeftWidth: '2.5px',
                borderLeftColor: 'hsl(var(--background))',
              },
              'pre code .line_number': {
                display: 'inline-block',
                width: '1rem',
                marginRight: '1rem',
                textAlign: 'right',
                '--shiki-light': colors.gray[400],
                '--shiki-dark': colors.gray[400],
                userSelect: 'none',
              },
              'pre [data-highlighted-line]': {
                borderLeftWidth: '3px',
                borderLeftColor: colors.blue[400],
                '--shiki-light-bg': 'hsl(var(--muted))',
                '--shiki-dark-bg': 'hsl(var(--muted))',
              },
              // style git diff, should be below [data-highlighted-line] to override
              // TODO: merge the style with .diff.remove
              'pre code .diff.add': {
                borderLeftWidth: '3px',
                borderLeftColor: colors.green[400],
                '--shiki-light-bg': '#2dd4bf26',
                '--shiki-dark-bg': '#2dd4bf26',
                position: 'relative',
              },
              'pre code .diff.add span, pre code .diff.remove span': {
                '--shiki-light-bg': 'transparent',
                '--shiki-dark-bg': 'transparent',
              },

              'pre code .diff.add > span:first-child::before': {
                color: colors.green[600],
                display: 'inline-block',
                position: 'absolute',
                top: '0',
                left: '2.2rem',
                content: '"+"',
              },
              'pre code .diff.remove': {
                borderLeftWidth: '3px',
                borderLeftColor: colors.rose[400],
                '--shiki-light-bg': '#f43f5e26',
                '--shiki-dark-bg': '#f43f5e26',
                position: 'relative',
                userSelect: 'none',
              },

              'pre code .diff.remove > span:first-child::before': {
                color: colors.red[600],
                display: 'inline-block',
                position: 'absolute',
                top: '0',
                left: '2.2rem',
                content: '"-"',
              },

              '[data-rehype-pretty-code-title]': {
                borderWidth: '1px 1px 0px 1px',
                borderRadius: '0.25rem 0.25rem 0 0',
                fontSize: '0.875rem',
                color: 'hsl(var(--muted-foreground))',
                padding: '0.5rem 1rem 0.5rem 1rem',
                backgroundColor: 'hsl(var(--muted))',
                '&::before': {
                  fontSize: '1rem',
                  content: '"📁 "',
                },
              },
              pre: {
                borderRadius: '0.25rem',
                borderWidth: '1px',
              },
              // left-top and right-top of pre is zero, when title is given
              '[data-rehype-pretty-code-title] + pre': {
                borderRadius: '0 0 0.25rem 0.25rem',
              },
              '.katex-html': {
                display: 'none',
              },
              '.katex-mathml': {
                fontSize: '1.2rem',
              },
              'msqrt > mrow:first-child': {
                padding: '0.2rem',
              },
              '[mathvariant="normal"]': {
                display: 'none',
              },
              // support for dual theme
              // 'code[data-theme*=" "], code[data-theme*=" "] span': {
              //   color: 'var(--shiki-light)',
              //   backgroundColor: 'var(--shiki-light-bg)',
              // },
            },
          ],
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
