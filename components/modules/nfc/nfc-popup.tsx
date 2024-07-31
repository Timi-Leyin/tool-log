import { createStyleSheet, useStyles } from 'react-native-unistyles';

import NoNFC from '~/assets/icons/no-nfc.svg';
import NFCScan from '~/assets/icons/read-tag.svg';
import { Button, Text, View } from '~/components/shared';
import { useNfc } from '~/hooks/useNfc';
import { useNfcStore } from '~/store/nfc.store';

const NfcPopup = ({ mode, onClose, onAction }: PopupProps) => {
  const { nfcAvailable } = useNfc();
  const nfcStoreState = useNfcStore((state) => state.state);
  const { styles } = useStyles(_styles);

  const popUpTitle = mode === 'read' ? 'Ready to Read' : 'Ready to Write';
  const actionCopy = mode === 'read' ? 'Read Tag' : 'Save Tool';

  return (
    <View style={{ flex: 1 }}>
      {/* content when available */}
      {!nfcAvailable && (
        <View style={styles.availableContainer}>
          <Text style={styles.title}>{popUpTitle}</Text>
          <NFCScan />
          <Text style={styles.subtitle}>Approach an NFC Tag</Text>

          <View style={styles.actionWrapper}>
            <Button
              containerStyle={{ flex: 1 }}
              disabled={nfcStoreState.scanning}
              onPress={onAction}>
              {nfcStoreState.scanning ? 'Processing...' : actionCopy}
            </Button>

            <Button
              containerStyle={{ flex: 1 }}
              onPress={onClose}
              type="secondary"
              style={{ marginTop: 10 }}>
              Cancel
            </Button>
          </View>
        </View>
      )}

      {/* content when not available */}
      {nfcAvailable && (
        <View style={styles.unavaileableContainer}>
          <NoNFC />

          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.errorTitle}>NFC Unavailable</Text>
            <Text style={styles.errorSubTitle}>
              NFC unavailable. Enable NFC in device settings or use alternative method.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  unavaileableContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.margins.xxl,
    rowGap: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
  },
  errorSubTitle: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    marginTop: theme.margins.lg,
    textAlign: 'center',
    paddingHorizontal: theme.margins.xxl,
  },
  availableContainer: {
    alignItems: 'center',
    paddingTop: theme.margins.xxl,
    rowGap: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fontFamily.semiBold,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: theme.fontFamily.regular,
    textAlign: 'center',
    paddingHorizontal: theme.margins.xxl,
  },
  actionWrapper: {
    minWidth: '100%',
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 'auto',
    marginBottom: 32,
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
  },
}));

export default NfcPopup;

type PopupProps = { mode: 'read' | 'write'; onClose: () => void; onAction: () => Promise<void> };
