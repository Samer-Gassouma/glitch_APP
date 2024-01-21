import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfView = ({ route }) => {
  const { downloadURL } = route.params;
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://docs.google.com/viewer?url=${encodeURIComponent(downloadURL)}` }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd', // Add border for a cleaner look
    borderRadius: 10,
    overflow: 'hidden', // Clip the content inside the border
    margin: 10,
    width: '100%',
    alignSelf: 'center',

  },
  webview: {
    flex: 1,
  },
});

export default PdfView;
