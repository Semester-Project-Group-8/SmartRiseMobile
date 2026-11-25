import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color:"#000000"
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },

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

  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },

  registerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  registerLinkPressed: {
    opacity: 0.6,
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,          // takes all the space, leaving room for the icon
    paddingVertical: 12,
    color: "#000000"
  },

});