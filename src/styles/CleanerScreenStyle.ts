import { StyleSheet } from 'react-native';

export const cleanerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    width: 200,
    height: 200,
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },

  header: { marginBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8
  },

  footer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
});