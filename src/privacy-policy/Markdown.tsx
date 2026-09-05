import { Linking, Text, View } from 'react-native';
import { marked, type Token, type Tokens } from 'marked';
import type { ThemeName } from './useTheme';

const PALETTE = {
  light: { text: '#2E2418', muted: '#5B4C39', link: '#0A5FCC' },
  dark: { text: '#EFE6D6', muted: '#B9AC96', link: '#7AB4FF' },
};

function InlineTokens({ tokens, theme }: { tokens: Tokens.Generic[]; theme: ThemeName }) {
  const colors = PALETTE[theme];
  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case 'strong':
            return (
              <Text key={index} style={{ fontWeight: '700' }}>
                <InlineTokens tokens={token.tokens ?? []} theme={theme} />
              </Text>
            );
          case 'em':
            return (
              <Text key={index} style={{ fontStyle: 'italic' }}>
                <InlineTokens tokens={token.tokens ?? []} theme={theme} />
              </Text>
            );
          case 'codespan':
            return (
              <Text key={index} style={{ fontFamily: 'monospace' }}>
                {(token as Tokens.Codespan).text}
              </Text>
            );
          case 'link': {
            const link = token as Tokens.Link;
            return (
              <Text
                key={index}
                style={{ color: colors.link, textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL(link.href)}
              >
                <InlineTokens tokens={link.tokens ?? []} theme={theme} />
              </Text>
            );
          }
          case 'br':
            return '\n';
          default: {
            // Non-loose list items wrap their inline content in a plain 'text' token
            // that itself carries nested tokens — recurse into those when present.
            const generic = token as Tokens.Text;
            if (generic.tokens) {
              return <InlineTokens key={index} tokens={generic.tokens} theme={theme} />;
            }
            return <Text key={index}>{generic.raw}</Text>;
          }
        }
      })}
    </>
  );
}

function Block({ token, theme }: { token: Token; theme: ThemeName }) {
  const colors = PALETTE[theme];

  switch (token.type) {
    case 'heading': {
      const heading = token as Tokens.Heading;
      const sizes: Record<number, number> = { 1: 28, 2: 22, 3: 18, 4: 16, 5: 15, 6: 14 };
      return (
        <Text
          style={{
            color: colors.text,
            fontSize: sizes[heading.depth] ?? 14,
            fontWeight: '700',
            marginTop: heading.depth === 1 ? 0 : 20,
            marginBottom: 8,
          }}
        >
          <InlineTokens tokens={heading.tokens} theme={theme} />
        </Text>
      );
    }
    case 'paragraph': {
      const paragraph = token as Tokens.Paragraph;
      return (
        <Text style={{ color: colors.text, fontSize: 15, lineHeight: 22, marginBottom: 12 }}>
          <InlineTokens tokens={paragraph.tokens} theme={theme} />
        </Text>
      );
    }
    case 'list': {
      const list = token as Tokens.List;
      return (
        <View style={{ marginBottom: 12 }}>
          {list.items.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 4 }}>
              <Text style={{ color: colors.muted, fontSize: 15, width: 20 }}>
                {list.ordered ? `${Number(list.start) + index}.` : '•'}
              </Text>
              <Text style={{ color: colors.text, fontSize: 15, lineHeight: 22, flex: 1 }}>
                <InlineTokens tokens={item.tokens} theme={theme} />
              </Text>
            </View>
          ))}
        </View>
      );
    }
    case 'hr':
      return (
        <View
          style={{ height: 1, backgroundColor: colors.muted, opacity: 0.3, marginVertical: 16 }}
        />
      );
    case 'space':
      return null;
    default:
      return null;
  }
}

export function Markdown({ source, theme }: { source: string; theme: ThemeName }) {
  const tokens = marked.lexer(source);
  return (
    <>
      {tokens.map((token, index) => (
        <Block key={index} token={token} theme={theme} />
      ))}
    </>
  );
}
